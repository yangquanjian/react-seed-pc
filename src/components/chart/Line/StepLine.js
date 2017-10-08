/**
 * @file components/chart/StepLine.js
 *  折线图
 * @author maoquan(maoquan@htsc.com)
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Chart from '../../common/IECharts';

export default class StepLine extends PureComponent {

  static propTypes = {
    data: PropTypes.array.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    const { data } = nextProps;
    return !_.isEqual(data, this.props.data);
  }

  render() {
    const { data } = this.props;
    const options = {
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
      series: data,
    };

    if (_.isEmpty(data)) {
      return null;
    }

    return (
      <Chart
        option={options}
        resizable
        style={{
          height: '335px',
        }}
      />
    );
  }
}
