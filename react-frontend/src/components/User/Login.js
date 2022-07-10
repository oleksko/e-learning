import React from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchLoginUser} from "../../redux/thunks/user-thunks";



const Login = ({register}) => {

    const initialState = {
        login: "admin",
        password: "123",
    };

    const [login, setLogin] = React.useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setLogin({...login, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(fetchLoginUser(login));
        history.push("/");
    };


    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Login: </label>
                    <div className="col-sm-4">
                        <input
                            type="login"
                            id="login"
                            required
                            value={login.login}
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
                            value={login.password}
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
