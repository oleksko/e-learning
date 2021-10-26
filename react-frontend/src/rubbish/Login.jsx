import React from "react";
import {Link, useHistory} from "react-router-dom";
import { LoginContainer } from "./Login.styles";
import {fetchLoginUser} from "../actions/user";
import {useDispatch} from "../react-redux-hooks";

const Login = ({ register }) => {
  const initialState = {
    login: "login1",
    password: "123",
  };
  // destructuring properties off of input
  const [{ login, password }, setInput] = React.useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    // spread prevState and add new values with name, dynamically
    console.log(e.target.value)
    const { login, value } = e.target
    e.persist()
    setInput((prevState) => ({
      ...prevState,
      [e.target.login]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fetchLoginUser({ login, password }));
    history.push("/");
  };

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <input
          type="login"
          name="login"
          aria-label="login"
          placeholder="login"
          onChange={handleChange}
          value={login}
        />
        <input
          type="password"
          name="password"
          aria-label="password"
          placeholder="Password"
          onChange={handleChange}
          value={password}
        />
        <button aria-label="login" type="submit">
          {register ? "Register" : "Login"}
        </button>
      </form>

      <h1 style={{ textAlign: "center", color: "white", marginBottom: "40px" }}>
        Don't have an account?{" "}
        {/*<Link to="/profile/register" style={{ color: "lightgray" }}>*/}
        {/*  Register*/}
        {/*</Link>*/}
      </h1>
    </LoginContainer>
  );
};

export default Login;
