export default [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/welcome', name: '初始页面', icon: 'smile', component: './Welcome' },
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
      { path: '/admin/history', icon: 'History', name: '全部历史记录', component: './AllUserHistory' },
      { path: '/admin/add-chart', access: 'canAdmin', name: '添加图表', icon: 'BarChart', component: './AddChart' },
    ],
  },
  { path: '/', redirect: '/add-chart' },
  { path: '*', layout: false, component: './404' },
];
