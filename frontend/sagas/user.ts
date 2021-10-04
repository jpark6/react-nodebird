import { all, delay, fork, put, call, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS
} from '../reducers/user';

function axiosRequest(method: string, uri: string, data: any) {
  switch(method.toUpperCase()) {
    case 'GET': return axios.get(uri, data);
    case 'POST': return axios.post(uri, data);
    default: return axios.get(uri, data);
  }
}
function* follow(action: { data: any; }) {
  try {
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err,
    });
  }
}

function* unfollow(action: { data: any; }) {
  try {
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err,
    });
  }
}

function* logIn(action: { data: { email: string, password: string, } }) {
  try {
    // @ts-ignore
    const result = yield call(axiosRequest, 'post', '/user/login', action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      // @ts-ignore
      error: err,
    });
  }
}

function* logOut() {
  try {
    // @ts-ignore
    const result = yield call(axiosRequest, 'post', '/user/logout');
    yield put({
      type: 'LOG_OUT_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      // @ts-ignore
      error: err.response.data,
    });
  }
}

function signUpAPI(data: { email: string, nickname: string, password: string }) {
  return axios.post('/user', data);
}
function* signUp(action: {data:{ email: string, nickname: string, password: string }}) {
  try {
    // @ts-ignore
    const result = yield call(axiosRequest,'post', '/user', action.data);
    // const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      // @ts-ignore
      error: err.response.data,
    });
  }
}
function* watchFollow() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* watchLogIn() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga(): Generator {
  yield all ([
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
