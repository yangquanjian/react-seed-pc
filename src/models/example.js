/**
 * @file models/example.js
 * @author maoquan(maoquan@htsc.com)
 */

import { routerRedux } from 'dva/router';

import api from '../api';
import { delay } from '../utils/sagaEffects';

// noinspection JSAnnotator
export default {
  namespace: 'example',
  state: {
    list: [],
    detail: {},
    LinePileupData: [],
    MultipleData: [],
    BarWorldPeopleData: [],
    PieInnerData: [],
    PieOutData: [],
    PieData: [],

  },
  reducers: {
    getListSuccess(state, action) {
      const { payload: { response } } = action;
      const list = response.data;
      return {
        ...state,
        list,
      };
    },

    getDetailSuccess(state, action) {
      const { payload: { response } } = action;
      return {
        ...state,
        detail: response.data,
      };
    },
    getLinePileupDataSuccess(state, action) {
      const { payload: { response } } = action;
      const LinePileupData = response.data;
      return {
        ...state,
        LinePileupData,
      };
    },
    getMultipleXLineDataSuccess(state, action) {
      const { payload: { response } } = action;
      const MultipleData = response.data;
      return {
        ...state,
        MultipleData,
      };
    },
    getStepLineDataSuccess(state, action) {
      const { payload: { response } } = action;
      const StepLineData = response.data;
      return {
        ...state,
        StepLineData,
      };
    },
    getBarWorldPeopleSuccess(state, action) {
      const { payload: { response } } = action;
      const BarWorldPeopleData = response.data;
      return {
        ...state,
        BarWorldPeopleData,
      };
    },
    getNestPieDataSuccess(state, action) {
      const { payload: { response } } = action;
      const PieInnerData = response.PieInnerData;
      const PieOutData = response.PieOutData;
      return {
        ...state,
        PieInnerData,
        PieOutData,
      };
    },
    getPieDataSuccess(state, action) {
      const { payload: { response } } = action;
      const PieData = response.PieData;
      return {
        ...state,
        PieData,
      };
    },
  },
  effects: {
    * getList({ payload: { type = '1' } }, { call, put }) {
      const response = yield call(api.getList, { type });
      // 模拟慢速网络
      yield delay(1000);
      yield put({
        type: 'getListSuccess',
        payload: { response, type },
      });
    },
    * getDetail({ payload: { id } }, { call, put }) {
      const response = yield call(api.getDetail, { id });
      yield put({
        type: 'getDetailSuccess',
        payload: { response, id },
      });
    },
    * save({ payload }, { call, put }) {
      const response = yield call(api.saveDetail, payload);
      yield put({
        type: 'saveSuccess',
        payload: { response },
      });
      yield put(routerRedux.goBack());
    },
    * getLinePileupData(payload:{ }, { call, put }) {
      const response = yield call(api.getLinePileupData);
      yield put({
        type: 'getLinePileupDataSuccess',
        payload: { response },
      });
    },
    * getMultipleXLineData(payload:{ }, { call, put }) {
      const response = yield call(api.getMultipleXLineData);
      yield put({
        type: 'getMultipleXLineDataSuccess',
        payload: { response },
      });
    },
    * getStepLineData(payload:{ }, { call, put }) {
      const response = yield call(api.getStepLineData);
      yield put({
        type: 'getStepLineDataSuccess',
        payload: { response },
      });
    },
    * getBarWorldPeople(payload:{ }, { call, put }) {
      const response = yield call(api.getBarWorldPeopleData);
      yield put({
        type: 'getBarWorldPeopleSuccess',
        payload: { response },
      });
    },
    * getNestPieData(payload:{ }, { call, put }) {
      const response = yield call(api.getNestPieData);
      yield put({
        type: 'getNestPieDataSuccess',
        payload: { response },
      });
    },
    * getPieData(payload:{ }, { call, put }) {
      const response = yield call(api.getPieData);
      yield put({
        type: 'getPieDataSuccess',
        payload: { response },
      });
    },

  },
  subscriptions: {},
};
