import React, { PropTypes, PureComponent } from 'react';
import { withRouter } from 'dva/router';
import { Row, Col, Card } from 'antd';
import './home.less';
import Chart from '../../components/chart/index';

const colProps = {
  lg: 12,
  md: 24,
};
@withRouter
export default class PineCharts extends PureComponent {

  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  render() {
    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col {...colProps}>
            <Card title="某站点用户访问来源">
              <Chart.Pie />
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="嵌套环形图">
              <Chart.NestPie />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

