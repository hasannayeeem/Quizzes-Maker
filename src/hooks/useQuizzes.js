import { useEffect, useState } from "react"

const useQuizzes = () =>{
    const [quizzes, setQuizzes] = useState([]);
    useEffect( () =>{
        fetch('https://quizzes-maker.herokuapp.com/api/v1/get-all-quiz')
        .then(res => res.json())
        .then(data => setQuizzes(data));
        
    },[quizzes, setQuizzes]);
    return [quizzes, setQuizzes];
}
export default useQuizzes;