/* eslint-disable */
import fetch from './fetch';

export default {
  // 登录
  login(params) {
    return fetch.post('/user/login', params)
  },

  // 登陆成功后每一个请求验证管理员token
  auth(params) {
    return fetch.get('/user/auth', params)
  }
}
