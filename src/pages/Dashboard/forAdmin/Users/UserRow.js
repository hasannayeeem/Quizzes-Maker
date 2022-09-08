import React from 'react';
import useUsers from '../../../../hooks/useUsers';

const UserRow = ({user, index}) => {
    const {_id, email, name, role } = user;
    const [users, setUsers] = useUsers();
    const handleDelete = id => {
        const proceed = window.confirm('are you sure?');
        if(proceed){
            const url = `https://ancient-bayou-13762.herokuapp.com/users/${id}`;
            fetch(url, {
                method: 'DELETE'
            })

            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert(`${name ? name : 'this user'} Successfully deleted`);
                const remaining = users.filter(o => o._id  !== id);
                setUsers(remaining);
            })
        }
    }

    const makeAdmin = () =>{
        const userData = {
            role: "admin"
        }
        fetch(`http://localhost:5000/api/v1/user?email=${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert(`${name ? name : 'this user'} Successfully made an admin`);
        })
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role !== 'admin' && <button onClick={makeAdmin} className="btn btn-xs">Make Admin</button>}</td>
            <td><button onClick={() => handleDelete(_id)} className="btn btn-xs">Remove User</button></td>
        </tr>
    );
};

export default UserRow;