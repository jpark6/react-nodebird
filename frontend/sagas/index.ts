import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';

function logInAPI() {

}

function* logIn() {
  try {
    yield delay(1000);
    yield put({
      type: 'LOG_IN_SUCCESS',
    });
  } catch (err: unknown) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}

function* logOut() {
  yield call(logInAPI);
}

function* addPost() {
  yield call(logInAPI);
}

function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* rootSaga(): Generator {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchAddPost),
  ]);
}
