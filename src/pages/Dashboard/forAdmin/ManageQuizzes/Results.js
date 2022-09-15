import React from 'react';
import { Link } from 'react-router-dom';

const Results = ({user, index}) => {
    const {userName, userEmail, marks, paid} = user;
    
    return (
        <tr className="bg-gray-800 border-gray-700 odd:bg-gray-800 even:bg-gray-700">
      <th
        scope="row"
        className={`text-white px-3 sm:pr-0 sm:pl-8 py-2  sm:py-4 font-medium  whitespace-nowrap text-[13px]`}
      >
        {index + 1}
      </th>
      <td className="py-2 text-[11px] text-white sm:text-[13px] sm:py-4">{userName}</td>
      <td className="py-2 text-[11px] sm:text-[13px] sm:py-4">{userEmail}</td>
      
      <td className="py-2 text-[13px] sm:py-4 text-center">{marks}</td>

      <td className="py-2 text-[13px] sm:py-4 text-white text-center">
        {marks >=80 ? 'A+' : (marks >=70 ? 'A-' : (marks >=60 ? 'A' : (marks >=50 ? 'B' : (marks >=40 ? 'C' : 'F'))) ) }
      </td>
    </tr>
    );
};

export default Results;