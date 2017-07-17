import React, { PropTypes, PureComponent } from 'react';
import { withRouter } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import './home.less';
import Chart from '../../components/chart/index';

const colProps = {
  lg: 12,
  md: 24,
};
const mapStateToProps = state => ({
  BarWorldPeopleData: state.example.BarWorldPeopleData,
});
const mapDispatchToProps = {
  getBarWorldPeople: query => ({
    type: 'example/getBarWorldPeople',
    payload: query || {},
  }),
};
@connect(mapStateToProps, mapDispatchToProps)
@withRouter
export default class BarCharts extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    getBarWorldPeople: PropTypes.func.isRequired,
    BarWorldPeopleData: PropTypes.array.isRequired,
  }

  static defaultProps = {
    BarWorldPeople: [],
  }

  componentWillMount() {
    this.props.getBarWorldPeople();
  }

  render() {
    const { BarWorldPeopleData } = this.props;
    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col {...colProps}>
            <Card title="世界人口总量">
              <Chart.BarWorldPeople BarWorldPeopleData={BarWorldPeopleData} />
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

