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
        meta: {module: "/movie", group: "movie", title: '电影 - 列表'},
        component: (resolve) => require(['../views/movie/movie.vue'], resolve),
      },
      {
        path: 'movie/create',
        name: 'movie/create',
        meta: {module: "/movie/create", group: "movie", title: '添加电影'},
        component: (resolve) => require(['../views/movie/CreateMovie.vue'], resolve),
      }
    ]
  }
  
]

export default routers