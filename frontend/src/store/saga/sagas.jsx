import { call, put, takeEvery } from 'redux-saga/effects'
import { addJabatanFailed, addJabatanSuccess, addUsersFailed, addUsersSuccess, authInfo, authInfoFailed, authInfoSuccess, deleteJabatanFailed, deleteJabatanSuccess, deleteUsersSuccess, editJabatanFailed, editJabatanSuccess, editProfilFailed, editProfilSuccess, editUsersFailed, editUsersSuccess, getJabatan, getJabatanFailed, getJabatanSuccess, getUsers, getUsersFailed, getUsersSuccess, loginFailed, loginSuccess, logoutSuccess } from './actions'
import { ADD_JABATAN, ADD_USER, AUTH_INFO, DELETE_JABATAN, DELETE_USER, EDIT_JABATAN, EDIT_USER, GET_JABATAN, GET_USER, LOGOUT, POST_EDIT_PROFILE, POST_LOGIN } from './actionTypes'
import axios from '../../helper/apiHelper';
import { URL_DELETE_LOGOUT, URL_DELTE_JABATAN, URL_EDIT_JABATAN, URL_GET_AUTH, URL_GET_JABATAN, URL_GET_USERS, URL_POST_JABATAN, URL_POST_LOGIN, URL_POST_PROFIL, URL_USERS_BY_ID } from '../../helper/urlHelper';
import Cookies from 'js-cookie';

// auth
export function* loginSaga({ payload: { account, navigate } }) {
    try {
        const response = yield call(axios.post, URL_POST_LOGIN, account)
        document.cookie = `token=${response.data.token}; path=/`;
        yield put(loginSuccess(response.data));
        navigate('/panel');
        yield put(authInfo())
    } catch (err) {
        yield put(loginFailed(err.response));
    }
}

export function* authInfoSaga() {
    const token = Cookies.get('token');
    if (!token) {
        yield put(authInfoFailed())
        Cookies.remove('token')
        return { isLogin: false };
    }
    try {
        const response = yield call(axios.get, URL_GET_AUTH)
        yield put(authInfoSuccess(response.data))
        return { isLogin: true, data: response.data };
    } catch (err) {
        yield put(authInfoFailed(err))
        Cookies.remove('token')
        return { isLogin: false };
    }
}

export function* logoutSaga({ payload: navigate }) {
    try {
        yield call(axios.delete, URL_DELETE_LOGOUT)
        yield put(logoutSuccess())
        Cookies.remove('token')
    } catch (err) {
        //
    }
    navigate('/')
}

// profil
export function* postProfilSaga({ payload: body }) {
    try {
        const response = yield call(axios.patch, URL_POST_PROFIL, body)
        yield put(editProfilSuccess(response))
        yield put(authInfo())
    } catch (err) {
        yield put(editProfilFailed(err.response.data))
    }
}

// jabatan
export function* getJabatanSaga() {
    try {
        const response = yield call(axios.get, URL_GET_JABATAN)
        yield put(getJabatanSuccess(response.data))
    } catch (err) {
        yield put(getJabatanFailed(err.response.data))
    }
}

export function* addJabatanSaga({ payload: {body, navigate} }) {
    try {
        const response = yield call(axios.post, URL_POST_JABATAN, body)
        yield put(addJabatanSuccess(response.data))
        navigate('/panel/jabatan')
        yield put(getJabatan())
    } catch (err) {
        yield put(addJabatanFailed(err.response))
    }
}

export function* editJabatanSaga({ payload: {id, body }}) {
    try {
        const response = yield call(axios.patch, URL_EDIT_JABATAN.replace(':id', id), body)
        yield put(editJabatanSuccess(response))
        yield put(getJabatan())
    } catch (err) {
        yield put(editJabatanFailed(err.response.data))
    }
}

export function* deleteJabatanSaga({ payload: id}) {
    try {
        const response = yield call(axios.delete, URL_DELTE_JABATAN.replace(':id', id))
        yield put(deleteJabatanSuccess(response.data))
        yield put(getJabatan())
    } catch (err) {
        yield put(deleteJabatanFailed(err.response.data))
    }
}

// user
export function* getUserSaga() {
    try {
        const response = yield call(axios.get, URL_GET_USERS)
        yield put(getUsersSuccess(response.data))
    } catch (err) {
        yield put(getUsersFailed(err.response.data))
    }
}

export function* addUserSaga({ payload: {body, navigate} }) {
    try {
        const response = yield call(axios.post, URL_GET_USERS, body)
        yield put(addUsersSuccess(response.data))
        navigate('/panel/users')
        yield put(getUsers())
    } catch (err) {
        yield put(addUsersFailed(err.response))
    }
}

export function* editUserSaga({ payload: {id, body }}) {
    try {
        const response = yield call(axios.patch, URL_USERS_BY_ID.replace(':id', id), body)
        yield put(editUsersSuccess(response))
        yield put(getUsers())
    } catch (err) {
        yield put(editUsersFailed(err.response.data))
    }
}

export function* deleteUserSaga({ payload: id}) {
    try {
        const response = yield call(axios.delete, URL_USERS_BY_ID.replace(':id', id))
        yield put(deleteUsersSuccess(response.data))
        yield put(getUsers())
    } catch (err) {
        // 
    }
}

export function* Sagas() {
    yield takeEvery(POST_LOGIN, loginSaga)
    yield takeEvery(AUTH_INFO, authInfoSaga)
    yield takeEvery(LOGOUT, logoutSaga)
    yield takeEvery(POST_EDIT_PROFILE, postProfilSaga)
    yield takeEvery(ADD_JABATAN, addJabatanSaga)
    yield takeEvery(GET_JABATAN, getJabatanSaga)
    yield takeEvery(EDIT_JABATAN, editJabatanSaga)
    yield takeEvery(DELETE_JABATAN, deleteJabatanSaga)
    yield takeEvery(ADD_USER, addUserSaga)
    yield takeEvery(GET_USER, getUserSaga)
    yield takeEvery(EDIT_USER, editUserSaga)
    yield takeEvery(DELETE_USER, deleteUserSaga)
}
export default Sagas