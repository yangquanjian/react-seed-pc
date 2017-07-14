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
export default class BarCharts extends PureComponent {

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
            <Card title="世界人口总量">
              <Chart.BarWorldPeople />
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

