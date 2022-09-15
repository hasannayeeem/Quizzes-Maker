import { useEffect, useState } from "react"

const useQuizzes = () =>{
    const [quizzes, setQuizzes] = useState([]);
    useEffect( () =>{
        fetch('http://localhost:5000/api/v1/get-all-quiz')
        .then(res => res.json())
        .then(data => setQuizzes(data));
        
    },[quizzes, setQuizzes]);
    return [quizzes, setQuizzes];
}
export default useQuizzes;