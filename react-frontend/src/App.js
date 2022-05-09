import {NavBar, PrivateRoute, Role} from "./components/nav/NavBar";
import {AdminPage} from "./components/AdminPage";
import {Route, Router, Switch, useHistory} from "react-router-dom";
import Lessons from "./components/Lessons/Lessons";
import ResourceComponent from "./components/Resources/ResourceComponent";
import UserComponent from "./components/UserComponent";
import UserDetailsComponent from "./components/UserDetailsComponent";
import AddLesson from "./components/Lessons/AddLesson";
import ResourcesForm from "./components/Resources/ResourcesForm";
import Register from "./components/User/Register";
import LessonDetails from "./components/Lessons/LessonDetails";
import LessonDetailsTitle from "./components/Lessons/LessonDetailsTitle";
import React from "react";
import Login from "./components/User/Login";
import userList from "./components/User/UserList";
import UserLessons from "./components/User/UserLessons";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Contact from "./components/Contact"


const App = () => {

    const history = useHistory();

    return (
        <>
            <Router history={history}>
                <NavBar/>
                <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/lessons" component={Lessons}/>
                    <Route path="/resource" component={ResourceComponent}/>
                    <Route path="/userDetails" component={UserComponent}/>
                    <Route path="/user" component={UserDetailsComponent}/>
                    <Route path="/addLesson" component={AddLesson}/>
                    <Route path="/test" component={userList}/>
                    <Route path="/addResource" component={ResourcesForm}/>
                    <Route path="/registerUser" component={Register}/>
                    <Route path="/lessonDetails/:id" component={LessonDetails}/>
                    <Route path="/userLessons" component={UserLessons}/>
                    <Route path="/lessonDetailsTitle/:title" component={LessonDetailsTitle}/>
                    <Route path="/contact" component={Contact}/>
                </Switch>
            </Router>
            <Footer/>
        </>
    )
}


export default App;