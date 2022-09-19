import moment from "moment";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../shared/Loading/Loading';
import SmallLoading from '../../../shared/Loading/SmallLoading';
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const CheckOutForm = ({userData}) => {
  // console.log(userData);
  const [user] = useAuthState(auth)
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const form = useRef();
  const navigate = useNavigate();
  if(!userData){
    <Loading />
  }
  const premiumPrice = 107;
  useEffect(()=>{
    const url = `https://quizzes-maker.herokuapp.com/create-payment-intent`;
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({premiumPrice})
    }).then(res => res.json())
    .then(data=>{
      if(data?.clientSecret){
        setClientSecret(data.clientSecret);
      }
    })
  }, [])
  

  const handleSubmit = async (event) =>{
    event.preventDefault();
    if(!stripe || !elements){
      return
    }

    const card = elements.getElement(CardElement);

    if(card === null){
      return
    }
    const {error, } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    setCardError(error?.message || '')
    setProcessing(true);
    // confirm card payment 
    const{paymentIntent, error: intentError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method:{
          card: card,
          billing_details:{
            name: userData?.name,
            email: userData?.email,
          },
        },
      },
    );
      setSuccess('')
    if(intentError){
      setCardError(intentError?.message)
      setProcessing(false);
    }
    else{
      setCardError('')
      setTransactionId(paymentIntent.id)
      setSuccess(`Congrats! Your Payment is Completed.`)

      //store payment on db
      const paymentDetails = {
        name: user?.displayName,
        email: userData?.email,
        refund: "false",
        transactionId: paymentIntent.id,
        amount: paymentIntent.amount,
      }

      fetch(`https://quizzes-maker.herokuapp.com/api/v1/createPayment`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({paymentDetails})
      }).then(res=>res.json())
      .then(data => {
        setProcessing(false);
        toast.success('Congrats! Your Payment is Completed.');
        navigate('/dashboard/myPayments')
      })
    }

  }

  
  return (
    <div className="flex items-center bg-p border rounded w-10/12 sm:w-8/12 px-10 py-7 mx-auto sm:mx-0">
    <form onSubmit={handleSubmit}
    ref={form}
    className="sm:pl-16 sm:w-[400px] w-11/12 mx-auto sm:mx-0 text-left"
    >
    <CardElement
      options={{
        style: {
          base: {
            fontSize: "16px",
            color: "#aab7c4",
            "::placeholder": {
              color: "#aab7c4",
            },
          },
          invalid: {
            color: "#9e2146",
          },
        },
      }}
    />
    {processing ? (
          <SmallLoading></SmallLoading>
        ) : (
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            style={{
              fontFamily: "Open Sans, sans-serif",
              letterSpacing: "2px",
            }}
            className={`hover:bg-white  bg-primary mr-2 transition hover:text-primary rounded-full text-white border-2 border-primary px-6 text-sm sm:text-base sm:px-8 mt-5 py-1.5`}
          >
            Pay
          </button>
        )}
        {cardError && (
          <p className="label-text-alt ml-2 mt-1 text-red-500">{cardError}</p>
        )}
        {success && (
          <p className="label-text-alt ml-2 mt-1 text-green-600">
            <p>{success}</p>
            <p>Your Transaction Id : <span className="text-orange-500 font-bold">{transactionId}</span></p>
            
          </p>
        )}

  </form>
  </div>
  );
};

export default CheckOutForm;
