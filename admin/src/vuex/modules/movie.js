/* eslint-disable */
import movie from '../../api/movie'

const state = {}
const mutations = {}
const actions = {
  // 获取电影列表
  async getMovieList({state, commit}, params) {
    return movie.list(params);
  },

  // 获取电影详情
  async getMovie({state, commit}, params) {
    return movie.detail(params);
  },

  // 创建电影
  async creatMovie({state, commit}, params) {
    return movie.create(params);
  },

  // 更新文章
  async updateMovie({state, commit}, params) {
    return movie.update(params);
  },

  // 删除文章
  async destroyMovie({state, commit}, id) {
    return movie.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
