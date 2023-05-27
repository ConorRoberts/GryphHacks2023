"use client";
import React, { useEffect, useState } from "react";
import MainSearch from "../../components/UserQuestions/MainSearch";
import Medium from "../../components/UserQuestions/Medium";
import Question from "../../components/UserQuestions/Question";
import axios from "axios";
import type { OpenAIApi } from "openai";
import { scrollDown } from "~/src/utils/helper";

type GeneratedUserQuiz = Awaited<ReturnType<OpenAIApi["createCompletion"]>>;

const UserFlow = () => {
  // for fetching questions
  const [promptValue, setPromptValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);

  // for building user profile
  const [questionValue, setQuestionValue] = useState("");
  const [answerValue, setAnswerValue] = useState("");
  const [profileObject, setProfileObject] = useState([]);

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
      const prompt = promptValue;
      const response = await axios.post<GeneratedUserQuiz>("/api/questions/generate-user-quiz/", {
        params: {
          prompt: prompt,
        },
      });

      console.log("questions: " + response.data.data);

      setQuestions(response.data.data);
      setLoading(false);
      scrollDown();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const renderQuestions = () => {
    if (questions) {
      return questions.map((question, index) => (
        <Question
          key={index}
          question={question.question}
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
