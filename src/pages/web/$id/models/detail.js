import pathToRegexp from 'path-to-regexp'
import {queryArticle, querytypeList, newArticle} from "../../service/web";
import { message } from 'antd';

export default {
  namespace: 'detail',
  state: {
    optype: 'edit',
    typeList: [],
    article: {
      id: '',
      title: '',
      type: '',
      typeName: '',
      date: '',
      content: '',
    }
  },
  subscriptions: {
    setUp({dispatch, history}) {
      history.listen(({pathname}) => {
        if (pathname.indexOf('/web/') !== -1) {
          const id = pathToRegexp('/web/:id').exec(pathname)[1];
          dispatch({type: 'init', payload:{articleID: id}});
        }
      })
    }
  },
  effects: {

    *init({payload}, {call, put, select}) {
      let { typeList } = yield select(_ => _.web);

      let article = {
        id: '',
        title: '',
        content: '',
        date: '',
        type: '',
        typeName: '',
      }

      if(typeList.length <= 0) {
        const {data} = article = yield call(querytypeList);
        typeList = data;
      }

      if(payload.articleID !== 'newA') { //edit文章
        article = yield call(queryArticle, {id:payload.articleID});
        const typeName = typeList.filter((it) => {
          if(it.id === article.data.typeID) {
            return it;
          } else {
            return '';
          }
        })
        article.data.typeName = typeName[0].name;
        yield put({type: 'activeArticle', payload:{article:article.data, optype:'edit', typeList: typeList}})
      } else {  //new 文章
        yield put({type: 'activeArticle', payload:{article:article, optype:'new', typeList: typeList}})
      }
    },

    * send({payload:{article}}, {call, put, select}) {
      let {data} = yield call(newArticle, article);
      if(data === 'ok'){
        message.success('编辑成功');
      } else {
        message.error('网络错误，请稍后再试');
      }
    },

  },
  reducers: {
    activeArticle(state, {payload: {article, optype, typeList}}) {
      return {...state, article: article, optype: optype, typeList: typeList}
    },
    articleChange(state, {payload: {article}}) {
      return {...state, article: article}
    },
  }
}
