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
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>
                        </div>
                    )}
                    <Switch>
                        <PrivateRoute exact path="/" component={FirstComponent}/>
                        <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/lesson" component={LessonComponent}/>
                        <Route path="/resource" component={ResourceComponent}/>
                        <Route path="/user" component={UserComponent}/>
                        <Route path="/userDetails" component={UserDetailsComponent}/>
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



