import pathToRegexp from 'path-to-regexp'
import {queryArticle, querytypeList} from "../../service/web";

export default {
  namespace: 'detail',
  state: {
    typeList: '',
    article: {
      id: '',
      title: '',
      content: '',
      date: '',
      type: '',
    }
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/web/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'querytypes' })
        }
      })
    },
  },
  effects: {
    * queryArticle ({ payload }, { call, put }) {
      const {data} = yield call(queryArticle, {id:payload.articleID})
      yield put({type: 'activeArticle', data})
      if(data) {
        yield put({type: 'activeArticle', data});
      }
    },
    * send(state, {data}) {
    },
    * querytypes ({ payload }, { call, put }) {
      const {data} = yield call(querytypeList, payload)
      if (data) {
        yield put({type: 'typeList', data});
      }
    },
  },
  reducers: {
    activeArticle(state, {data}){
      return {...state, article: data}
    },
    typeList(state, {data}) {
      return {...state, typeList: data}
    }
  },
}
