/**
 * * @file config/tabConfig.js
 *  tab菜单栏设置
 * @author zhuyanwen
 */
const tabConfig = {
  example: {
    key: '1',
    value: 'example',
    title: 'Home',
    url: '/example',
  },

  menu1: {
    key: '2',
    value: 'menu1',
    title: '菜单一',
    url: '/menu1',

  },
  menu21: {
    key: '3',
    value: 'menu21',
    title: '子菜单一',
    url: '/menu2/menu21',
  },
  menu22: {
    key: '4',
    value: 'menu22',
    title: '子菜单2',
    url: '/menu2/menu22',
  },
  charts1: {
    key: '5',
    value: 'charts1',
    title: '折线图',
    url: '/charts/charts1',
  },
  charts2: {
    key: '6',
    value: 'charts2',
    title: '柱状图',
    url: '/charts/charts2',
  },
  charts3: {
    key: '7',
    value: 'charts3',
    title: '饼图',
    url: '/charts/charts3',
  },


};
export default tabConfig;
