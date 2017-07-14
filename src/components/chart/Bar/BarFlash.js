import React from 'react';
import 'echarts/lib/chart/line';
import ChartBase from '../ChartBase';
import Charts from '../Chart';

export default class BarFlash extends ChartBase {
  static defaultProps = {
    type: 'line',
    hasChart: true,
  }
  render() {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];
    for (let i = 0; i < 100; i++) {
      xAxisData.push(`类目${i}`);
      data1.push(((Math.sin(i / 5) * ((i / 5) - 10)) + (i / 6)) * 5);
      data2.push(((Math.cos(i / 5) * ((i / 5) - 10)) + (i / 6)) * 5);
    }

    const options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      toolbox: {
              // y: 'bottom',
        feature: {
          magicType: {
            type: ['stack', 'tiled'],
          },
          dataView: {},
          saveAsImage: {
            pixelRatio: 2,
          },
        },
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
      },
      series: [{
        name: 'bar',
        type: 'bar',
        data: data1,
        animationDelay(idx) {
          return idx * 10;
        },
      }, {
        name: 'bar2',
        type: 'bar',
        data: data2,
        animationDelay(idx) {
          return (idx * 10) + 100;
        },
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate(idx) {
        return idx * 5;
      },
    };

    return (
      <Charts options={options} />
    );
  }
}
