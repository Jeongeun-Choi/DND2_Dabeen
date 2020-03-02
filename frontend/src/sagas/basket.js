import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {
    LOAD_USERBASKETPOST_REQUEST,
    loadUserBasketPostSuccessAction,
    loadUserBasketPostFailureAction,
    PAY_POST_REQUEST,
    PayPostSuccessAction,
    PayPostFailuerAction,
} from '../reducers/basket';
import axios from 'axios';

// 미결제 Post 불러오는 saga
function loadUserBasketPostApi({ userNum, cookie }){
    return  axios.get(`/help/${userNum}/no-payment-helps`,{headers : {Authorization: `Bearer ${cookie}`}});
}
function* loadUserBasketPost(action) {
    try {
        const result = yield call(loadUserBasketPostApi, action.data);
        yield put(loadUserBasketPostSuccessAction(result.data.data));
    } catch(e) {
        console.error(e);
        yield put(loadUserBasketPostFailureAction(e));
    }
};
function* watchLoadUserBasketPost() {
    yield takeLatest(LOAD_USERBASKETPOST_REQUEST, loadUserBasketPost);
}
// 결제를 하는 saga
function payPostApi({ userNum, helpNums, payWay, cookie }){
    const reqData = {
        user_num: userNum,
        pymt_mthd_type: payWay,
        help_nums: helpNums,
    }
    return  axios.get(`/pymt/execution`, reqData, {headers : {Authorization: `Bearer ${cookie}`}});
}
function* payPost(action) {
    try {
        const result = yield call(payPostApi, action.data);
        yield put(PayPostSuccessAction(result.data.data));
    } catch(e) {
        console.error(e);
        yield put(PayPostFailuerAction(e));
    }
};
function* watchPayPost() {
    yield takeLatest(PAY_POST_REQUEST, payPost);
}

export default function* opponentSaga() {
    yield all([
        fork(watchLoadUserBasketPost),
        fork(watchPayPost),
    ]);
};