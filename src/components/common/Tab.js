/**
 * Created by K0240001 on 2017/7/5.
 */
import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import { Tabs, Spin } from 'antd';

import menuConfig from '../../config/menu';

const TabPane = Tabs.TabPane;

function preProcess(config, parentPath = '/', result = {}) {
  for (let i = 0, len = config.length; i < len; i++) {
    const item = config[i];
    const path = parentPath + item.key;
    result[path] = { ...item, path }; // eslint-disable-line
    if (item.child) {
      preProcess(item.child, `${path}/`, result);
    }
  }
  return result;
}

const TAB_CONFIG = preProcess(menuConfig);

// 包装当前路由内容到Loading组件内
function WrapperedChildren({ children, loading }) {
  return (
    <Spin tip="正在加载" spinning={loading}>
      { children }
    </Spin>
  );
}

WrapperedChildren.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default class Tab extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    const { location: { pathname } } = props;
    const config = this.getConfig(pathname);
    const panes = this.getPanesWithPathname(pathname);
    this.state = {
      panes,
      activeKey: config.key,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { location: { pathname } } = nextProps;
    if (pathname !== this.props.location.pathname) {
      const config = this.getConfig(pathname);
      const panes = this.getPanesWithPathname(pathname);
      this.setState({
        panes,
        activeKey: config.key,
      });
    }
  }

  @autobind
  onChange(activeKey) {
    const { push } = this.props;
    const { panes } = this.state;
    const pane = panes.find(item => item.key === activeKey);
    push({ pathname: pane.path });
  }


  @autobind
  onEdit(targetKey, action) {
    this[action](targetKey);
  }

  getConfig(pathname) {
    let path = pathname;
    while (path) {
      const config = TAB_CONFIG[path];
      if (config) {
        return config;
      }
      path = path.slice(0, path.lastIndexOf('/'));
    }
    return TAB_CONFIG[pathname] || {};
  }

  getPanesWithPathname(pathname) {
    const { panes = [] } = this.state || {};
    const config = this.getConfig(pathname);
    if (!_.isEmpty(config)) {
      const isExists = panes.find(item => item.key === config.key);
      if (panes.length === 0) {
        panes.push({ ...config, closable: false });
      } else if (!isExists) {
        panes.push(config);
      }
    }
    return panes;
  }

  @autobind
  remove(targetKey) {
    const { push } = this.props;
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    const lastIndex = panes.length - 1;
    const pane = panes[lastIndex];
    const activityKey = pane.key;
    this.setState(
      { panes, activityKey },
      () => {
        push({ pathname: pane.path });
      },
    );
  }

  @autobind
  renderTabPane(pane) {
    const { name, key, closable } = pane;
    const { activeKey } = this.state;
    return (
      <TabPane
        tab={name}
        key={key}
        closable={closable}
      >
        {key === activeKey
          ? WrapperedChildren(this.props)
          : null
        }
      </TabPane>
    );
  }

  render() {
    const { activeKey, panes } = this.state;
    return (
      <Tabs
        hideAdd
        onChange={this.onChange}
        activeKey={activeKey}
        onEdit={this.onEdit}
        type="editable-card"
      >
        {_.isEmpty(panes) ? WrapperedChildren(this.props) : panes.map(this.renderTabPane)}
      </Tabs>
    );
  }
}

