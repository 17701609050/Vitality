/* eslint-disable */
import fetch from './fetch';

export default {
  // 获取列表
  list(params) {
    return fetch.get('/movies', params)
  },
  // 获取详情
  detail(params) {
    const {id} = params;
    delete params.id;

    return fetch.get('/movie/' + id, params);
  },

  // 更新
  update(params) {
    const {id} = params;
    delete params.id;
    return fetch.put('/movie/' + id, params)
  },

  // 删除文章
  destroy(id) {
    return fetch.delete('/movie/' + id)
  },

  // 创建电影
  create(params) {
    return fetch.post('/movie', params);
  }
}
