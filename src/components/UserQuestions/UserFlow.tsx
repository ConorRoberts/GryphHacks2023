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
  const [promptValue, setPromptValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<GetCategoryQuestionsResponse["questions"]>([]);
  const [shouldBeginLongFetch, setShouldBeginLongFetch] = useState(false);

  const submitHabit = async () => {
    setLoading(true);

    try {
      const prompt = `I want to build a habit of ${promptValue}`;
      // const response = await axios.post<GeneratedUserQuiz>("/api/questions/generate-user-quiz/", {
      //   params: {
      //     prompt: prompt,
      //   },
      // });

      const { data: category } = await axios.get("/api/public/categorize-input", { params: { input: prompt } });
      const { data: questions } = await axios.get<GetCategoryQuestionsResponse>("/api/public/category-questions", {
        params: { category },
      });

      // console.log(response.data.data);

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

  return (
    <>
      <MainSearch
        loading={loading}
        promptValue={promptValue}
        setPromptValue={setPromptValue}
        submitHabit={submitHabit}
      />
      <Medium />

      {questions?.map((question, index) => (
        <Question key={index} question={question.prompt} options={question.options} />
      ))}
    </>
  );
};

export default UserFlow;
