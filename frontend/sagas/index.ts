import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import postSaga from './post';

axios.defaults.baseURL = 'http://localhost:4000';

export function axiosRequest(method: string, uri: string, data: any) {
  switch(method.toUpperCase()) {
    case 'GET': return axios.get(uri, data);
    case 'POST': return axios.post(uri, data);
    default: return axios.get(uri, data);
  }
}

export default function* rootSaga(): Generator {
  yield all([
    fork(userSaga),
    fork(postSaga),
  ]);
}
