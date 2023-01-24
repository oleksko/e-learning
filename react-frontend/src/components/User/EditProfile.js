import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useSelector} from "../../react-redux-hooks";
import {updateUser} from "../../redux/thunks/user-thunks";
import {useHistory} from "react-router-dom";


const EditProfile = () => {

    const userDetails = useSelector((state) => state.user.userData)

    const dispatch = useDispatch();
    const history = useHistory();


    const onFormSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUser(user.id, name, surname, email, login, role));
        history.push("/");
    }

    const [user, setUser] = useState(userDetails);
    const {name, surname, email, login, role} = user;


    const handleInputChange = event => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }

    return (
        <div className="container mt-5">
            <form onSubmit={onFormSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="name"
                            required
                            value={name}
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
                            id="surname"
                            required
                            value={surname}
                            onChange={handleInputChange}
                            name="surname"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="email"
                            required
                            value={email}
                            onChange={handleInputChange}
                            name="email"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Login: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="login"
                            required
                            value={login}
                            onChange={handleInputChange}
                            name="login"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <button type="submit" className="btn btn-dark mx-3">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}


export default EditProfile;