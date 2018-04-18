import { api } from '../utils/config';
import request from '../utils/request';

export function getUser (data) {
  return request(api.getUser, {method: 'get'});
}
