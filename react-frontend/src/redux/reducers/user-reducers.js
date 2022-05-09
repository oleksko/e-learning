import * as UserActions from "../actions/user-actions";

const initialState = {
    loadingUser: false,
    errorUser: null,
    users: [],
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: JSON.parse(localStorage.getItem("token")) || {},
    userLessons: [],
    userData: {}
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case UserActions.LOGIN_USER:
            return {
                ...state,
                userData: action.payload,
            };
        case UserActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case UserActions.USER_LOADING:
            return {
                ...state,
                loadingUser: true,
            };
        case UserActions.USER_LOADING_END:
            return {
                ...state,
                loadingUser: false,
            };
        case UserActions.REGISTER_USER:
            return {
                ...state
            }
        case UserActions.FETCH_ALL_USERS:
            return {
                ...state,
                users: action.payload
            }
        case UserActions.REMOVE_USER_DATA:
            return {
                ...state,
                userData: {}
            }
        default:
            return state;
    }
}

export default userReducers;

