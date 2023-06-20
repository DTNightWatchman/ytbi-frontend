export default [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/welcome', name: "初始页面",icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: "管理员页面",
    routes: [
      { path: '/admin', name: "子页面1", redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: "管理员页面", component: './Admin' },
    ],
  },
  { icon: 'table', name: "列表页", path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
