import { useEffect, useState } from "react"

const usePayments = () =>{
    const [payments, setPayments] = useState([]);
    useEffect( () =>{
        fetch('https://quizzes-maker.herokuapp.com/api/v1/getAllPayment')
        .then(res => res.json())
        .then(data => setPayments(data));
        
    },[payments, setPayments]);
    return [payments, setPayments];
}
export default usePayments;