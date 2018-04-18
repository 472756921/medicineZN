/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */
import { routerRedux } from 'dva/router';
import { query, querytypeList } from '../service/web';

export default {
  namespace: 'web',
  state: {
    listData: [],
    typeList: [],
    type: '',
  },
  subscriptions: {
    setUp({dispatch, history}) {
      history.listen((location) => {
        if(location.pathname === '/web'){
          dispatch({type: 'querytypes',});
          dispatch({type: 'query',});
        }
      })
    }
  },
  effects: {
    * query ({ payload = { page: 1, pageSize: 20, type: 1 } }, { call, put }) {
      const {data} = yield call(query, payload)
      if (data) {
        yield put({type: 'querySuccess', payload: data});
      }
    },

    * querytypes ({ payload }, { call, put }) {
      const {data} = yield call(querytypeList, payload)
      if (data) {
        yield put({type: 'queryTypeSuccess', payload: data});
      }
    },
  },
  reducers: {
    querySuccess(state, {payload}) {
      return {...state, listData: payload}
    },

    queryTypeSuccess(state, {payload}) {
      return {...state, typeList: payload}
    }
  },
}
