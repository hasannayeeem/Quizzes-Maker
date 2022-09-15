import { useEffect, useState } from "react"

const useUser = (user) =>{
    const [userData, setUserData] = useState([]);
    const [userLoading, setUserLoading] = useState(true)
    useEffect( () =>{
        fetch(`http://localhost:5000/api/v1/singleUserByEmail/${user?.email}`)
        .then(res => res.json())
        .then(data => {
            setUserData(data)
            setUserLoading(false)
        });    
    },[userData, user, setUserData]);
    return [userData, userLoading, setUserData];
}
export default useUser;