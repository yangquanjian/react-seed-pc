/**
 * Created by K0240001 on 2017/7/14.
 * 嵌套饼图
 */
import React, { PropTypes } from 'react';
import 'echarts/lib/chart/pie';
import ChartBase from '../ChartBase';
import Charts from '../Chart';

export default class NestPie extends ChartBase {
  static defaultProps ={
    type: 'Pie',
    hasChart: true,

  }

  static propTypes = {
    PieInnerData: PropTypes.array.isRequired,
    PieOutData: PropTypes.array.isRequired,
  }
  render() {
    const { PieInnerData } = this.props;
    const { PieOutData } = this.props;
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他'],
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],

          label: {
            normal: {
              position: 'inner',
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [...PieInnerData],
        },
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '55%'],

          data: [...PieOutData],
        },
      ],
    };
    return (
      <Charts options={option} />
    );
  }
}
