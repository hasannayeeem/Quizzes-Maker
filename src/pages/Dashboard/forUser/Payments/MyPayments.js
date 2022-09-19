import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";
import Loading from "../../../../shared/Loading/Loading";
import useUserData from "../../../../hooks/useUserData";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";

const MyPayments = () => {
  const [user] = useAuthState(auth);
  const [myPayments, setMyPayments] = useState({});
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [userData] = useUserData(user);
  
  const handleReqRefund = (id) => {
    const paymentData = {
      refund: 'processing',
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#343a40",
      color: "yellow",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, refund My Payment!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `https://quizzes-maker.herokuapp.com/api/v1/updatePayment?email=${myPayments?.email}`,
            paymentData
          )
          .then((data) => {
            Swal.fire(
              "successfully done Your Payment refunding request!",
            );
            // refetch()
          })
          .catch((error) => {
            console.log(error.response.data);
            if (error.response.status === 403) {
              toast.error("You are Not eligible");
            }
          });
      }
    });
  };
  useEffect(() => {
    fetch(`https://quizzes-maker.herokuapp.com/api/v1/singlePaymentByEmail/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyPayments(data);
        setPaymentLoading(false);
      });
  }, [user?.email, myPayments?.refund, paymentLoading, setPaymentLoading, setMyPayments, myPayments]);

  if (paymentLoading || myPayments === {}) {
    <Loading></Loading>;
  }
  
  return (
    <div className="lg:px-4 px-2 pb-5">
      <h2 className="text-2xl px-4 mb-2 text-gray-200">My Payment Details:</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                Date
              </th>
              <th scope="col" className="py-2 sm:py-3 text-center">
                transaction ID
              </th>
              <th scope="col" className="py-2 sm:py-3 text-center">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {userData?.isPaid ?
              <tr className="bg-gray-800 border-gray-700 odd:bg-gray-800 even:bg-gray-700">
              <th
                scope="row"
                className={`text-white px-3 sm:pr-0 sm:pl-8 py-2  sm:py-4 font-medium  whitespace-nowrap text-[13px]`}
              >
                {1}
              </th>
              <td className="py-2 text-[11px] sm:text-[13px] sm:py-4">
                {user?.displayName}
              </td>
              <td className="py-2 text-[11px] sm:text-[13px] sm:py-4">
                {myPayments?.email}
              </td>
              <td className="py-2 text-[13px] sm:py-4 text-center">
                <p className="btn btn-xs btn-ghost duration-200">
                  {myPayments?.createdAt?.slice(0, 10)}
                </p>
              </td>
              <td className="py-2 text-[13px] sm:py-4 text-center">
                {myPayments?.transactionId && myPayments?.transactionId}
              </td>

              <td className="py-2 text-[13px] sm:py-4 text-center">
                {myPayments?.refund === 'true' ? (
                  <div className="flex items-center justify-center">
                    <button className="btn btn-xs btn-primary duration-200">
                      refunded
                    </button>
                  </div>
                ) : ( myPayments?.refund === 'false' ? <>
                <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleReqRefund(myPayments?._id)}
                      className="btn btn-xs btn-primary duration-200"
                    >
                      refund
                    </button>
                  </div>
                </> : <>
                  <div className="flex items-center justify-center">
                    <button
                      className="btn btn-xs btn-primary duration-200"
                    >
                      {myPayments?.refund}
                    </button>
                  </div></>
                )}
              </td>
            </tr>
            :
            <h1 className="text-center mx-auto text-secondary text-2xl my-2">hello <span className="text-success">{user?.displayName}!!</span> Sorry, no transactions were found for you.</h1>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPayments;
