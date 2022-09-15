import React from 'react';
import { Link } from 'react-router-dom';

const PaymentRow = ({index, user: payment}) => {
    const { _id, email, name, role, isPaid, transactionId } = payment;
    return (
        <tr className="bg-gray-800 border-gray-700 odd:bg-gray-800 even:bg-gray-700">
      <th
        scope="row"
        className={`text-white px-3 sm:pr-0 sm:pl-8 py-2  sm:py-4 font-medium  whitespace-nowrap text-[13px]`}
      >
        {index + 1}
      </th>
      <td className="py-2 text-[11px] sm:text-[13px] sm:py-4">{name}</td>
      <td className="py-2 text-[11px] sm:text-[13px] sm:py-4">{email}</td>
      <td className="py-2 text-[13px] sm:py-4 text-center">
        <p className="btn btn-xs btn-ghost duration-200">
          {isPaid ? "Premium" : "Free"}
        </p>
      </td>
      <td className="py-2 text-[13px] sm:py-4 text-center">
        {transactionId && transactionId}
      </td>

      <td className="py-2 text-[13px] sm:py-4 text-center">
        <div className="flex items-center justify-center">
        <Link
          className="btn btn-xs btn-primary duration-200"
          to={`/user/${payment._id}`}
        >
          refund
          
        </Link>
        </div>
      </td>
    </tr>
    );
};

export default PaymentRow;