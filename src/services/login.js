import request from '../utils/request';

export function login(value) {
  return request('/api/user/login', {method: 'POST', body: JSON.stringify(value), headers:{'content-type': 'application/json;charset=UTF-8'}});
}
