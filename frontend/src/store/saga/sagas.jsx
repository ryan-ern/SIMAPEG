import { call, put, takeEvery } from 'redux-saga/effects'
import { authInfo, authInfoFailed, authInfoSuccess, editProfilFailed, editProfilSuccess, loginFailed, loginSuccess, logoutSuccess } from './actions'
import { AUTH_INFO, LOGOUT, POST_EDIT_PROFILE, POST_LOGIN } from './actionTypes'
import axios from '../../helper/apiHelper';
import { URL_DELETE_LOGOUT, URL_GET_AUTH, URL_POST_LOGIN, URL_POST_PROFIL } from '../../helper/urlHelper';
import Cookies from 'js-cookie';

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

function* postProfilSaga({ payload: body }) {
    try {
        const response = yield call(axios.post, URL_POST_PROFIL, body)
        yield put(editProfilSuccess(response))
        yield put(authInfo())
    } catch (err) {
        yield put(editProfilFailed(err.response.data))
    }
}


export function* Sagas() {
    yield takeEvery(POST_LOGIN, loginSaga)
    yield takeEvery(AUTH_INFO, authInfoSaga)
    yield takeEvery(LOGOUT, logoutSaga)
    yield takeEvery(POST_EDIT_PROFILE, postProfilSaga)
}
export default Sagas