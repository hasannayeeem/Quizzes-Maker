import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useUserData from '../../../../hooks/useUserData';

const PaymentRow = ({index, myPayment}) => {
    const [user] = useAuthState();
    const [userData] = useUserData(user);
    const { _id, email, name, refund, role, transactionId } = myPayment;
    const handleReqRefund = (id)=>{
        const paymentData = {
            refund: false,
          };
      
          Swal
            .fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              background: '#343a40',
              color: 'yellow',
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Yes, refund My Payment!",
            })
            .then((result) => {
              if (result.isConfirmed) {
                axios
                  .put(
                    `https://quizzes-maker.herokuapp.com/api/v1/updatePayment/${id}`,
                    paymentData
                  )
                  .then((data) => {
                    Swal.fire(
                      "successfully done Your Payment refunding request!",
                      ``,
                      "success"
                    );
                    // refetch()
                  })
                  .catch((error) => {
                    console.log(error.response.data);
                    if (error.response.status === 403) {
                      toast.error("You are Not eleagable");
                    }
                  });
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
          {userData?.isPaid ? "Premium" : "Free"}
        </p>
      </td>
      <td className="py-2 text-[13px] sm:py-4 text-center">
        {transactionId && transactionId}
      </td>

      <td className="py-2 text-[13px] sm:py-4 text-center">
        <div className="flex items-center justify-center">
        <button onClick={()=> handleReqRefund(_id)}
          className="btn btn-xs btn-primary duration-200"
          // to={`/user/${payment._id}`}
        >
          {refund ? 'refunded' : 'refund'}
          
        </button>
        </div>
      </td>
    </tr>
    );
};

export default PaymentRow;