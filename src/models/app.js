/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */
import { routerRedux } from 'dva/router'
import { getUser } from '../services/app';

export default {
  namespace: 'app',
  state: {
    user: '',
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      dispatch({ type: 'query' });
    },
  },
  effects: {
    * query( {payload}, {call, put, select} ) {
      const {data}  = yield call(getUser);
      const {user, success} = data;
      if(!user) {
        yield put(routerRedux.push({
          pathname: '/login',
        }))
      }
    },
  },
  reducers: {
  },
}
