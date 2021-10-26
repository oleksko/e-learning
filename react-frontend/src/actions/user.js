// import {userReducer} from "../stores/user/UserStore";

import axios from "axios";
import jwt from 'jwt-decode'

export const USER_LOADING = "USER_LOADING";
export const USER_LOADING_END = "USER_LOADING_END";
export const LOGIN_USER = "LOGIN_USER";
export const SET_TOKEN = "SET_TOKEN";
export const FETCH_USER_INFO = "FETCH_USER_INFO";

// export const login = (login, password) => (dispatch, getState) => {
//     fetch('http://localhost:8100/users/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: {
//             login: login,
//             password: password
//         }
//     }).then(response => response.json())
//         .then(json => {
//             console.log('Created new product from action');
//             // kiedy udalo sie dodacnowy produkt mozemy zlecic akcje ktora pobierze wszystkie
//             // produkty i uwzgledni w ten sposob dodanie nowego produktu
//             // wystarczy w tym celu zastosowac dispatch, w ktorym wywolujesz akcje ktora ma
//             // zostac uruchomiona
//             console.log('HERE1');
//             console.log(json);
//             console.log('----------------------------')
//             dispatch(userReducer())
//         }).catch(err => console.log(err));
// }

export const userLoading = () => ({
    type: USER_LOADING,
});

export const loginUser = (user) => ({
    type: LOGIN_USER,
    payload: user,
});

export const setUserInfos = (user) => ({
    type: FETCH_USER_INFO,
    payload: user,
});

export const setToken = (token) => ({
    type: SET_TOKEN,
    payload: token,
});

export const userLoadingEnd = () => ({
    type: USER_LOADING_END,
});

export const fetchLoginUser = (user) => async (dispatch) => {
    console.log("FETCH LOGIN  USER");
    console.log(user);
    console.log("FETCH LOGIN  USER");
    dispatch(userLoading());
    try {
        const response = await axios.post("http://localhost:8080/login", user);
        const data = await response.data;
        console.log("==============DATA==============");
        console.log(data);
        const test = jwt(data.accessToken);
        console.log(test);
        console.log("==============DATA==============");
        return [
            dispatch(loginUser(test)),
            dispatch(userLoadingEnd()),
            dispatch(setToken(data.accessToken)),
            localStorage.setItem("token", JSON.stringify(data.accessToken)),
            localStorage.setItem("user", JSON.stringify(test)),
            console.log("HELLO")
        ]
    } catch (error) {
        return [
            dispatch(userLoadingEnd()),
            console.log(error)
        ]
    }
}

export const fetchUserInfos = () => async (dispatch) => {
    console.log("FETCH USER INFOS")
    const user = JSON.parse(localStorage.getItem("user"))

    try {
        const response = await axios.get(`http://localhost:8080/users/login/${user.login}`);
        const data = await  response.data;
        console.log(data);
        dispatch(setUserInfos(data))
    } catch (error) {
        console.log(error);
    }
}