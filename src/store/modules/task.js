/*
 * @Description:任务相关
 * @Author: leitao
 * @Date: 2021-12-06 15:06:54
 * @Last Modified by: leitao
 * @Last Modified time: 2021-12-20 10:14:01
 */

import { selectTaskInfoList, stopTask, deleteTask } from "@api/task";
import local from "@utils/local";
import { updataList } from "@utils/storeMethod";

const state = {
  // 用于存放分页列表数据
  data: {
    list: [],
    pagination: {
      total: 0,
      limit: 10,
      page: 1,
    },
  },
  // 列表的加载状态
  listLoading: false,
  // 按钮状态
  LoadingStatus: false,
};

const getters = {
  data: (state) => state.data,

  data1(state) {
    return state.data;
  },
};

const mutations = {
  // 列表加载状态
  CHANGE_LOADING: (state, flag) => {
    state.listLoading = flag;
  },
  SET_LIST: (state, data) => {
    const newData = {
      list: data.data || [],
      pagination: {
        total: data.count || 0,
        limit: data.pageSize || 10,
        page: data.page || 1,
      },
    };
    state.data = newData;
  },
  // 修改数据，整列数据
  UPDATE_LIST: (state, data) => {
    const {
      data: { list },
    } = state;
    const { key, bodyData } = data;
    const newList = updataList(list, bodyData, key);
    state.data.list = newList;
  },
  // 修改状态
  UPDATE_STATUS: (state, flag) => {
    state.LoadingStatus = flag;
  },
};

const actions = {
  // 任务列表查询(分页列表)
  async selectTaskInfoList({ commit }, data) {
    commit("CHANGE_LOADING", true);
    const response = await selectTaskInfoList(data);
    commit("CHANGE_LOADING", false);
    if (response) {
      commit("SET_LIST", response.body || {});
      return response;
    }
  },

  // 任务中止
  async stopTask({ commit }, data) {
    commit("UPDATE_STATUS", true);
    const response = await stopTask(data);
    commit("UPDATE_STATUS", false);
    return response;
  },
  // 任务删除
  async deleteTask({ commit }, data) {
    commit("UPDATE_STATUS", true);
    const response = await deleteTask(data);
    commit("UPDATE_STATUS", false);
    return response;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
