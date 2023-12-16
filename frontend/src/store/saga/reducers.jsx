import { AUTH_INFO, AUTH_INFO_FAILED, AUTH_INFO_SUCCESS, DELETE_MESSAGE, LOGOUT, LOGOUT_SUCCESS, POST_EDIT_PROFILE, POST_EDIT_PROFILE_FAILED, POST_EDIT_PROFILE_SUCCESS, POST_LOGIN, POST_LOGIN_FAILED, POST_LOGIN_SUCCESS } from "./actionTypes"

const init_state = {
    response: {},
    isLogin: false,
    check: false,
    message: null,
    edit: null
}

const Reducers = (state = init_state, action) => {
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
        case POST_EDIT_PROFILE:
            state = {
                ...state
            }
            break
        case POST_EDIT_PROFILE_SUCCESS:
            state = {
                ...state,
                edit: action.payload.data,
            }
            break
        case POST_EDIT_PROFILE_FAILED:
            state = {
                ...state,
                message: action.payload
            }
            break
        case DELETE_MESSAGE:
            state = {
                ...state,
                edit: null
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
                response: action.payload,
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
            state = { ...init_state };
            state = {
                ...state,
                isLogin: false,
            }
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default Reducers
