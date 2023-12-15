import { AUTH_INFO, AUTH_INFO_FAILED, AUTH_INFO_SUCCESS, LOGOUT, LOGOUT_SUCCESS, POST_LOGIN, POST_LOGIN_FAILED, POST_LOGIN_SUCCESS } from "./actionType"

const init_state = {
    response: {},
    isLogin: true,
    check: false,
    message: null
}

const authReducer = (state = init_state, action) => {
    switch (action.type) {
        case POST_LOGIN:
            state = {
                ...state
            }
            break
        case POST_LOGIN_SUCCESS:
            state = {
                ...state,
                isLogin: true,
            }
            break
        case POST_LOGIN_FAILED:
            state = {
                ...state,
                isLogin: false,
                message: action.payload
            }
            break
        case AUTH_INFO:
            state = {
                ...state
            }
            break;
        case AUTH_INFO_SUCCESS:
            state = {
                ...state,
                check: true,
                isLogin: true,
                response: action.payload
            }
            break;
        case AUTH_INFO_FAILED:
            state = {
                ...state,
                check: false,
                isLogin: false,
                message: action.payload
            }
            break;
        case LOGOUT:
            break
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLogin: false,
            }
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default authReducer
