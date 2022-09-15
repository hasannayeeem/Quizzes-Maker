import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useUserData from "../../../../hooks/useUserData";
import auth from '../../../../firebase.init';

const QuizzesRow = ({quiz, index}) => {
    const [user] = useAuthState(auth)
    const [userData]= useUserData(user);
    const {name, email} = userData;
    const {image, quizName, quizType, users, _id} = quiz;
    return (
        <tr className="bg-gray-800 border-gray-700 odd:bg-gray-800 even:bg-gray-700">
      <th
        scope="row"
        className={`text-white px-3 sm:pr-0 sm:pl-8 py-2  sm:py-4 font-medium  whitespace-nowrap text-[13px]`}
      >
        {index + 1}
      </th>
      <td className="py-2 text-[11px] sm:text-[13px] sm:py-4"><img className='w-8' src={image} alt="" /></td>
      <td className="py-2 text-[11px] sm:text-[13px] sm:py-4">{quizName}</td>
      <td className="py-2 text-[13px] sm:py-4 text-center">
        <p className="btn btn-xs btn-ghost duration-200">
          {quizType}
        </p>
      </td>
      <td className="py-2 text-[13px] sm:py-4 text-center">
        {users?.length}
      </td>

      <td className="py-2 text-[13px] sm:py-4 text-center">
        <div className="flex items-center justify-center">
        <Link
          className="btn btn-xs btn-ghost duration-200"
          to={`/dashboard/quizDetails/${_id}`}
        >
          Details
          
        </Link><FaTrashAlt
            // onClick={() => handleDelete(_id)}
            className="text-secondary ml-2 cursor-pointer"
          ></FaTrashAlt>
        </div>
      </td>
    </tr>
    );
};

export default QuizzesRow;