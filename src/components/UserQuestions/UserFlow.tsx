"use client";
import axios from "axios";
import { OpenAIApi } from "openai";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { GetInputCategoryResponse } from "~/src/app/api/public/categorize-input/route";
import { GetCategoryQuestionsResponse } from "~/src/app/api/public/category-questions/route";
import { scrollDown, reformatUserResponses } from "~/src/utils/helper";
import MainSearch from "../../components/UserQuestions/MainSearch";
import Medium from "../../components/UserQuestions/Medium";
import Question from "../../components/UserQuestions/Question";

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
  const [numAnsweredQuestions, setNumAnsweredQuestions] = useState(0);

  // collects answers from the q&a
  useEffect(() => {
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

  // set's off api to generate habit plan
  useEffect(() => {
    const createUserHabitPlan = async () => {
      // TODO set loader
      try {
        const reformattedProfileObject = reformatUserResponses(profileObject);
        const response = await axios.post<GeneratedUserHabit>("/api/habits/create/", {
          params: {
            currentDay: 1,
            habit: promptValue,
            userInfo: reformattedProfileObject,
          },
        });

        console.log(response.data.habit);

        scrollDown();
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    console.log(numAnsweredQuestions);

    if (numAnsweredQuestions >= 15) {
      createUserHabitPlan();
    }
  }, [numAnsweredQuestions]);

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
      setLoading(false);

      flushSync(() => {
        setQuestions(questions.questions);
      });
      setShouldBeginLongFetch(true);

      const el = document.getElementById(`medium`);

      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      // scrollDown();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // gpt questions
  useEffect(() => {
    (async () => {
      if (shouldBeginLongFetch && !isLongFetchInProgress) {
        setIsLongFetchInProgress(true);
        try {
          const { data } = await axios.post<GetCategoryQuestionsResponse>("/api/questions/generate-user-quiz/", {
            prompt: promptValue,
          });

          console.log(data.questions);
          setQuestions((q) => [...q, ...data.questions]);

          setShouldBeginLongFetch(false);
          setIsLongFetchInProgress(false);
        } catch (error) {
          console.error(error);
          setShouldBeginLongFetch(false);
          setIsLongFetchInProgress(false);
        }
      }
    })();
  }, [shouldBeginLongFetch, promptValue, isLongFetchInProgress]);

  const renderQuestions = () => {
    if (questions) {
      return questions.map((question, index) => (
        <Question
          key={index}
          question={question}
          setAnswerValue={setAnswerValue}
          setQuestionValue={setQuestionValue}
          numAnsweredQuestions={numAnsweredQuestions}
          setNumAnsweredQuestions={setNumAnsweredQuestions}
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
