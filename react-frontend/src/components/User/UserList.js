import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {fetchAllUsers} from "../../redux/thunks/user-thunks";


const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users)

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    return (
        <div className="container">
            <>
                <table className="table mt-4 border text-center">
                    <thead className="table-active">
                    <tr>
                        {/*<th>id</th>*/}
                        <th>Name</th>
                        <th>Surname</th>
                        <th>E-mail</th>
                        <th>Role</th>
                        <th>Login</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                {/*<th>{user.id}</th>*/}
                                <th>{user.name}</th>
                                <th>{user.surname}</th>
                                <th>{user.email}</th>
                                <th>{user.role}</th>
                                <th>{user.login}</th>
                                <th>
                                    <Link to={`/editUser/${user.id}`}  className="btn btn-success mx-3"> Edit </Link>
                                </th>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </>
        </div>
    )

}

export default UserList;