"use client";
import axios from "axios";
import type { OpenAIApi } from "openai";
import { useEffect, useState } from "react";
import { GetCategoryQuestionsResponse } from "~/src/app/api/public/category-questions/route";
import { scrollDown } from "~/src/utils/helper";
import MainSearch from "../../components/UserQuestions/MainSearch";
import Medium from "../../components/UserQuestions/Medium";
import Question from "../../components/UserQuestions/Question";

type GeneratedUserQuiz = Awaited<ReturnType<OpenAIApi["createCompletion"]>>;

const UserFlow = () => {
  // for fetching questions
  const [promptValue, setPromptValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<GetCategoryQuestionsResponse["questions"]>([]);
  const [shouldBeginLongFetch, setShouldBeginLongFetch] = useState(false);

  // for building user profile
  const [questionValue, setQuestionValue] = useState("");
  const [answerValue, setAnswerValue] = useState("");
  const [profileObject, setProfileObject] = useState<{ answerValue: string; questionValue: string }[]>([]);

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

  useEffect(() => {
    console.log(profileObject);
  }, [profileObject]);

  // fetch questions
  const submitHabit = async () => {
    setLoading(true);

    try {
      const { data: category } = await axios.get("/api/public/categorize-input", { params: { input: promptValue } });
      const { data: questions } = await axios.get<GetCategoryQuestionsResponse>("/api/public/category-questions", {
        params: { category },
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
      if (shouldBeginLongFetch) {
        const { data } = await axios.post<GeneratedUserQuiz>("/api/questions/generate-user-quiz/", {
          params: {
            prompt: prompt,
          },
        });

        // TODO concatenate with questions list

        setShouldBeginLongFetch(false);
      }
    })();
  }, [shouldBeginLongFetch]);

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
