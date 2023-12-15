import { call, put, takeEvery } from 'redux-saga/effects'
import { authInfo, authInfoFailed, authInfoSuccess, loginFailed, loginSuccess } from './action'
import { AUTH_INFO, POST_LOGIN } from './actionType'
import axios from '../../helper/apiHelper';
import { URL_GET_AUTH, URL_POST_LOGIN } from '../../helper/urlHelper';
import Cookies from 'js-cookie';

export function* loginSaga({ payload: { account, navigate } }) {
    try {
        const response = yield call(axios.post, URL_POST_LOGIN, account)
        document.cookie = `token=${response.data.token}; path=/`;
        yield put(loginSuccess(response.data));
        yield put(authInfo())
        navigate('/panel');
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

// export function* logoutSaga() {
//     const token = 
// }


export function* authSaga() {
    yield takeEvery(POST_LOGIN, loginSaga)
    yield takeEvery(AUTH_INFO, authInfoSaga)
}
export default authSaga