/**
 * @file models/chart/bar.js
 * @author maoquan(maoquan@htsc.com)
 */

import pathToRegexp from 'path-to-regexp';

import api from '../../api';

export default {
  namespace: 'barChart',
  state: {
    data: [],
  },
  reducers: {
    getDataSuccess(state, action) {
      const { payload: { response: { data } } } = action;
      return {
        ...state,
        data,
      };
    },
  },
  effects: {
    * getData(payload: {}, { call, put }) {
      const response = yield call(api.getBarWorldPeopleData);
      yield put({
        type: 'getDataSuccess',
        payload: { response },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/chart/bar').exec(pathname);
        if (match) {
          dispatch({
            type: 'getData',
          });
        }
      });
    },
  },
};
