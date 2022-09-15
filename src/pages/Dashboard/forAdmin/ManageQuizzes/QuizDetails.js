import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useQuiz from "../../../../hooks/useQuiz";
import Loading from "../../../../shared/Loading/Loading";
import Results from "./Results";

const QuizDetails = () => {
  const quizId = useParams();
  const [quiz, qzLoading] = useQuiz(quizId);
  const [doc, setDoc] = useState(false);
  if (qzLoading) {
    return <Loading />;
  }
  const { users, quizName, image, quizType, description, _id, questions } =
    quiz?.singleQuiz;

  return (
    <div className="mt-8">
      <div className="bg-p mx-4 pb-8 text-gray-300">
        <h1 className="text-5xl py-8  tracking-widest font-bold border-b-2 border-black text-center">
          Quiz details
        </h1>
        <div className="flex justify-between mx-12">
          <div className="w-1/2">
            <img className="w-48 my-4" src={image} alt="" />
          </div>
          <div className="w-1/2 my-4">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold text-gray-300 text-left">
                Name:{" "}
              </h1>
              <span className="font-normal text-xl text-right">
                {" "}
                {quizName}
              </span>
            </div>
            <div className="flex justify-between">
              
              <h1 className="text-2xl font-semibold text-gray-300 text-left">
                Type:{" "}
              </h1><span className="font-normal text-xl text-right">
                {" "}
                {quizType}
              </span>
            </div>
            <div className="flex justify-between">
              
              <h1 className="text-2xl font-semibold text-gray-300 text-left">
                Total Question:{" "}
              </h1><span className="font-normal text-xl text-right">
                {" "}
                {questions?.length}
              </span>
            </div>
            <div className="flex justify-between">
              
              <h1 className="text-2xl font-semibold text-gray-300 text-left">
                Total Submission:{" "}
              </h1><span className="font-normal text-xl text-right">
                {" "}
                {users?.length}
              </span>
            </div>
          </div>
        </div>
        <div className="my-2">
          <h1 className="text-xl mx-6 text-left font-semibold">Description:</h1>
          <p className="mx-12 mb-2">{description}</p>
        </div>
        <h1 className="text-xl font-semibold mx-6 text-left my-2">
          Result Sheet
        </h1>
        <div className="relative overflow-x-auto mx-4 shadow-md sm:rounded-lg">
          <table className="text-gray-400 w-full text-sm text-left">
            <thead className={`bg-gray-700 text-gray-400 text-xs uppercase`}>
              <tr>
                <th scope="col" className="py-2  sm:py-3"></th>
                <th scope="col" className="py-2 sm:py-3">
                  Name
                </th>
                <th scope="col" className="py-2 sm:py-3">
                  Email
                </th>
                <th scope="col" className="py-2 sm:py-3 text-center">
                  Marks
                </th>
                <th scope="col" className="py-2 sm:py-3 text-center">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <Results key={index} index={index} user={user}></Results>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
