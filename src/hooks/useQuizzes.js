import { useEffect, useState } from "react"

const useQuizzes = () =>{
    const [quizzes, setQuizzes] = useState([]);
    useEffect( () =>{
        fetch('quizzes.json')
        .then(res => res.json())
        .then(data => setQuizzes(data));
        
    },[quizzes, setQuizzes]);
    return [quizzes, setQuizzes];
}
export default useQuizzes;