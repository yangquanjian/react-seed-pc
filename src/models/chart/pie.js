/**
 * @file models/chart/pie.js
 * @author maoquan(maoquan@htsc.com)
 */

import pathToRegexp from 'path-to-regexp';

import api from '../../api';

export default {
  namespace: 'pieChart',
  state: {
    data: [],
    innerData: [],
    outerData: [],

  },
  reducers: {
    getDataSuccess(state, action) {
      const { payload: { response: { pieData } } } = action;
      return {
        ...state,
        data: pieData,
      };
    },
    getNestDataSuccess(state, action) {
      const { payload: { response: { pieInnerData, pieOutData } } } = action;
      return {
        ...state,
        innerData: pieInnerData,
        outerData: pieOutData,
      };
    },
  },
  effects: {
    * getData(payload:{ }, { call, put }) {
      const response = yield call(api.getPieData);
      yield put({
        type: 'getDataSuccess',
        payload: { response },
      });
    },

    * getNestData(payload:{ }, { call, put }) {
      const response = yield call(api.getNestPieData);
      yield put({
        type: 'getNestDataSuccess',
        payload: { response },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/chart/pie').exec(pathname);
        if (match) {
          dispatch({ type: 'getData' });
          dispatch({ type: 'getNestData' });
        }
      });
    },
  },
};
