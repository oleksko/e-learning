import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";


import {useDispatch} from "../react-redux-hooks";
import Login from "./Login";
import LoginRegister from "./LoginRegister";

const App = () => {
    const dispatch = useDispatch();

    // React.useEffect(() => {
    //     window.addEventListener("resize", () => {
    //         dispatch(setWidth(window.innerWidth));
    //     });
    //
    //     return () => {
    //         window.removeEventListener("resize", () => {
    //             dispatch(setWidth(window.innerWidth));
    //         });
    //     };
    // }, [dispatch]);

    return (
        <div className="App">
            <LoginRegister/>
        </div>
    );
};

export default App;
