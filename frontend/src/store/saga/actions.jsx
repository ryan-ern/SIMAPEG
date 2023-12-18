import { ADD_JABATAN, ADD_JABATAN_FAILED, ADD_JABATAN_SUCCESS, ADD_USER, ADD_USER_FAILED, ADD_USER_SUCCESS, AUTH_INFO, AUTH_INFO_FAILED, AUTH_INFO_SUCCESS, DELETE_JABATAN, DELETE_JABATAN_SUCCESS, DELETE_MESSAGE, DELETE_USER, DELETE_USER_SUCCESS, EDIT_JABATAN, EDIT_JABATAN_FAILED, EDIT_JABATAN_SUCCESS, EDIT_USER, EDIT_USER_FAILED, EDIT_USER_SUCCESS, GET_JABATAN, GET_JABATAN_FAILED, GET_JABATAN_SUCCESS, GET_USER, GET_USER_FAILED, GET_USER_SUCCESS, LOGOUT, LOGOUT_SUCCESS, POST_EDIT_PROFILE, POST_EDIT_PROFILE_FAILED, POST_EDIT_PROFILE_SUCCESS, POST_LOGIN, POST_LOGIN_FAILED, POST_LOGIN_SUCCESS } from "./actionTypes";

// auth
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

// user me
export const editProfil = (body) => ({
    type: POST_EDIT_PROFILE,
    payload: body
})
export const editProfilSuccess = (response) => ({
    type: POST_EDIT_PROFILE_SUCCESS,
    payload: response
})
export const editProfilFailed = (message) => ({
    type: POST_EDIT_PROFILE_FAILED,
    payload: message
})

// Jabatan
export const getJabatan = () => ({
    type: GET_JABATAN,
    payload: null
})
export const getJabatanSuccess = (respons) => ({
    type: GET_JABATAN_SUCCESS,
    payload: respons
})
export const getJabatanFailed = (message) => ({
    type: GET_JABATAN_FAILED,
    payload: message
})

export const editJabatan = (id, body) => ({
    type: EDIT_JABATAN,
    payload: {id, body}
})
export const editJabatanSuccess = (respons) => ({
    type: EDIT_JABATAN_SUCCESS,
    payload: respons
})
export const editJabatanFailed = (message) => ({
    type: EDIT_JABATAN_FAILED,
    payload: message
})

export const addJabatan = (body, navigate) => ({
    type: ADD_JABATAN,
    payload: {body, navigate}
})
export const addJabatanSuccess = (respons) => ({
    type: ADD_JABATAN_SUCCESS,
    payload: respons
})
export const addJabatanFailed = (message) => ({
    type: ADD_JABATAN_FAILED,
    payload: message
})

export const deleteJabatan = (id) => ({
    type: DELETE_JABATAN,
    payload: id
})
export const deleteJabatanSuccess = (respons) => ({
    type: DELETE_JABATAN_SUCCESS,
    payload: respons
})
export const deleteJabatanFailed = (message) => ({
    type: DELETE_JABATAN_SUCCESS,
    payload: message
})

// users
export const getUsers = () => ({
    type: GET_USER,
    payload: null
})
export const getUsersSuccess = (respons) => ({
    type: GET_USER_SUCCESS,
    payload: respons
})
export const getUsersFailed = (message) => ({
    type: GET_USER_FAILED,
    payload: message
})

export const editUsers = (id, body) => ({
    type: EDIT_USER,
    payload: {id, body}
})
export const editUsersSuccess = (respons) => ({
    type: EDIT_USER_SUCCESS,
    payload: respons
})
export const editUsersFailed = (message) => ({
    type: EDIT_USER_FAILED,
    payload: message
})

export const addUsers = (body, navigate) => ({
    type: ADD_USER,
    payload: {body, navigate}
})
export const addUsersSuccess = (respons) => ({
    type: ADD_USER_SUCCESS,
    payload: respons
})
export const addUsersFailed = (message) => ({
    type: ADD_USER_FAILED,
    payload: message
})

export const deleteUsers = (id) => ({
    type: DELETE_USER,
    payload: id
})
export const deleteUsersSuccess = (respons) => ({
    type: DELETE_USER_SUCCESS,
    payload: respons
})


// delete notify
export const deleteMessage = () => ({
    type: DELETE_MESSAGE,
    payload: null
})
