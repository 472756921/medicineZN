import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp'
import {queryArticle} from "../../service/web";

export default {
  namespace: 'detail',
  state: {
    article: {
      id: '',
      title: '',
      content: '',
      date: '',
    }
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/web/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'queryArticle', payload: { articleID:match[1] } })
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
  },
  reducers: {
    activeArticle(state, {data}){
      return {...state, article: data}
    }
  },
}
