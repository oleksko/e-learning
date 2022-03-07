import React, {useEffect} from "react";
import {Redirect, Route, BrowserRouter as Router, Switch, NavLink, useHistory, Link} from "react-router-dom";
import Login from "../../rubbish/Login";
import {AdminPage} from "../AdminPage";
import FirstComponent from "../AdminComponent";
import App from "../../rubbish/App";
import LessonComponent from "../LessonComponent";
import ResourceComponent from "../ResourceComponent";
import UsersComponent from "../../rubbish/UsersComponent";
import UserComponent from "../UserComponent";
import UserDetailsComponent from "../UserDetailsComponent";
import styled from 'styled-components';
import {useDispatch, useSelector} from "../../react-redux-hooks";
import {ADD_LESSON} from "../../actions/lesson";
import AddLesson from "../AddLesson";
import TestComponent from "../TestComponent";
import ResourcesForm from "../ResourcesForm";
import Lessons from "../Lessons";
import LessonDetails from "../LessonDetails";
import RegisterUser from "../RegisterUser";
import LessonDetailsTitle from "../LessonDetailsTitle";


export const NavContainer = styled.div`
  background-color: #888;

`;


export const NavBar = () => {

    const user = useSelector((state) => state.user.userData)
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <>
            {console.log("NAVBAR CONTAINER")}
            {console.log(user)}
            {console.log("NAVBAR CONTAINER")}
            <Router history={history}>
                <NavContainer>
                    {/*<NavLink to="/" exact>Home</NavLink>*/}
                    {/*<NavLink to="/admin">Admin</NavLink>*/}
                    {/*{user ? (user.role === 'ROLE_STUDENT' ?   <NavLink to="/userDetails">User Details</NavLink> :  <NavLink to="/user">User</NavLink>}*/}
                    {user && Object.keys(user) ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {user.name}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    UserDetails
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/lesson"} className="nav-link">
                                    Lesson
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/addlesson"} className="nav-link">
                                    Add Lesson
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link">
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/test"} className="nav-link">
                                    test
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/addLesson"} className="nav-link">
                                    addLesson
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/addResource"} className="nav-link">
                                    ResourcesForm
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/lessons"} className="nav-link">
                                    Lessons
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/registerUser"} className="nav-link">
                                    registerUser
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/lessonDetailsTitle"} className="nav-link">
                                    lessonDetailsTitle
                                </Link>
                            </li>
                        </div>
                    )}
                    <Switch>
                        <PrivateRoute exact path="/" component={FirstComponent}/>
                        <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/lessons" component={Lessons}/>
                        <Route path="/resource" component={ResourceComponent}/>
                        <Route path="/userDetails" component={UserComponent}/>
                        <Route path="/user" component={UserDetailsComponent}/>
                        <Route path="/addLesson" component={AddLesson}/>
                        <Route path="/test" component={TestComponent}/>
                        <Route path="/addResource" component={ResourcesForm}/>
                        <Route path="/registerUser" component={RegisterUser}/>
                        <Route path="/lessonDetails/:id" component={LessonDetails}/>
                        <Route path="/lessonDetailsTitle/:title" component={LessonDetailsTitle}/>
                    </Switch>
                </NavContainer>
            </Router>

        </>
    )
}

export const Role = {
    Admin: 'Admin',
    User: 'User'
}

export const PrivateRoute = ({component: Component, roles, ...rest}) => (
    <Route {...rest} render={props => {
        const currentUser = {
            username: "username",
            role: Role.Admin
        }

        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{pathname: '/login'}}/>
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



