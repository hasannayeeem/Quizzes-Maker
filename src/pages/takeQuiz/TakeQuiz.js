import React from "react";
// import "./quizScreen.css";
import { useState } from "react";
import { useEffect } from "react";
import { Checkbox } from "antd";
import { Statistic } from "antd";
import { BsClockHistory } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import Loading from "../../shared/Loading/Loading";
import useQuiz from "../../hooks/useQuiz";
import useUserData from "../../hooks/useUserData";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";
import toast from "react-hot-toast";

const TakeQuiz = () => {
  const [initTime, setInitTime] = useState(Date.now());
  const [marks, setMarks] = useState(0);
  const [index, setIndex] = useState(0);
  let [ans, setAns] = useState([]);
  const quizId = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [userData] = useUserData(user);
  const { _id } = userData;
  const [quiz, qzLoading, setQuiz] = useQuiz(quizId);
  if (qzLoading === true || quiz === null) {
    return <Loading />;
  }
  const { singleQuiz } = quiz;
  const { allQTime } = singleQuiz;
  const { Countdown } = Statistic;

  const onChange = (checkedValues) => {
    setAns(checkedValues);
  };
  if (qzLoading === false && quiz.questions === null) {
    return <div>something went wrong</div>;
  }

  const questions = singleQuiz?.questions;
  const assignTime = allQTime;
  const deadline = initTime + 1000 * 60 * assignTime;

  const onFinish = () => {
    setIndex(questions.length);
  };

  const isCorrectAns = (id) => {
    let correct = true;
    let realAns = questions[index].answer;
    realAns = realAns.sort();
    ans = ans.sort();
    if (realAns.length !== ans.length) {
      correct = false;
    } else {
      for (let i = 0; i < realAns.length; i++) {
        if (realAns[i] !== ans[i]) {
          correct = false;
        }
      }
    }
    if (correct === true) {
      setMarks(marks + 5);
    }
  };

  const nextQuiz = () => {
    if (index - 1 === questions.length) {
      console.log("quiz end");
    } else {
      setIndex(index + 1);
    }
    setAns([]);
  };
  const previousQuiz = () => {
    if (index === 0) {
      console.log("previous end");
    } else {
      setIndex(index - 1);
    }
    // setAns([]);
  };

  const submitQuizHandler = (e) => {
    e.preventDefault();
    let mark = (marks / (5 * questions.length)) * 100;
    const data = {
      userId: _id,
      userName: user?.displayName,
      email: user?.email,
      mark: mark,
      paid: userData?.isPaid,
    };
    axios
      .post(
        `https://quizzes-maker.herokuapp.com/api/v1/submit-quiz/${singleQuiz?._id}`,
        data
      )
      .then((data) => {
        // console.log(data.data);
        // event.target.value.reset()
        toast.success(
          `Dear ${userData?.name} Your Quiz Successfully submitted`
        );
        navigate('/');
      });
  };

  // console.log(allQuiz[0]);
  if (index === questions.length) {
    let mark = (marks / (5 * questions.length)) * 100;
    return (
      <div className="flex flex-col text-white h-[400px] justify-center items-center space-y-5">
        <div className="text-5xl">Congratulation !!</div>
        <div className="text-3xl">
          your score : <strong>{mark}%</strong>
        </div>

        {/* <Link to='/'> */}
        <div onClick={submitQuizHandler} className="btn btn-danger">
          Submit
        </div>
        {/* </Link> */}
      </div>
    );
  }

  const questionCount = (
    <div className="text-2xl flex space-x-2 items-center">
      <span>
        <BsFillPatchQuestionFill className="text-primary" />
      </span>
      <span className="text-slate-600">
        {index}/{questions.length}
      </span>
    </div>
  );

  const Quiz = (
    <div className="">
      <div
        key={questions[index]._id}
        className="my-3 mx-auto  bg-p w-[500px]  "
      >
        <div className="text-3xl my-2 ml-2 text-secondary">
          {/* <span className="font-bold mr-2">{idx + 1}.</span> */}
          <span>Q: {questions[index].question}?</span>
        </div>
        <Checkbox.Group onChange={onChange}>
          <div className="  py-5 rounded-md my-2">
            {questions[index].options.map((opt, idx) => (
              <div
                key={idx}
                className={`col-md-5 w-96 hover:bg-teal-400 option duration-100 transition-all bg-white/50 text-gray-900  p-2 rounded-md my-3  mx-auto`}
              >
                <span className="font-bold mr-2 ">
                  <Checkbox value={idx + 1}></Checkbox>
                </span>
                <span>{opt.option}</span>
              </div>
            ))}
          </div>
        </Checkbox.Group>
        <div className="mb-8">
          <div
            onClick={() => isCorrectAns(questions[index]._id)}
            className="mr-2 "
          >
            <button
              onClick={() => {
                nextQuiz();
              }}
              className="btn btn-secondary mb-2 block ml-auto text-right"
              disabled={!ans.length}
            >
              next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex relative mx-width mx-auto justify-between">
      <div className="w-8/12 bg-p">
        <div className="mt-[80px] w-[600px] mx-auto">
          <h1 className="pt-10">{}</h1>
          <div className="flex justify-between">      
          <div className="flex ml-2 text-white justify-start text-4xl items-center space-x-2">
             {questionCount}
          </div>
          <div className="flex text-white justify-end mt-3 text-4xl items-center space-x-2">
            <span>
              <BsClockHistory className="text-secondary" />
            </span>
            <Countdown value={deadline} onFinish={onFinish} />
          </div>
          </div>
          
          {Quiz}
          <div className="flex justify-between">
            <div
              onClick={() => isCorrectAns(questions[index]._id)}
              className=""
            >
              <button
                onClick={() => {
                  previousQuiz();
                }}
                className="btn btn-primary rounded-sm btn-sm"
                // disabled={!ans.length}
              >
                previous
              </button>
            </div>
            <div
              onClick={() => isCorrectAns(questions[index]._id)}
              className="col-md-4 ml-auto -mr-2"
            >
              <button
                onClick={() => {
                  nextQuiz();
                }}
                className="btn btn-primary  rounded-sm btn-sm"
                // disabled={!ans.length}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/12 text-white min-h-screen fixed top-24 right-28 bg-p">
        <h1 className="text-center">
          <span className="text-success">Congratulation!</span> for your attend this quiz
        </h1>
        <h1 className="flex justify-between my-4">
          <span className="mx-4">Quiz Name:</span>{" "}
          <span className="mx-4">{singleQuiz?.quizName}</span>
        </h1>
        <h1 className="flex justify-between my-4">
          <span>
            <BsClockHistory className="text-primary inline-block mx-4 w-4 h-4" />
            Total Time:
          </span>{" "}
          <span className="mx-4">{singleQuiz?.allQTime} minute</span>
        </h1>
        <h1 className="flex justify-between my-4">
          <span>
            <BsFillPatchQuestionFill className="text-primary inline-block mx-4 w-4 h-4" />
            Total Question:
          </span>{" "}
          <span className="mx-4">{singleQuiz?.questions?.length}</span>
          <span className="mx-4">{ans}</span>
          <span className="mx-4">{questions[index]?.answer}</span>
        </h1>
      </div>
    </div>
  );
};

export default TakeQuiz;
