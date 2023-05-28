"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { CreateHabitResponse } from "~/src/app/api/habits/create/route";
import { GetInputCategoryResponse } from "~/src/app/api/public/categorize-input/route";
import { GetCategoryQuestionsResponse } from "~/src/app/api/public/category-questions/route";
import { reformatUserResponses } from "~/src/utils/helper";
import MainSearch from "../../components/UserQuestions/MainSearch";
import Medium from "../../components/UserQuestions/Medium";
import Question from "../../components/UserQuestions/Question";
import GPTLoader from "./GPTLoader";

const UserFlow: FC<{ setHabitLoading: (v: boolean) => void; habitLoading: boolean }> = ({
  setHabitLoading,
  habitLoading,
}) => {
  // for fetching questions
  const [promptValue, setPromptValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGPT, setLoadingGPT] = useState(false);
  const [habitLoadingSuccess, setHabitLoadingSuccess] = useState(false);
  const [questions, setQuestions] = useState<GetCategoryQuestionsResponse["questions"]>([]);
  const [shouldBeginLongFetch, setShouldBeginLongFetch] = useState(false);
  const [isLongFetchInProgress, setIsLongFetchInProgress] = useState(false);
  const router = useRouter();

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
    let timeoutId: NodeJS.Timeout | undefined;

    const createUserHabitPlan = async (timeoutId: NodeJS.Timeout | undefined) => {
      try {
        setHabitLoading(true);
        const reformattedProfileObject = reformatUserResponses(profileObject);
        const { data: newHabit } = await axios.post<CreateHabitResponse>("/api/habits/create/", {
          params: {
            currentDay: 1,
            habit: promptValue,
            userInfo: reformattedProfileObject,
          },
        });

        setHabitLoading(false);
        setHabitLoadingSuccess(true);

        timeoutId = setTimeout(() => {
          router.push(`/habits/${newHabit.habit.id}`);
        }, 2000);
      } catch (error) {
        setHabitLoading(false);
        console.error(error);
      }
    };

    if (
      questions.length > 1 &&
      numAnsweredQuestions >= questions.length &&
      !loadingGPT &&
      !habitLoading &&
      !habitLoadingSuccess
    ) {
      createUserHabitPlan(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    numAnsweredQuestions,
    promptValue,
    questions.length,
    profileObject,
    setHabitLoading,
    router,
    loadingGPT,
    habitLoading,
    habitLoadingSuccess,
  ]);

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
    const fetchGPTData = async () => {
      setIsLongFetchInProgress(true);
      setLoadingGPT(true);
      try {
        const { data } = await axios.post<GetCategoryQuestionsResponse>("/api/questions/generate-user-quiz/", {
          prompt: promptValue,
        });

        setQuestions((q) => [...q, ...data.questions]);

        setLoadingGPT(false);
        setShouldBeginLongFetch(false);
        setIsLongFetchInProgress(false);
      } catch (error) {
        console.error(error);
        setLoadingGPT(false);
        setShouldBeginLongFetch(false);
        setIsLongFetchInProgress(false);
      }
    };

    if (shouldBeginLongFetch && !isLongFetchInProgress) {
      fetchGPTData();
    }
  }, [shouldBeginLongFetch, promptValue, isLongFetchInProgress]);

  return (
    <>
      <MainSearch
        loading={loading}
        promptValue={promptValue}
        setPromptValue={setPromptValue}
        submitHabit={submitHabit}
      />
      <Medium />

      {questions.map((question, index) => (
        <Question
          key={`question input ${index}`}
          question={question}
          setAnswerValue={setAnswerValue}
          setQuestionValue={setQuestionValue}
          numAnsweredQuestions={numAnsweredQuestions}
          setNumAnsweredQuestions={setNumAnsweredQuestions}
        />
      ))}
      {loadingGPT && <GPTLoader />}
    </>
  );
};

export default UserFlow;
