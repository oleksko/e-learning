import React, {useState} from 'react';
import {useDispatch} from "../react-redux-hooks";
import {addUser} from "../actions/user";

const RegisterUser = () => {
    const initialState = {
        id: null,
        name: '',
        login: '',
        password: '',
        passwordConfirmation: '',
        role: ''
    }

    const dispatch = useDispatch();

    const [user, setUser] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);


    const handleInputChange = event => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }


    const submitUser = () => {
        const {name, login, password, passwordConfirmation, role} = user
        console.log(user)
        dispatch(addUser(name, login, password, passwordConfirmation, role));
    }

    return (
        <div className="submit-form">
            {submitted ? (<div>
                <h4>You submitted successfully! </h4>
                <button>Add new Lesson</button>
            </div>) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={user.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                        <div className="form-group">
                            <label htmlFor="login">Login</label>
                            <input
                                type="text"
                                className="form-control"
                                id="login"
                                required
                                value={user.login}
                                onChange={handleInputChange}
                                name="login"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                required
                                value={user.password}
                                onChange={handleInputChange}
                                name="password"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordConfirmation">Confirmation Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="passwordConfirmation"
                                required
                                value={user.passwordConfirmation}
                                onChange={handleInputChange}
                                name="passwordConfirmation"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">role</label>
                            <input
                                type="text"
                                className="form-control"
                                id="role"
                                required
                                value={user.role}
                                onChange={handleInputChange}
                                name="role"
                            />
                        </div>
                        <button onClick={submitUser} className="btn btn-success"> Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}


export default RegisterUser;