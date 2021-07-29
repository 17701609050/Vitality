<template>
  <section>
    <Button type="primary" @click="toPathLink('/article/create')" icon="md-add" style="margin-bottom: 16px;">新增电影
    </Button>
    <section v-if="list.length > 0">
      <Table :loading="loading" border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row.id)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>

      <section class="page">
        <Page :total="page.total"
              :page-size="page.per_page"
              :current="page.current_page"
              show-total
              @on-change="handlePage"></Page>
      </section>

    </section>
  </section>
</template>
<script>
/* eslint-disable */
  import merge from 'webpack-merge'
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "list",
    data() {
      return {
        loading: true,
        list: [],
        page: {},
        currentPage: 1,
        columns: [
          // {
          //   title: 'ID',
          //   key: '_id',
          //   width: 80,
          //   align: "center"
          // },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          },
          {
            title: '剧照',
            width: 120,
            align: 'center',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.imgs[0],
                  href: params.row.imgs[0]
                },
                style: {
                  width: '100px',
                  // height: '100px',
                  // padding: '10px',
                  // 'border-radius': '10px'
                }
              });
            }
          },
          {
            title: '电影全名',
            key: 'chinese_movie_name',
            width: 250,
          },
          {
            title: '片名',
            width: 120,
            align: 'center',
            key: 'moviename',
            // render: (h, params) => {
            //   return h('div', [
            //     h('span', params.row.category.name)
            //   ]);
            // }
          },
          {
            title: '豆瓣评分',
            width: 100,
            align: 'center',
            key: 'doubanscore'
          },
          {
            title: 'IMDB评分',
            width: 100,
            align: 'center',
            key: 'imdbscore'
          },
          {
            title: '译名',
            width: 100,
            align: 'center',
            key: 'translation_name'
          },
          {
            title: '国家',
            width: 100,
            align: 'center',
            key: 'country'
          },
          {
            title: '上映时间/年份',
            width: 100,
            align: 'center',
            key: 'dateyear'
          },
          {
            title: '类型',
            width: 100,
            align: 'center',
            key: 'style'
          },
          {
            title: '导演',
            width: 100,
            align: 'center',
            key: 'director'
          },
          {
            title: '演员表',
            width: 250,
            align: 'center',
            key: 'actor'
          },
          {
            title: '语言',
            width: 100,
            align: 'center',
            key: 'language'
          },
          {
            title: '时长',
            width: 100,
            align: 'center',
            key: 'movie_length'
          },
          {
            title: '下载链接',
            width: 100,
            align: 'center',
            // key: 'Download',
            render: (h, params) => {
              return h('a',{
                attrs:{
                  href: params.row.downloadlink
                },
              },'Download')
            
            },
          },
          {
            title: '电影详情',
            width: 500,
            align: 'center',
            key: 'aboutmovie'
          },
          
        ]
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      ...mapActions({
        getArticleList: 'movie/getMovieList',
        destroyArticle: 'article/destroyArticle'
      }),
      // 获取文章
      async fetchData() {
        // let {page, desc, category_id, keyword} = this.$route.query;
        const res = await this.getArticleList({
          page: this.currentPage
        });
        console.log(res)
        this.list = res.data.data;
        this.page.total = res.data.total;
        this.loading = false;
      },
      // 切换分页
      handlePage(page) {
        this.$router.replace({
          query: merge(this.$route.query, {
            page
          })
        });
        this.currentPage = page;
        this.fetchData();
      },
      // 更新
      update(id) {
        this.$router.push(`/article/update/${id}`);
      },
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      },
      // 删除文章
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此文章吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroyArticle(id);
              this.$Message.success('删除成功');

              this.fetchData();

            } catch (e) {
              console.log(e)
              this.$Message.error(e);

            } finally {
              this.$Modal.remove();
            }

          },
          onCancel: () => {
            this.$Message.warning('取消！');
          }
        });
      }
    }
  }
</script>

<style scoped>
  .page {
    padding: 32px 0;
    text-align: center;
  }
</style>
