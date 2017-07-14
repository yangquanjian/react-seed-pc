/**
 * @file components/chart/Line.js
 *  折线图
 * @author maoquan(maoquan@htsc.com)
 */
import React from 'react';
import 'echarts/lib/chart/line';
import ChartBase from '../ChartBase';
import Charts from '../Chart';

export default class StepLine extends ChartBase {
  static defaultProps = {
    type: 'line',
    hasChart: true,
  }
  render() {
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Step Start', 'Step Middle', 'Step End'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Step Start',
          type: 'line',
          step: 'start',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Step Middle',
          type: 'line',
          step: 'middle',
          data: [220, 282, 201, 234, 290, 430, 410],
        },
        {
          name: 'Step End',
          type: 'line',
          step: 'end',
          data: [450, 432, 401, 454, 590, 530, 510],
        },
      ],
    };

    return (
      <Charts options={option} />
    );
  }
}
