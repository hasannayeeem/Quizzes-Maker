import { useEffect, useState } from "react"

const useToken = user =>{
    const [token, setToken] = useState('');
    console.log(user);
    useEffect( () =>{
        console.log(user);
        const email = user?.user?.email;
        const  name =  user?.user.displayName;
        const isPaid = false;
        const currentUser = {email: email, name: name, isPaid: false};
        if(email){
            fetch(`https://quizzes-maker.herokuapp.com/api/v1/user`, {
                method:'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body:JSON.stringify(currentUser)
            })
            .then(res=>res.json())
            .then(data => {
                console.log('data inside useToken', data);
                // const accessToken = data.token
                // localStorage.setItem('accessToken', accessToken)
                // setToken(accessToken)
                setToken(data)
            })
        }

    }, [user]);
    return [token];
}

export default useToken;