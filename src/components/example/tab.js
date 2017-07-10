/**
 * Created by K0240001 on 2017/7/5.
 */
/**
 * Created by admin on 2017/7/4 0004.
 */
import { Tabs } from 'antd';
import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import tabConfig from '../../config/tabConfig';

const TabPane = Tabs.TabPane;


export default class Tab extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.ifchangeActivity = false;
    this.state = {
      activeKey: '',
      panes: [],
    };
  }
    @autobind
  onChange(activeKey) {
    const { push } = this.props;
    this.state.panes.forEach((v) => {
      if (v.key === activeKey) {
        const value = v.value;
        const url = tabConfig[value].url;
        push({ pathname: url });
      }
    });
  }


    @autobind
  onEdit(targetKey, action) {
    this[action](targetKey);
  }
    @autobind
  remove(targetKey) {
    const { push } = this.props;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    const value = panes[lastIndex].value;
    const url = tabConfig[value].url;
    const activityKey = panes[lastIndex].key;
    push({ pathname: url });
    this.setState({ panes, activityKey });
  }
  renderTabPane(pane) {
    return (
      <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content} </TabPane>
    );
  }
  render() {
    const children = this.props.children;
    const panthnameArray = this.props.location.pathname.split('/');
    const length = panthnameArray.length;
    const currentKey = panthnameArray[length - 1];
    const keys = tabConfig[currentKey].key;
    const title = tabConfig[currentKey].title;
    const value = tabConfig[currentKey].value;
    if (this.state.panes.length === 0) {
      this.state.panes.push({ title, content: children, key: keys, value, closable: false });
    } else if (!this.state.panes.find(v => v.value === value)) {
      this.state.panes.push({ title, content: children, key: keys, value });
    }
    this.state.activeKey = keys;


    return (
      <div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          onEdit={this.onEdit}
          type="editable-card"
        >
          {

              this.state.panes.map(
              pane => this.renderTabPane(pane),
              )
          }
        </Tabs>
      </div>
    );
  }
}

