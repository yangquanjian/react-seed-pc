/**
 * @file routes/chart/LineCharts.js
 *  折线图页面
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';
import { connect } from 'dva';
import { withRouter } from 'dva/router';

import Chart from '../../components/chart';
import './chart.less';

const colProps = {
  lg: 12,
  md: 24,
};

const mapStateToProps = state => ({
  lineData: state.lineChart.lineData,
  multiData: state.lineChart.multiData,
  stepData: state.lineChart.stepData,
});

@connect(mapStateToProps)
@withRouter
export default class lineCharts extends PureComponent {

  static propTypes = {
    location: PropTypes.object.isRequired,
    lineData: PropTypes.array.isRequired,
    multiData: PropTypes.array.isRequired,
    stepData: PropTypes.array.isRequired,
  }

  render() {
    const { lineData, multiData, stepData } = this.props;
    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col {...colProps}>
            <Card title="折线图堆叠">
              <Chart.LinePileup data={lineData} />
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="多X轴实例">
              <Chart.MultipleXLine data={multiData} />
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="Step Line">
              <Chart.StepLine data={stepData} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

