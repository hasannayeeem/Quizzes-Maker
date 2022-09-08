import { useEffect, useState } from "react"

const useUser = (userId) =>{
    const [user, setUser] = useState({});
    const [userLoading, setUserLoading] = useState(true)
    useEffect( () =>{
        fetch(`http://localhost:5000/api/v1/user/${userId}`)
        .then(res => res.json())
        .then(data => {
            setUser(data)
            setUserLoading(false)
        });    
    },[user, userId, userLoading, setUser]);
    return [user, setUser];
}
export default useUser;