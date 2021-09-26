import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';

// function logInAPI() {
//
// }

function* logIn(action: { data: any; }) {
  try {
    console.log('SAGA LOGIN');
    yield delay(1000);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: action.data
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err,
    });
  }
}

function* logOut(action: { data: any; }) {
  try {
    console.log('SAGA LOGOUT');
    yield delay(1000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: action.data
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err,
    });
  }
}
function* watchLogIn() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga(): Generator {
  yield all ([
    fork(watchLogIn),
    fork(watchLogOut),
  ]);
}
