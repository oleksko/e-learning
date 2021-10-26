import React from "react"
import { Route, Switch } from "react-router-dom";



import { LoginRegisterContainer, Background } from "./LoginRegister.styles";
import {useSelector} from "../react-redux-hooks";
import Login from "./Login";

const LoginRegister = () => {
  const { loadingUser } = useSelector((state) => state.user);

  return (
    <div>

        <div>
         <div>
           <p>HELLO</p>
         </div>


        <Login/>

        </div>

    </div>
  );
};

export default LoginRegister;
