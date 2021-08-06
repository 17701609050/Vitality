/* eslint-disable */
const routers = [
  {
    path: '/login',
    meta: {
      title: "登录",
      noAuth: true
    },
    component: (resolve) => require(['../views/login.vue'], resolve),
  },
  {
    path: '/',
    component(resolve) {
      require(['../views/layout.vue'], resolve)
    },
    children: [
      {
        path: '/',
        name: 'index',
        meta: {module: '/', title: '首页'},
        component(resolve) {
          require(['../views/index.vue'], resolve)
        }
      },
      {
        path: 'movie',
        name: 'movie',
        meta: {module: "/movie", group: "movie", title: '电影 - 列表'},
        component: (resolve) => require(['../views/movie/movie.vue'], resolve),
      },
      {
        path: 'movie/create',
        name: 'movie/create',
        meta: {module: "/movie/create", group: "movie", title: '添加电影'},
        component: (resolve) => require(['../views/movie/CreateMovie.vue'], resolve),
      },
      {
        path: 'movie/update/:id',
        name: 'movie/update',
        meta: {edit: true, module: "/movie", group: "movie", title: '更新电影'},
        component: (resolve) => require(['../views/movie/UpdateMovie.vue'], resolve),
      },
      {
        path: 'users',
        name: 'users',
        meta: {module: "/users", group: "user", title: '用户 - 列表'},
        component: (resolve) => require(['../views/user/user.vue'], resolve),
      },
    ]
  }
  
]

export default routers