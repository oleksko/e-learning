import React from 'react';
import {useDispatch, useSelector} from "../../react-redux-hooks";
import {Link} from "react-router-dom";
import {fetchUserInfos} from "../../redux/thunks/user-thunks";

const style = {
    marginLeft: 10
}

const UserDetailsComponent = () => {
    const userDetails = useSelector((state) => state.user.userData)
    const {user} = useSelector((state) => state.user)
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (user.name) {
            dispatch(fetchUserInfos());
        }
    }, [user.name, dispatch]);


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
                    <p> Your Lessons: </p>
                    {userDetails.lessonsIds && userDetails.lessonsIds.length > 0 ? userDetails.lessonsIds.map(lesson =>
                        <p>
                            <Link to={`/lessonDetails/${lesson}`}> Lesson :{lesson} </Link>
                        </p>
                    ) : null}
                </>
                : <p>Nothing</p>}
        </div>
    )
}


export default UserDetailsComponent;