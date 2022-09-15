import { useEffect, useState } from "react"

const useQuiz = ({quizId}) =>{
    const [quiz, setQuiz] = useState(null);
    const [qzLoading, setQzLoading] = useState(true)
    console.log(quizId);
    useEffect( () =>{
        fetch(`http://localhost:5000/api/v1/get-single-quiz/${quizId}`)
        .then(res => res.json())
        .then(data => {
            setQuiz(data)
            setQzLoading(false)
        });   
    },[quiz, quizId, qzLoading, setQuiz]);
    return [quiz, qzLoading, setQuiz];
}
export default useQuiz;