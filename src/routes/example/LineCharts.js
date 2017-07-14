import React, { PropTypes, PureComponent } from 'react';
import { Row, Col, Card } from 'antd';
import { withRouter } from 'dva/router';
import './home.less';
import Chart from '../../components/chart/index';

const colProps = {
  lg: 12,
  md: 24,
};
@withRouter
export default class lineCharts extends PureComponent {

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
            <Card title="折线图堆叠">
              <Chart.LinePileup />
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="多X轴实例">
              <Chart.MultipleXLine />
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="Step Line">
              <Chart.StepLine />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

