import React from "react";
import {useSelector} from "../react-redux-hooks";
import {fetchUserInfos} from "../actions/user";

const UserComponent = () => {

    const user = useSelector((state) => state.user.userData);


    React.useEffect(() => {
        if (user) {
            console.log("RERENDER USER COMPONENT")
        }
    }, [user]);

    return (
        <>
            <h1>User Component</h1>
            {console.log("----------------------------")}
            {console.log(user)}
            {console.log("----------------------------")}
        </>
    );
}

export default UserComponent;
