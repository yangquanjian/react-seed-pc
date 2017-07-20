/**
 * Created by K0240001 on 2017/7/5.
 */
import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import { Tabs } from 'antd';

import TAB_CONFIG from '../../config/tabConfig';

const TabPane = Tabs.TabPane;

export default class Tab extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
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
    const activePane = panes.find(item => item.key === activeKey);
    const value = activePane.value;
    const url = TAB_CONFIG[value].url;
    push({ pathname: url });
  }


  @autobind
  onEdit(targetKey, action) {
    this[action](targetKey);
  }

  getConfig(pathname) {
    const panthnameArray = pathname.split('/');
    const currentKey = panthnameArray.pop();
    return TAB_CONFIG[currentKey] || {};
  }

  getPanesWithPathname(pathname) {
    const { panes = [] } = this.state || {};
    const config = this.getConfig(pathname);
    if (!_.isEmpty(config)) {
      const isExists = panes.find(item => item.value === config.value);
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
    const value = panes[lastIndex].value;
    const url = TAB_CONFIG[value].url;
    const activityKey = panes[lastIndex].key;
    this.setState(
      { panes, activityKey },
      () => {
        push({ pathname: url });
      },
    );
  }

  @autobind
  renderTabPane(pane) {
    const { title, key, closable } = pane;
    const { children } = this.props;
    const { activeKey, panes } = this.state;
    return _.isEmpty(panes) ? children : (
      <TabPane
        tab={title}
        key={key}
        closable={closable}
      >
        {key === activeKey ? children : null}
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
        {panes.map(this.renderTabPane)}
      </Tabs>
    );
  }
}

