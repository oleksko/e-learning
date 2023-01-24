import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useSelector} from "../../react-redux-hooks";
import {updateUser} from "../../redux/thunks/user-thunks";
import {useHistory} from "react-router-dom";


const EditUser = ({match}) => {

    const {id} =  match.params
    const history = useHistory();

    const userDetails = useSelector(state =>
        state.user.users.find(user => user.id === id)
    )

    const dispatch = useDispatch();

    const onFormSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUser(id, name, surname, email, login, role));
        history.push("/users");
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
                    <label className="col-sm-2 col-form-label">Role: </label>
                    <div className="col-sm-4">
                        <select value={role} onChange={handleInputChange} name="role" id="role">
                            <option value="default" disabled>Choose an option</option>
                            <option value="ROLE_STUDENT">STUDENT</option>
                            <option value="ROLE_TEACHER">TEACHER</option>
                            <option value="ROLE_ADMIN">ADMIN</option>
                        </select>
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


export default EditUser;