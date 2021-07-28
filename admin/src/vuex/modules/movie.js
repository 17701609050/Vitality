/* eslint-disable */
import movie from '../../api/movie'

const state = {}
const mutations = {}
const actions = {
  // 获取电影列表
  async getMovieList({state, commit}, params) {
    return movie.list(params);
  },

  // 获取文章详情
  async getArticle({state, commit}, params) {
    return movie.detail(params);
  },

  // 创建文章
  async createArticle({state, commit}, params) {
    return movie.create(params);
  },

  // 更新文章
  async updateArticle({state, commit}, params) {
    return movie.update(params);
  },

  // 删除文章
  async destroyArticle({state, commit}, id) {
    return movie.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
