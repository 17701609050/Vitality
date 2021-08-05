/* eslint-disable */
import admin from '../../api/admin'

const state = {
  userInfo: null
}

const mutations = {
  SET_USER_INFO(state, data) {
    state.userInfo = data
  }

}

const actions = {
  // 管理员登录
  async login({state, commit}, params) {
    return admin.login(params);
  },

  // 获取当前管理员信息
  async auth({state, commit}, params) {
    const res = await admin.auth(params);
    commit('SET_USER_INFO', res.data);
    return res;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
