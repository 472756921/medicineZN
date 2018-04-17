import { api } from '../../../utils/config';
import request from '../../../utils/request';

const JSONS = {'Content-type': 'application/json;charset=UTF-8'};

export function login (data) {
  return request(api.login, {method: 'post', body: JSON.stringify(data), headers: JSONS});
}
