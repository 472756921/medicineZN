/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */
import { routerRedux } from 'dva/router'
import { login } from '../service/login'
import { message } from 'antd';

export default {
  namespace: 'login',
  state: {
    user: '',
  },
  subscriptions: {
  },
  effects: {
    * login ({payload}, { put, call, select }) {
      const data = yield call(login, payload)
      if(data.err) {
        message.error(data.err.response.statusText);
        return false
      } else {
        yield put({type: 'loginScuess', payload: data});
        yield put(routerRedux.push({
          pathname: '/web',
        }))
      }
    },
  },
  reducers: {
    loginScuess (state, {payload} ) {
      return {
        ...state,
        user: payload.data,
      }
    }
  },
}
