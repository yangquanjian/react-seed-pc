/**
 * @file config/menu.js
 *  侧边栏菜单配置
 * @author maoquan(maoquan@htsc.com)
 */

import _ from 'lodash';

const menus = [
  {
    key: 'example',
    name: 'Home',
    icon: 'laptop',
    default: true,
  },
  {
    key: 'chart',
    name: '图表',
    icon: 'book',
    clickable: false,
    child: [
      {
        key: 'line',
        name: '折线图',
        icon: 'line-chart',
      },
      {
        key: 'bar',
        name: '柱状图',
        icon: 'bar-chart',
      },
      {
        key: 'pie',
        name: '饼图',
        icon: 'pie-chart',
      },
    ],
  },
  {
    key: 'menu1',
    name: '测试菜单',
    icon: 'user',
  },
];

export default menus;

export const getDefaultMenu = () => _.find(menus, item => !!item.default);
