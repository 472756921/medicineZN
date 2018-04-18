import { api } from '../../../utils/config';
import request from '../../../utils/request';
import {getParmas} from '../../../utils';

const JSONS = {'Content-type': 'application/json;charset=UTF-8'};

export function query (data) {
  let url = getParmas( api.articleList, data);
  return request(url, {method: 'get', headers: JSONS});
}

export function querytypeList (data) {
  let url = getParmas( api.articleTyles, data);
  return request(url, {method: 'get', headers: JSONS});
}
