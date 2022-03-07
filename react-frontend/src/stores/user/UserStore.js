import * as UserActions from "../../actions/user";

const initialState = {
    loadingUser: false,
    errorUser: null,
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: JSON.parse(localStorage.getItem("token")) || {},
}

const userReducer = (state = initialState , action) => {
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
        default:
            return state;
    }
}

export default userReducer;

// TODO https://github.com/bottega-code-school/prop-management/blob/master/src/reducers/authReducer.js