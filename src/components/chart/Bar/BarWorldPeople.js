import React, { PropTypes } from 'react';
import 'echarts/lib/chart/line';
import ChartBase from '../ChartBase';
import Charts from '../Chart';

export default class BarWorldPeople extends ChartBase {
  static propTypes = {
    BarWorldPeopleData: PropTypes.array.isRequired,

  }
  static defaultProps = {
    type: 'line',
    hasChart: true,
  }
  render() {
    const { BarWorldPeopleData } = this.props;
    const options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['2011年', '2012年'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: 'category',
        data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
      },
      series: [...BarWorldPeopleData],
    };

    return (
      <Charts options={options} />
    );
  }
}
