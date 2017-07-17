/**
 * @file components/chart/Line.js
 *  折线图
 * @author maoquan(maoquan@htsc.com)
 */
import React, { PropTypes } from 'react';
import 'echarts/lib/chart/line';
import ChartBase from '../ChartBase';
import Charts from '../Chart';

export default class StepLine extends ChartBase {
  static defaultProps = {
    type: 'line',
    hasChart: true,
  }
  static propTypes = {
    StepLineData: PropTypes.array.isRequired,
  }
  render() {
    const { StepLineData } = this.props;
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
      series: [...StepLineData],
    };

    return (
      <Charts options={option} />
    );
  }
}
