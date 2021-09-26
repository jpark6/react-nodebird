import { all, fork } from 'redux-saga/effects';

import userSaga from './user';
import postSaga from './post';

export default function* rootSaga(): Generator {
  yield all([
    fork(userSaga),
    fork(postSaga),
  ]);
}
