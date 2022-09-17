import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";
import useUserData from "../../../hooks/useUserData";

const Quiz = ({quiz}) => {
  const {quizType, quizName, _id, description, image, retakeCount, } = quiz;
  const [user] = useAuthState(auth);
  const [userData] = useUserData(user);
  return (
    <div className=" relative">
      <div className="card w-80 bg-base-100 shadow-xl image-full">
        <figure>
          <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{quizName ? quizName?.slice(0, 20) :' ICT!' }...</h2>
          <p>{description.slice(0, 40)}...</p>
          <p>{quiz.users.length} people took it</p>
          <div className="card-actions justify-center mt-2">
            <Link to={`${quizType === 'paid' && !userData?.isPaid ? '/payment' : `/startQuiz/${_id}`}`}><button className="btn btn-primary btn-sm mt-2">Take A Test</button></Link>
          </div>
          {quizType === 'paid' && <div className="badge badge-secondary absolute top-2 right-4 text-xl py-4 px-4">Paid</div>}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
