import React from 'react';
import {Link} from "react-router-dom";

const TestAppNavbar = () => {

    const user = 'ROLE_USER';

    return (
        <>
            <div className="container-fluid bg-black">
                <nav id="navbar-main" className={`container navbar navbar-expand-lg bg-black text-white `}
                     style={{fontSize: "18px"}}>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {(user === 'ROLE_STUDENT') ?
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={"/profile"}>
                                        <span className="nav-link pl-5 pr-5">{user.name}</span>
                                    </Link>
                                </li>
                                {/*TODO ADD LOGOUT*/}
                                <li className="nav-item">
                                    <a href="/logout">
                                        <span className="nav-link pl-5 pr-5">Logout</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/userLessons"}>
                                        <span className="nav-link pl-5 pr-5">User Lessons</span>
                                    </Link>
                                </li>
                                {/*TODO LESSONS TO SUBSCRIBE*/}
                                <li className="nav-item">
                                    <Link to={"/lessons"} >
                                        <span className="nav-link pl-5 pr-5">Lessons</span>
                                    </Link>
                                </li>
                            </ul>
                            : (user === 'ROLE_USER') ?
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to={"/profile"}>
                                            <span className="nav-link pl-5 pr-5">{user.name}</span>
                                        </Link>
                                    </li>
                                    {/*TODO ADD LOGOUT*/}
                                    <li className="nav-item">
                                        <a href="/logout">
                                            <span className="nav-link pl-5 pr-5">Logout</span>
                                        </a>
                                    </li>
                                    {/*TODO LESSONS TO SUBSCRIBE*/}
                                    <li className="nav-item">
                                        <Link to={"/lessons"} >
                                            <span className="nav-link pl-5 pr-5">Lessons</span>
                                        </Link>
                                    </li>
                                    {/*TODO ADD LESSON*/}
                                    <li className="nav-item">
                                        <Link to={"/addLesson"}>
                                            <span className="nav-link pl-5 pr-5">Add Lesson</span>
                                        </Link>
                                    </li>
                                    {/*TODO ADD RESOURCE ????*/}
                                    <li className="nav-item">
                                        <Link to={"/addResource"}>
                                            <span className="nav-link pl-5 pr-5">Add Resource</span>
                                        </Link>
                                    </li>
                                </ul>
                                : (user === 'ROLE_ADMIN') ?
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <Link to={"/profile"}>
                                                <span className="nav-link pl-5 pr-5">{user.name}</span>
                                            </Link>
                                        </li>
                                        {/*TODO ADD LOGOUT*/}
                                        <li className="nav-item">
                                            <a href="/logout">
                                                <span className="nav-link pl-5 pr-5">Logout</span>
                                            </a>
                                        </li>
                                        {/*TODO LESSONS TO EDIT*/}
                                        <li className="nav-item">
                                            <Link to={"/lessons"} >
                                                <span className="nav-link pl-5 pr-5">Lessons</span>
                                            </Link>
                                        </li>
                                        {/*TODO USERS TO EDIT*/}
                                        <li className="nav-item">
                                            <Link to={"/users"} >
                                                <span className="nav-link pl-5 pr-5">Users</span>
                                            </Link>
                                        </li>
                                        {/*TODO ADD LESSON*/}
                                        <li className="nav-item">
                                            <Link to={"/addLesson"}>
                                                <span className="nav-link pl-5 pr-5">Add Lesson</span>
                                            </Link>
                                        </li>
                                        {/*TODO ADD RESOURCE ????*/}
                                        <li className="nav-item">
                                            <Link to={"/addResource"}>
                                                <span className="nav-link pl-5 pr-5">Add Resource</span>
                                            </Link>
                                        </li>
                                    </ul>
                                    :
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <a href="/login">
                                                <span className="nav-link pl-5 pr-5">Login</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/registerUser"}>
                                                <span className="nav-link pl-5 pr-5">Register</span>
                                            </Link>
                                        </li>
                                        {/*TODO SPECIFIC COMPONENT ONLY TO VIEW LESSONS*/}
                                        <li className="nav-item">
                                            <Link to={"/lessons"} >
                                                <span className="nav-link pl-5 pr-5">Lessons</span>
                                            </Link>
                                        </li>
                                        {/*TODO ADD CONTACT*/}
                                        <li className="nav-item">
                                            <Link to={"/contact"} >
                                                <span className="nav-link pl-5 pr-5">Contact</span>
                                            </Link>
                                        </li>
                                    </ul>
                        }
                    </div>
                </nav>
            </div>
        </>
    )
}

export default TestAppNavbar;