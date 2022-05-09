import React, {useState} from 'react';
import {useDispatch} from "../../react-redux-hooks";
import {useHistory} from "react-router-dom";
import {addUser} from "../../redux/thunks/user-thunks";

const Register = () => {
    const initialState = {
        id: null,
        name: '',
        surname: '',
        login: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        role: 'ROLE_STUDENT'
    }

    const dispatch = useDispatch();
    const history = useHistory();

    const [user, setUser] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);


    const handleInputChange = event => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }


    const submitUser = () => {
        const {name, surname, email, login, password, passwordConfirmation, role} = user
        dispatch(addUser(name, surname, email, login, password, passwordConfirmation, role));
        history.push("/");
    }


    return (
        <div className="container mt-5">
            <form onSubmit={submitUser}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="name"
                            required
                            value={user.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Surname: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="email"
                            required
                            value={user.email}
                            onChange={handleInputChange}
                            name="email"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email: </label>
                    <div className="col-sm-4">
                        <input
                            type="password"
                            name="password"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Login: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="login"
                            required
                            value={user.login}
                            onChange={handleInputChange}
                            name="login"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Password: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="password"
                            required
                            value={user.password}
                            onChange={handleInputChange}
                            name="password"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Confirmation Password: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="passwordConfirmation"
                            required
                            value={user.passwordConfirmation}
                            onChange={handleInputChange}
                            name="passwordConfirmation"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Confirmation Password: </label>
                    <div className="col-sm-4">
                        <select value={user.role} onChange={handleInputChange} name="role" id="role">
                            <option value="default" disabled>Choose an option</option>
                            <option value="ROLE_STUDENT">STUDENT</option>
                            <option value="ROLE_DOCTOR">DOCTOR</option>
                            <option value="ROLE_ADMIN">ADMIN</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <button type="submit" className="btn btn-dark mx-3">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    )

}


export default Register;