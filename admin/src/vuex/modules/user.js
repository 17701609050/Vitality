/* eslint-disable */
import user from '../../api/user'

const state = {}
const mutations = {}
const actions = {
  // 获取列表
  async getUserList({state, commit}, params) {
    return user.list(params);
  },

  // 获取详情
  async getUser({state, commit}, params) {
    return user.detail(params);
  },

  // 创建
  async creatUser({state, commit}, params) {
    return user.create(params);
  },

  // 更新
  async updateUser({state, commit}, params) {
    return user.update(params);
  },

  // 删除
  async destroyUser({state, commit}, id) {
    return user.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
