import { routerRedux } from 'dva/router'
import { getUser } from '../services/app';
import { meuns } from '../utils/menu';

export default {
  namespace: 'app',
  state: {
    user: '',
    menu: [],
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        if(location.pathname!=='/login'){
          dispatch({ type: 'query' });
        }
      })
    },
  },
  effects: {
    * query( {payload}, {call, put, select} ) {
      const {data}  = yield call(getUser);
      const {user} = data;
      if(user === undefined) {
        yield put(routerRedux.push({
          pathname: '/login',
        }))
      } else {
        let utype = user.permissions==='admin'?3:user.permissions==='dev'?2:1;
        const m = meuns.filter((it) => {if(utype>=it.type){return it}else {return false}});
        yield put({type: 'userInfo', payload: {data, m}});
      }
    },
  },
  reducers: {
    userInfo(state, {payload}) {
      return {
        ...state,
        user: payload.data,
        menu: payload.m,
      }
    }
  },
}
