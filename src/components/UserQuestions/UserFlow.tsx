"use client";
import React, { useState } from "react";
import MainSearch from "../../components/UserQuestions/MainSearch";
import Medium from "../../components/UserQuestions/Medium";
import Question from "../../components/UserQuestions/Question";
import axios from "axios";
import type { OpenAIApi } from "openai";
import { scrollDown } from "~/src/utils/helper";

type GeneratedUserQuiz = Awaited<ReturnType<OpenAIApi["createCompletion"]>>;

const UserFlow = () => {
  const [promptValue, setPromptValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);

  const submitHabit = async () => {
    setLoading(true);

    try {
      const prompt = `I want to build a habit of ${promptValue}`;
      const response = await axios.post<GeneratedUserQuiz>("/api/questions/generate-user-quiz/", {
        params: {
          prompt: prompt,
        },
      });

      // console.log(response.data.data);

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
        <Question key={index} question={question.question} options={question.options} />
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
