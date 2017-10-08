/**
 * @file example/Detail.js
 *  xx详情
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';

import Info from '../../components/example/Info';

const mapStateToProps = state => ({
  detail: state.example.detail,
});

const mapDispatchToProps = {
  save: query => ({
    type: 'example/save',
    payload: query || {},
  }),
};

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
export default class Profile extends PureComponent {

  static propTypes = {
    detail: PropTypes.object,
    save: PropTypes.func.isRequired,
  }

  static defaultProps = {
    detail: {},
  }

  render() {
    const { detail, save } = this.props;
    return (
      <div className="page-example-detail">
        <Info
          data={detail}
          save={save}
        />
      </div>
    );
  }
}

