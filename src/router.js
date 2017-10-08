/**
 * @file routes.js
 * @author maoquan(maoquan@htsc.com)
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Redirect,
  routerRedux,
} from 'dva/router';
import dynamic from 'dva/dynamic';
import _ from 'lodash';

import App from './layouts/Main';

import { NotFound } from './routes/error';
import Example from './routes/example/Home';
import ExampleDetail from './routes/example/Detail';
import Page from './routes/example/Page';
import menuConfig from './config/menu';

const { ConnectedRouter } = routerRedux;

// 默认index,从菜单配置中取
const indexMenu = _.find(menuConfig, item => !!item.default);

export default function Routers({ history, app }) {
  // 静态组件，打包时直接打在项目里
  const routes = [
    {
      path: '/example',
      component: Example,
    },
    {
      path: '/example/detail/:id',
      component: ExampleDetail,
    },
    {
      path: '/menu:id',
      component: Page,
    },
  ];
  // 动态组件，打包时不随项目打包，页面运行时按需动态加载
  const dynamicRoutes = [
    {
      path: '/chart/line',
      models: () => [import('./models/chart/line')],
      component: () => import('./routes/chart/Line'),
    },
    {
      path: '/chart/bar',
      models: () => [import('./models/chart/bar')],
      component: () => import('./routes/chart/Bar'),
    },
    {
      path: '/chart/pie',
      models: () => [import('./models/chart/pie')],
      component: () => import('./routes/chart/Pie'),
    },
  ];

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to={indexMenu.key} />)} />
          {
            routes.map(({ path, component }) => (
              <Route
                key={path}
                exact
                path={path}
                component={component}
              />
            ))
          }
          {
            dynamicRoutes.map(({ path, ...dynamics }) => (
              <Route
                key={path}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route path="*" component={NotFound} />
        </Switch>
      </App>
    </ConnectedRouter>
  );
}

Routers.propTypes = {
  history: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};
