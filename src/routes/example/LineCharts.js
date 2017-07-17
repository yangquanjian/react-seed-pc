import React, { PropTypes, PureComponent } from 'react';
import { Row, Col, Card } from 'antd';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import './home.less';
import Chart from '../../components/chart/index';

const colProps = {
  lg: 12,
  md: 24,
};
const mapStateToProps = state => ({
  LinePileupData: state.example.LinePileupData,
  MultipleData: state.example.MultipleData,
  StepLineData: state.example.StepLineData,
});
const mapDispatchToProps = {
  getLinePileupData: query => ({
    type: 'example/getLinePileupData',
    payload: query || {},
  }),
  getMultipleXLineData: query => ({
    type: 'example/getMultipleXLineData',
    payload: query || {},
  }),
  getStepLineData: query => ({
    type: 'example/getStepLineData',
    payload: query || {},
  }),
};
@connect(mapStateToProps, mapDispatchToProps)
@withRouter
export default class lineCharts extends PureComponent {

  static propTypes = {
    location: PropTypes.object.isRequired,
    getLinePileupData: PropTypes.func.isRequired,
    getMultipleXLineData: PropTypes.func.isRequired,
    getStepLineData: PropTypes.func.isRequired,
    LinePileupData: PropTypes.array.isRequired,
    MultipleData: PropTypes.array.isRequired,
    StepLineData: PropTypes.array.isRequired,
  }

  static defaultProps = {
    LinePileupData: [],
    MultipleData: [],
    StepLineData: [],
  }

  componentWillMount() {
    this.props.getLinePileupData();
    this.props.getMultipleXLineData();
    this.props.getStepLineData();
  }

  render() {
    const { LinePileupData, MultipleData, StepLineData } = this.props;
    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col {...colProps}>
            <Card title="折线图堆叠">
              <Chart.LinePileup LinePileupData={LinePileupData} />
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="多X轴实例">
              <Chart.MultipleXLine MultipleData={MultipleData} />
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="Step Line">
              <Chart.StepLine StepLineData={StepLineData} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

