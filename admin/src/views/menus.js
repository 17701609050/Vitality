/* eslint-disable */
/**
 * 管理员菜单
 * @type {*[]}
 */


const menus = [
    {
        name: "首页",
        path: "/",
        icon: "ios-navigate"
    },

    {
        name: "电影",
        path: "set",
        icon: "ios-film",
        children: [
            {
                icon: "md-film",
                name: "电影列表",
                path: "/movie"
            },
            {
                name: "电影创建",
                path: "/movie/create",
                icon: "md-add-circle"
              }
        ]
    },

    // {
    //     name: "分类管理",
    //     path: "category",
    //     icon: "md-move",
    //     children: [
    //         {
    //             name: "分类列表",
    //             path: "/category",
    //             icon: "md-list"
    //         },
    //         {
    //             name: "分类创建",
    //             path: "/category/create",
    //             icon: "md-add-circle"
    //         }
    //     ]
    // },

    {
        name: "文章管理",
        path: "article",
        icon: "md-list-box",
        children: [
            {
                name: "文章列表",
                path: "/article",
                icon: "md-list"
            },
            {
                name: "文章创建",
                path: "/article/create",
                icon: "md-add-circle"
            }
        ]
    },

    {
        name: "广告管理",
        path: "advertise",
        icon: "ios-disc",
        children: [
            {
                name: "广告列表",
                path: "/advertise",
                icon: "md-list"
            },
            {
                name: "广告创建",
                path: "/advertise/create",
                icon: "md-add-circle"
            }
        ]
    },

    {
        name: "评论管理",
        path: "comments",
        icon: "md-text",
        children: [
            {
                name: "评论列表",
                path: "/comments",
                icon: "md-list"
            }
        ]
    }
]
export { menus }
