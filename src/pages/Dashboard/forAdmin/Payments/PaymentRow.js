import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import auth from '../../../../firebase.init';
import useUserData from '../../../../hooks/useUserData';

const PaymentRow = ({index, payment}) => {
  const [user] = useAuthState(auth);
    const { _id, email, name, refund, role, transactionId } = payment;
    const [userData] = useUserData(user);

    const handleRefund = (id) =>{
      const transactionID = {
        tId: id,
      }
      console.log(transactionID);
      fetch(`https://quizzes-maker.herokuapp.com/refund-payment-intent`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({transactionID})
      }).then(res=>res.json())
      .then(data => {
          const paymentedData = {
            refund: 'true',
          };
          axios
          .put(
            `https://quizzes-maker.herokuapp.com/api/v1/updatePayment?email=${email}`,
            paymentedData
          )
          .then((data) => {
            Swal.fire(
              "Refunded successfully done!",
            );
          })
          .catch((error) => {
            if (error.response.status === 403) {
              toast.error("You are Not eligible");
            }
          });
          toast.success('refund is successfully completed');
      })
    }

    const handleDelete = (id) => {
      fetch(`https://quizzes-maker.herokuapp.com/api/v1/deletePayment/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              swal(`this payment has been deleted!`, {
                icon: "success",
              });
              //   refetch();
            }
          });
    }

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
          {payment?.createdAt?.slice(0, 10)}
        </p>
      </td>
      <td className="py-2 text-[13px] sm:py-4 text-center">
        {transactionId && transactionId}
      </td>

      <td className="py-2 text-[13px] sm:py-4 text-center">
        {
          refund === 'processing' ?
          <div className="flex items-center justify-center">
        <button onClick={()=> handleRefund(transactionId)}
          className="btn btn-xs btn-primary duration-200"
        >
          refund
          
        </button>
        </div>
        :
        <div className="flex items-center justify-center">
        <button
          className={`btn btn-xs ${refund === 'false' ? 'btn-success' : 'btn-error'} duration-200`}
        >
          {refund === 'false' ? 'complete' : 'refunded'}
        </button>
        <FaTrashAlt
            onClick={() => handleDelete(_id)}
            className={`text-secondary ${refund === 'true' ? "block" :  'hidden'} ml-2 cursor-pointer`}
          ></FaTrashAlt>
        </div>
        }
      </td>
    </tr>
    );
};

export default PaymentRow;