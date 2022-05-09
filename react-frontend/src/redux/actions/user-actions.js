export const USER_LOADING = "USER_LOADING";
export const USER_LOADING_END = "USER_LOADING_END";
export const LOGIN_USER = "LOGIN_USER";
export const SET_TOKEN = "SET_TOKEN";
export const FETCH_USER_INFO = "FETCH_USER_INFO";
export const REGISTER_USER = "REGISTER_USER";
export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REMOVE_USER_DATA = "REMOVE_USER_DATA";

export const getAllUsers = (users) => ({
    type: FETCH_ALL_USERS,
    payload: users
});

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

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
})

export const removeUserData = () => ({
    type: REMOVE_USER_DATA
})
