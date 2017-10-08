/**
 * @file routes/chart/BarCharts.js
 *  柱状图页面
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';

import Chart from '../../components/chart';
import './chart.less';

const colProps = {
  lg: 12,
  md: 24,
};

const mapStateToProps = state => ({
  data: state.barChart.data,
});

@connect(mapStateToProps)
@withRouter
export default class BarCharts extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    getData: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
  }

  render() {
    const { data } = this.props;
    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col {...colProps}>
            <Card title="世界人口总量">
              <Chart.BarWorldPeople data={data} />
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="柱状图动画延迟">
              <Chart.BarFlash />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

