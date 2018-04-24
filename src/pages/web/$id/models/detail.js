import pathToRegexp from 'path-to-regexp'
import {queryArticle, querytypeList} from "../../service/web";

export default {
  namespace: 'detail',
  state: {
    optype: 'edit',
    typeList: '',
    typeName: '',
    article: {
      id: '',
      title: '',
      content: '',
      date: '',
      type: '',
    }
  },
  subscriptions: {
    setUp({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname.indexOf('/web/') !== -1) {
          const id = /web\/\d+/.exec(location.pathname);
          if(id !== null) {
            dispatch({type: 'queryArticle', payload:{articleID: id}});
          } else {
            dispatch({type: 'querytypes'});
          }
        }
      })
    }
  },
  effects: {
    * queryArticle ({ payload }, { call, put }) {
      const article = yield call(queryArticle, {id:payload.articleID});
      const types = yield call(querytypeList);
      const typeName = types.data.filter((it) => {
        if(it.id === article.data.typeID) {
          return it;
        }
      })
      if(types && article) {
        let d = {types:types.data, article:article.data, typeName: typeName[0].name};
        yield put({type: 'activeArticle', d});
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
    typeChange(state, {data}) {
      return {...state, optype: data.type, article: ''}
    },
    activeArticle(state, {d:{article, types, typeName}}){
      return {...state, article: article, typeList: types, typeName: typeName}
    },
    typeList(state, {data}) {
      return {...state, typeList: data}
    }
  },
}
