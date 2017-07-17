/**
 * @file components/chart/Line.js
 *  折线图
 * @author maoquan(maoquan@htsc.com)
 */
import React, { PropTypes } from 'react';
import 'echarts/lib/chart/line';
import ChartBase from '../ChartBase';
import Charts from '../Chart';

export default class LinePileup extends ChartBase {
  static propTypes = {
    LinePileupData: PropTypes.array.isRequired,
  }
  static defaultProps = {
    type: 'line',
    hasChart: true,
  }
  render() {
    const { LinePileupData } = this.props;
    const lineoption = {
      style: {
        width: '80%',
        height: 200,
      },
      title: {
        show: true,
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
      },
      series: [...LinePileupData],
    };
    return (
      <Charts options={lineoption} />
    );
  }
}
