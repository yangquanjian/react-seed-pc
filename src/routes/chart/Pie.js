/**
 * @file routes/chart/PieCharts.js
 *  饼图页面
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'dva/router';
import { Row, Col, Card } from 'antd';
import { connect } from 'dva';

import Chart from '../../components/chart';
import './chart.less';

const colProps = {
  lg: 12,
  md: 24,
};

const mapStateToProps = state => ({
  innerData: state.pieChart.innerData,
  outerData: state.pieChart.outerData,
  data: state.pieChart.data,
});

@connect(mapStateToProps)
@withRouter
export default class PineCharts extends PureComponent {

  static propTypes = {
    location: PropTypes.object.isRequired,
    innerData: PropTypes.array.isRequired,
    outerData: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
  }

  render() {
    const { innerData, outerData, data } = this.props;
    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col {...colProps}>
            <Card title="某站点用户访问来源">
              <Chart.Pie data={data} />
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="嵌套环形图">
              <Chart.NestPie innerData={innerData} outerData={outerData} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

