import { all, call, fork, takeLatest } from 'redux-saga/effects';

function* addPost() {

}

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* postSaga(): Generator {
  yield all([
    fork(watchAddPost),
  ]);
}

