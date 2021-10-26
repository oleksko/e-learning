import React from 'react';
import {useDispatch, useSelector} from "../react-redux-hooks";
import {fetchUserInfos} from "../actions/user";


const UserDetailsComponent = () => {
    const userDetails = useSelector((state) => state.user.userDetails)
    const {user} = useSelector((state) => state.user)
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (user.name) {
            dispatch(fetchUserInfos());
        }
    }, [user.name, dispatch]);


    return (
        <>
            {userDetails && Object.keys(userDetails) ?
                <>
                    <p>Name: {userDetails.name}</p>
                    <p>Surname: {userDetails.surname}</p>
                    <p>Login: {userDetails.login}</p>
                    <p>Email: {userDetails.email}</p>
                    {userDetails.lessonsIds && userDetails.lessonsIds.length > 0 ? userDetails.lessonsIds.map(lesson => <p>{lesson}</p>) : null}
                </>
                : <p>Nothing</p>}
        </>
    )
}


export default UserDetailsComponent;