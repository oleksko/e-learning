import React from "react";
import ReactDOM from 'react-dom';
import FirstComponent from "./components/AdminComponent";
import {Provider} from "react-redux";
import App from "./rubbish/App";
import store, {history} from "./stores/store";
import {Router} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";
import {NavBar} from "./components/nav/NavBar";
import TestAppNavbar from "./rubbish/Navbar/TestAppNavbar";
import {MainComponent} from "./components/MainComponent";

ReactDOM.render(
        <Provider store={store}>
            {/*<Router>*/}
                {/*    <TestAppNavbar/>*/}
                <NavBar/>
            {/*</Router>*/}
        </Provider>
    ,
    document.getElementById('root'));
