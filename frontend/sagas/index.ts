import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import postSaga from './post';

axios.defaults.baseURL = 'http://localhost:4000';

export default function* rootSaga(): Generator {
  yield all([
    fork(userSaga),
    fork(postSaga),
  ]);
}
