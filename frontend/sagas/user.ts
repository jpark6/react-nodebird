/* eslint-disable @typescript-eslint/no-unused-vars */
import { all, delay, fork, put, call, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS,
  LOAD_USER_REQUEST, LOAD_USER_FAILURE, LOAD_USER_SUCCESS,
  LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
  LOG_OUT_REQUEST, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS
} from '../reducers/user';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadUserAPI(data: any) {
  return axios.get('/user');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* loadUser(action: {data: any}) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = yield call(
      loadUserAPI,
      action.data
    );
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: err,
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

function logInAPI(data: { email: string, password: string }) {
  return axios.post('/user/login', data);
}
function* logIn(action: { data: { email: string, password: string, } }) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      error: err.response.data,
    });
  }
}

function* logOut() {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    yield call(axiosRequest, 'post', '/user/logout');
    yield put({
      type: 'LOG_OUT_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      error: err.response.data,
    });
  }
}

function signUpAPI(data: { email: string, nickname: string, password: string }) {
  return axios.post('/user', data, { withCredentials: true });
}
function* signUp(action: {data:{ email: string, nickname: string, password: string }}) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      error: err.response.data,
    });
  }
}
function* watchLoadUser() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
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
    fork(watchLoadUser),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
