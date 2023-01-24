import {NavBar, PrivateRoute} from "./components/nav/NavBar";
import {Route, Router, Switch, useHistory} from "react-router-dom";
import Lessons from "./components/Lessons/Lessons";
import UserDetails from "./components/User/UserDetails";
import AddLesson from "./components/Lessons/AddLesson";
import Register from "./components/User/Register";
import LessonDetails from "./components/Lessons/LessonDetails";
import React from "react";
import Login from "./components/User/Login";
import userList from "./components/User/UserList";
import UserLessons from "./components/User/UserLessons";
import Footer from "./components/nav/Footer";
import Home from "./components/nav/Home";
import Contact from "./components/nav/Contact"
import EditUser from "./components/User/EditUser";
import EditLesson from "./components/Lessons/EditLesson";
import AddResource from "./components/Resources/AddResource";
import EditProfile from "./components/User/EditProfile";


const App = () => {

    const history = useHistory();

    return (
        <>
            <Router history={history}>
                <NavBar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/loginuser" component={Login}/>
                    <Route path="/profile" component={UserDetails}/>
                    <Route path="/editUser/:id" component={EditUser}/>
                    <Route path="/editProfile" component={EditProfile}/>
                    <Route path="/lessons" component={Lessons}/>
                    <Route path="/addLesson" component={AddLesson}/>
                    <Route path="/users" component={userList}/>
                    <Route path="/registerUser" component={Register}/>
                    <Route path="/lessonDetails/:id" component={LessonDetails}/>
                    <Route path="/userLessons" component={UserLessons}/>
                    <Route path="/editLesson/:id" component={EditLesson}/>
                    <Route path="/addResource/:title" component={AddResource}/>
                    <Route path="/contact" component={Contact}/>
                </Switch>
            </Router>
            <Footer/>
        </>
    )
}


export default App;