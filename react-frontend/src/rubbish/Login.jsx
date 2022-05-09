import React from "react";
import {useHistory} from "react-router-dom";
import {fetchLoginUser} from "../redux/actions/user-actions";
import {useDispatch} from "../react-redux-hooks";

const Login = ({register}) => {

    const initialState = {
        login: "login1",
        password: "123",
    };

    const [{login, password}, setInput] = React.useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        console.log(e.target.value)
        const {login, value} = e.target
        e.persist()
        setInput((prevState) => ({
            ...prevState,
            [e.target.login]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(fetchLoginUser({login, password}));
        history.push("/");
    };


    return  (

        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Login: </label>
                    <div className="col-sm-4">
                        <input
                            type="login"
                            id="login"
                            required
                            value={login}
                            onChange={handleChange}
                            name="login"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Password: </label>
                    <div className="col-sm-4">
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={handleChange}
                            name="password"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <button type="submit" className="btn btn-dark mx-3">
                        Login
                    </button>
                </div>
            </form>
        </div>

    )
};

export default Login;
