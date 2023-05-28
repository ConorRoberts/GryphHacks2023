"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetInputCategoryResponse } from "~/src/app/api/public/categorize-input/route";
import { GetCategoryQuestionsResponse } from "~/src/app/api/public/category-questions/route";
import { scrollDown } from "~/src/utils/helper";
import MainSearch from "../../components/UserQuestions/MainSearch";
import Medium from "../../components/UserQuestions/Medium";
import Question from "../../components/UserQuestions/Question";
import { OpenAIApi } from "openai";

type GeneratedUserHabit = Awaited<ReturnType<OpenAIApi["createCompletion"]>>;

const UserFlow = () => {
  // for fetching questions
  const [promptValue, setPromptValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<GetCategoryQuestionsResponse["questions"]>([]);
  const [shouldBeginLongFetch, setShouldBeginLongFetch] = useState(false);
  const [isLongFetchInProgress, setIsLongFetchInProgress] = useState(false);

  // for building user profile
  const [questionValue, setQuestionValue] = useState("");
  const [answerValue, setAnswerValue] = useState("");
  const [profileObject, setProfileObject] = useState<{ answerValue: string; questionValue: string }[]>([]);

  useEffect(() => {
    // collects answers from thr q&a
    setProfileObject((prevProfileObject) => {
      const updatedProfileObject = [...prevProfileObject];

      if (questionValue.length > 0) {
        updatedProfileObject.push({
          answerValue,
          questionValue,
        });
      }

      return updatedProfileObject;
    });
  }, [questionValue, answerValue]);

  const createUserHabitPlan = async () => {
    // TODO set loader
    try {
      const prompt = `I want to build a habit of ${promptValue}`;
      const response = await axios.post<GeneratedUserHabit>("/api/habits/create/", {
        params: {
          currentDay: 1,
          habit: promptValue,
          prompt: prompt,
        },
      });

      console.log(response.data.habit);

      scrollDown();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // for testing
  // useEffect(() => {
  //   console.log("called");
  //   createUserHabitPlan();
  // }, []);

  useEffect(() => {
    console.log(JSON.stringify(profileObject));
  }, [profileObject]);

  // fetch questions
  const submitHabit = async () => {
    setLoading(true);

    try {
      const { data: category } = await axios.get<GetInputCategoryResponse>("/api/public/categorize-input", {
        params: { input: promptValue },
      });
      const { data: questions } = await axios.get<GetCategoryQuestionsResponse>("/api/public/category-questions", {
        params: { category: category.category },
      });

      setQuestions(questions.questions);
      setLoading(false);
      setShouldBeginLongFetch(true);
      scrollDown();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (shouldBeginLongFetch && !isLongFetchInProgress) {
        setIsLongFetchInProgress(true);
        const { data } = await axios.post<GetCategoryQuestionsResponse>("/api/questions/generate-user-quiz", {
          prompt: promptValue,
        });

        setQuestions((q) => [...q, ...data.questions]);

        setShouldBeginLongFetch(false);
        setIsLongFetchInProgress(false);
      }
    })();
  }, [shouldBeginLongFetch, promptValue, isLongFetchInProgress]);

  const renderQuestions = () => {
    if (questions) {
      return questions.map((question, index) => (
        <Question
          key={index}
          question={question.prompt}
          options={question.options}
          setAnswerValue={setAnswerValue}
          setQuestionValue={setQuestionValue}
        />
      ));
    }
  };

  return (
    <>
      <MainSearch
        loading={loading}
        promptValue={promptValue}
        setPromptValue={setPromptValue}
        submitHabit={submitHabit}
      />
      <Medium />

      {renderQuestions()}
    </>
  );
};

export default UserFlow;
