import { AUTH_INFO, AUTH_INFO_FAILED, AUTH_INFO_SUCCESS, DELETE_MESSAGE, LOGOUT, LOGOUT_SUCCESS, POST_EDIT_PROFILE, POST_EDIT_PROFILE_FAILED, POST_EDIT_PROFILE_SUCCESS, POST_LOGIN, POST_LOGIN_FAILED, POST_LOGIN_SUCCESS } from "./actionTypes";

export const login = (account, navigate) => ({
    type: POST_LOGIN,
    payload: { account, navigate }
})

export const loginSuccess = (respons) => ({
    type: POST_LOGIN_SUCCESS,
    payload: respons
})

export const loginFailed = (message) => ({
    type: POST_LOGIN_FAILED,
    payload: message
})

export const editProfil = (body) => ({
    type: POST_EDIT_PROFILE,
    payload: body
})
export const deleteMessage = () => ({
    type: DELETE_MESSAGE,
    payload: null
})
export const editProfilSuccess = (response) => ({
    type: POST_EDIT_PROFILE_SUCCESS,
    payload: response
})
export const editProfilFailed = (message) => ({
    type: POST_EDIT_PROFILE_FAILED,
    payload: message
})

export const authInfo = () => ({
    type: AUTH_INFO,
    payload: null
})

export const authInfoSuccess = (respons) => ({
    type: AUTH_INFO_SUCCESS,
    payload: respons
})

export const authInfoFailed = (message) => ({
    type: AUTH_INFO_FAILED,
    payload: message
})


export const logout = (navigate) => ({
    type: LOGOUT,
    payload: navigate,
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
    payload: {},
});
