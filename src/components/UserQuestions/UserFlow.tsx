"use client";
import MainSearch from "../../components/UserQuestions/MainSearch";
import Question from "../../components/UserQuestions/Question";
import Medium from "../../components/UserQuestions/Medium";

const UserFlow = () => {
    return (
        <>
            <MainSearch />
            <Medium />
            <Question />
        </>
    );
};

export default UserFlow;
