import { useEffect, useState } from "react"

const useUsers = () =>{
    const [users, setUsers] = useState([]);
    useEffect( () =>{
        fetch('https://quizzes-maker.herokuapp.com/api/v1/user', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => setUsers(data));
    },[users, setUsers]);
    return [users, setUsers];
}
export default useUsers;