import * as loginService from '../services/login';
import {routerRedux} from 'dva/router'

export default {
  namespace: 'login',

  state: {
    account: '',
    password: '',
    pageStatus: {
      status: 'normal',
      message: '',
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      yield put({type:'loginShow', pyaload:{status:'loading', message: '验证码中'} })
      const d = yield call(loginService.login, payload);
      if(d.err!==undefined && d.err.response.status !== 200) {
        yield put({type:'loginShow', pyaload:{status:'error', message: '登录失败，账号密码错误'} })
      } else if(d.data !== undefined) {
        yield put({type:'loginShow', pyaload:{status:'normal', message: ''} })
        yield put(routerRedux.push('/'))
      }
    },
  },

  reducers: {
    loginShow(state, { pyaload:{ status, message }}) {
      return { ...state, pageStatus: {...state.pageStatus, status: status, message: message} };
    },
  },

};
