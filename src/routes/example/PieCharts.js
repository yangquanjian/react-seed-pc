import React, { PropTypes, PureComponent } from 'react';
import { withRouter } from 'dva/router';
import { Row, Col, Card } from 'antd';
import { connect } from 'dva';
import './home.less';
import Chart from '../../components/chart/index';

const colProps = {
  lg: 12,
  md: 24,
};
const mapStateToProps = state => ({
  PieInnerData: state.example.PieInnerData,
  PieOutData: state.example.PieOutData,
  PieData: state.example.PieData,
});
const mapDispatchToProps = {
  getNestPieData: query => ({
    type: 'example/getNestPieData',
    payload: query || {},
  }),
  getPieData: query => ({
    type: 'example/getPieData',
    payload: query || {},
  }),
};
@connect(mapStateToProps, mapDispatchToProps)
@withRouter
export default class PineCharts extends PureComponent {

  static propTypes = {
    location: PropTypes.object.isRequired,
    getNestPieData: PropTypes.func.isRequired,
    getPieData: PropTypes.func.isRequired,
    PieInnerData: PropTypes.array.isRequired,
    PieOutData: PropTypes.array.isRequired,
    PieData: PropTypes.array.isRequired,
  }

  static defaultProps = {
    PieInnerData: [],
    PieOutData: [],
    PieData: [],
  }
  componentWillMount() {
    this.props.getNestPieData();
    this.props.getPieData();
  }
  render() {
    const { PieInnerData, PieOutData, PieData } = this.props;
    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col {...colProps}>
            <Card title="某站点用户访问来源">
              <Chart.Pie PieData={PieData} />
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="嵌套环形图">
              <Chart.NestPie PieInnerData={PieInnerData} PieOutData={PieOutData} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

