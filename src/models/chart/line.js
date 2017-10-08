/**
 * @file models/chart/line.js
 * @author maoquan(maoquan@htsc.com)
 */

import pathToRegexp from 'path-to-regexp';

import api from '../../api';

export default {
  namespace: 'lineChart',
  state: {
    lineData: [],
    multiData: [],
    stepData: [],
  },
  reducers: {
    getLineDataSuccess(state, action) {
      const { payload: { response: { data } } } = action;
      return {
        ...state,
        lineData: data,
      };
    },
    getMultiDataSuccess(state, action) {
      const { payload: { response: { data } } } = action;
      return {
        ...state,
        multiData: data,
      };
    },
    getStepDataSuccess(state, action) {
      const { payload: { response: { data } } } = action;
      return {
        ...state,
        stepData: data,
      };
    },
  },
  effects: {
    * getLineData(payload:{ }, { call, put }) {
      const response = yield call(api.getLinePileupData);
      yield put({
        type: 'getLineDataSuccess',
        payload: { response },
      });
    },
    * getMultiData(payload:{ }, { call, put }) {
      const response = yield call(api.getMultipleXLineData);
      yield put({
        type: 'getMultiDataSuccess',
        payload: { response },
      });
    },
    * getStepData(payload:{ }, { call, put }) {
      const response = yield call(api.getStepLineData);
      yield put({
        type: 'getStepDataSuccess',
        payload: { response },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/chart/line').exec(pathname);
        if (match) {
          dispatch({ type: 'getLineData' });
          dispatch({ type: 'getMultiData' });
          dispatch({ type: 'getStepData' });
        }
      });
    },
  },
};
