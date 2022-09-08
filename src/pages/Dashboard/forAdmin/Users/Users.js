import React from 'react';
import useUsers from '../../../../hooks/useUsers';
import UserRow from './UserRow';

const Users = () => {
    const [users] = useUsers();
    return (
        <div>
            <h2 className="text-2xl px-4 mb-2 text-gray-200">All Users: {users?.length}</h2>
            <div className="overflow-x-auto px-4">
                <table className="table w-full ">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            <th>Remove User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index)=><UserRow
                                index={index}
                                key={user._id}
                                user={user}
                                // refetch={refetch}
                                ></UserRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;