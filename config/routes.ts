export default [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/welcome', name: '初始页面', icon: 'smile', component: './Welcome' },
  { path: '/add-chart', name: '添加图表', icon: 'BarChart', component: './AddChart' },
  {
    path: '/add-chart-async',
    name: '添加图表(异步)',
    icon: 'BarChart',
    component: './AddChartAsync',
  },

  { path: '/history', icon: 'History', name: '历史记录', component: './History' },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理员页面',
    routes: [
      { path: '/admin/sub-page1', name: '子页面1', component: './Admin' },
      { path: '/admin/sub-page', icon: 'BarChart', name: '管理员页面', component: './Admin' },
    ],
  },
  { path: '/', redirect: '/add-chart' },
  { path: '*', layout: false, component: './404' },
];
