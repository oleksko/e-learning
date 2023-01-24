import React from 'react';
import {useSelector} from "../../react-redux-hooks";
import {Link} from "react-router-dom";

const style = {
    marginLeft: 10
}

const UserDetails = () => {
    const userDetails = useSelector((state) => state.user.userData)

    return (
        <div className="container mt-5">
            {userDetails ?
                <>
                    <p><b>Name:</b>
                        <span style={style}>
                            {userDetails.name}
                          </span>
                    </p>
                    <p><b>Surname:</b>
                        <span style={style}>
                                {userDetails.surname}
                        </span>
                    </p>
                    <p><b>Login:</b>
                        <span style={style}>
                        {userDetails.login}
                        </span>
                    </p>

                    <p><b>Email:</b>
                        <span style={style}>
                        {userDetails.email}
                        </span>
                    </p>
                    <Link to={'/editProfile'}  className="btn btn-success mx-3">Edit Profile</Link>
                </>
                : <p>Nothing</p>}
        </div>
    )
}


export default UserDetails;