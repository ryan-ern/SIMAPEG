import { ADD_JABATAN, ADD_JABATAN_FAILED, ADD_JABATAN_SUCCESS, ADD_USER, ADD_USER_FAILED, ADD_USER_SUCCESS, AUTH_INFO, AUTH_INFO_FAILED, AUTH_INFO_SUCCESS, DELETE_JABATAN, DELETE_JABATAN_FAILED, DELETE_JABATAN_SUCCESS, DELETE_MESSAGE, DELETE_USER, DELETE_USER_SUCCESS, EDIT_JABATAN, EDIT_JABATAN_FAILED, EDIT_JABATAN_SUCCESS, EDIT_USER, EDIT_USER_FAILED, EDIT_USER_SUCCESS, GET_JABATAN, GET_JABATAN_FAILED, GET_JABATAN_SUCCESS, GET_USER, GET_USER_FAILED, GET_USER_SUCCESS, LOGOUT, LOGOUT_SUCCESS, POST_EDIT_PROFILE, POST_EDIT_PROFILE_FAILED, POST_EDIT_PROFILE_SUCCESS, POST_LOGIN, POST_LOGIN_FAILED, POST_LOGIN_SUCCESS } from "./actionTypes"

const init_state = {
    info: {},
    isLogin: false,
    check: false,
    message: null,
    edit: null,
    delete: null,
    add: null,
    jabatan: [],
    user: []
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
            message: null,
            edit: null,
            delete: null,
            add: null,
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
            info: action.payload,
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
    case GET_JABATAN:
        state = {
            ...state,
        }
        break
    case GET_JABATAN_SUCCESS:
        state = {
            ...state,
            jabatan: action.payload,
        }
        break
    case GET_JABATAN_FAILED:
        state = {
            ...state,
            message: action.payload
        }
        break
    case EDIT_JABATAN:
        state = {
            ...state,
        }
        break
    case EDIT_JABATAN_SUCCESS:
        state = {
            ...state,
            edit: action.payload.data,
        }
        break
    case EDIT_JABATAN_FAILED:
        state = {
            ...state,
            message: action.payload
        }
        break
    case ADD_JABATAN:
        state = {
            ...state,
        }
        break
    case ADD_JABATAN_SUCCESS:
        state = {
            ...state,
            add: action.payload,
        }
        break
    case ADD_JABATAN_FAILED:
        state = {
            ...state,
            message: action.payload
        }
        break
    case DELETE_JABATAN:
        state = {
            ...state,
        }
        break
    case DELETE_JABATAN_SUCCESS:
        state = {
            ...state,
            delete: action.payload
        }
        break
    case DELETE_JABATAN_FAILED:
        state = {
            ...state,
            delete: action.payload
        }
        break
    case GET_USER:
        state = {
            ...state,
        }
        break
    case GET_USER_SUCCESS:
        state = {
            ...state,
            user: action.payload,
        }
        break
    case GET_USER_FAILED:
        state = {
            ...state,
            message: action.payload
        }
        break
    case EDIT_USER:
        state = {
            ...state,
        }
        break
    case EDIT_USER_SUCCESS:
        state = {
            ...state,
            edit: action.payload.data,
        }
        break
    case EDIT_USER_FAILED:
        state = {
            ...state,
            message: action.payload
        }
        break
    case ADD_USER:
        state = {
            ...state,
        }
        break
    case ADD_USER_SUCCESS:
        state = {
            ...state,
            add: action.payload,
        }
        break
    case ADD_USER_FAILED:
        state = {
            ...state,
            message: action.payload
        }
        break
    case DELETE_USER:
        state = {
            ...state,
        }
        break
    case DELETE_USER_SUCCESS:
        state = {
            ...state,
            delete: action.payload
        }
        break
    case LOGOUT:
        break
    case LOGOUT_SUCCESS:
        state = { ...init_state };
        state = {
            ...state,
            isLogin: false,
        }
        break
    default:
        state = { ...state };
        break;
    }
    return state;
}

export default Reducers
