/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */
import { routerRedux } from 'dva/router'

export default {
  namespace: 'app',
  state: {
    user: {
      name: '',
      id: '',
      head: '',
    },
    permissions: '',
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      dispatch({ type: 'query' });
    },
  },
  effects: {
    * query( {payload}, {call, put, select} ) {
      const {user} = yield select(_ => _.app)
      if(user.id === '' || user.name === '') {
        yield put(routerRedux.push({
          pathname: '/login',
        }))
      }
    },
  },
  reducers: {
  },
}
