import { routerRedux } from 'dva/router';
import { query, querytypeList, queryArticle } from '../service/web';

export default {
  namespace: 'web',
  state: {
    listData: [],
    typeList: [],
    type: '',
    visible: false,
    article: {
      id: '',
      title: '',
      content: '',
      date: '',
    }
  },
  subscriptions: {
    setUp({dispatch, history}) {
      history.listen((location) => {
        if(location.pathname === '/web'){
          dispatch({type: 'querytypes',});
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
        yield put({type: 'query', payload:{page: 1, pageSize: 20, type: data[0].id}});
      }
    },

    * queryArticle ({ payload }, { call, put }) {
      const {data} = yield call(queryArticle, {id:payload.articleID})
      yield put({type: 'activeArticle', data})
      if(data) {
        yield put({type: 'modelOP', payload: {visible: true}});
      }
    },
  },
  reducers: {
    querySuccess(state, {payload}) {
      return {...state, listData: payload}
    },

    queryTypeSuccess(state, {payload}) {
      return {...state, typeList: payload}
    },

    modelOP(state, {payload}) {
      return {...state, visible: payload.visible}
    },

    activeArticle(state, {data}){
      return {...state, article: data}
    }
  },
}
