import React from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {useSelector} from "../../react-redux-hooks";
import "./NavBar.css"
import {useDispatch} from "react-redux";
import {logout} from "../../redux/thunks/user-thunks";


export const NavBar = () => {

    const user = useSelector((state) => state.user.userData)
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }


    let nav;

    if (Object.keys(user).length === 0) {
        nav = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a href="/loginuser">
                        <span className="nav-link pl-5 pr-5">Login</span>
                    </a>
                </li>
                <li className="nav-item">
                    <Link to={"/registerUser"}>
                        <span className="nav-link pl-5 pr-5">Register</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/lessons"}>
                        <span className="nav-link pl-5 pr-5">Lessons</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/contact"}>
                        <span className="nav-link pl-5 pr-5">Contact</span>
                    </Link>
                </li>
            </ul>
        )
    } else if (user.role === 'ROLE_STUDENT') {
        nav = (
            <>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/profile"}>
                            <span className="nav-link pl-5 pr-5">{user.name}</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/userLessons"}>
                            <span className="nav-link pl-5 pr-5">User Lessons</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/lessons"}>
                            <span className="nav-link pl-5 pr-5">Lessons</span>
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/"} onClick={handleLogout}>
                            <span className="nav-link pl-5 pr-5">Logout</span>
                        </Link>
                    </li>
                </ul>
            </>
        )

    } else if (user.role === 'ROLE_ADMIN') {
        nav = (
            <>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/profile"}>
                            <span className="nav-link pl-5 pr-5">{user.name}</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/lessons"}>
                            <span className="nav-link pl-5 pr-5">Lessons</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/users"}>
                            <span className="nav-link pl-5 pr-5">Users</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/addLesson"}>
                            <span className="nav-link pl-5 pr-5">Add Lesson</span>
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/"} onClick={handleLogout}>
                            <span className="nav-link pl-5 pr-5">Logout</span>
                        </Link>
                    </li>
                </ul>
            </>
        )
    } else if (user.role === 'ROLE_TEACHER') {
        nav = (
            <>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/profile"}>
                            <span className="nav-link pl-5 pr-5">{user.name}</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/lessons"}>
                            <span className="nav-link pl-5 pr-5">Lessons</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/addLesson"}>
                            <span className="nav-link pl-5 pr-5">Add Lesson</span>
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/"} onClick={handleLogout}>
                            <span className="nav-link pl-5 pr-5">Logout</span>
                        </Link>
                    </li>
                </ul>
            </>
        )
    }

    return (
        <>
            <div className="container-fluid bg-black">
                <nav id="navbar-main" className={`container navbar navbar-expand-lg bg-black text-white `}
                     style={{fontSize: "18px"}}>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {nav}
                    </div>
                </nav>
            </div>
        </>
    )
}


export const Role = {
    Admin: 'Admin',
    Teacher: 'Teacher',
    Student: 'Student'
}

export const PrivateRoute = ({component: Component, roles, ...rest}) => (
    <Route {...rest} render={props => {
        const currentUser = {
            username: "username",
            role: Role.Admin
        }

        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{pathname: '/loginuser'}}/>
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{pathname: '/'}}/>
        }

        // authorised so return component
        return <Component {...props} />
    }}/>
)



