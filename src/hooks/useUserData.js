import { useEffect, useState } from "react"

const useUser = (user) =>{
    const [userData, setUserData] = useState([]);
    const [userLoading, setUserLoading] = useState(true)
    useEffect( () =>{
        fetch(`https://quizzes-maker.herokuapp.com/api/v1/singleUserByEmail/${user?.email}`)
        .then(res => res.json())
        .then(data => {
            setUserData(data)
            setUserLoading(false)
        });    
    },[userData, user, setUserData]);
    return [userData, userLoading, setUserData];
}
export default useUser;