/* eslint-disable */
const routers = [
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
        meta: {module: "/movie", group: "set", title: '电影 - 列表'},
        component: (resolve) => require(['../views/movie.vue'], resolve),
      }
    ]
  }
  
]

export default routers