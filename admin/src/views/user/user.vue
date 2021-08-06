<template>
  <section>
    <Button type="primary" @click="toPathLink('/user/create')" icon="md-add" style="margin-bottom: 16px;">新增用户
    </Button>
    <section v-if="list.length > 0">
      <Table :loading="loading" border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row._id)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row._id)">删除</Button>
        </template>
      </Table>

      <section class="page">
        <Page :total="page.total"
              :page-size="12"
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
            // width: 150,
            align: 'center'
          },
          {
            title: '用户名',
            // width: 120,
            align: 'center',
            key: 'name'
          },
          {
            title: '邮箱',
            // width: 100,
            align: 'center',
            key: 'email'
          },
          {
            title: '最后一次登录',
            // width: 100,
            align: 'center',
            key: 'last_login'
          },
          {
            title: '是否是管理员',
            // width: 100,
            align: 'center',
            key: 'is_super_user'
          },
        ]
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      ...mapActions({
        getUserList: 'user/getUserList',
        destroyUser: 'user/destroyMovie'
      }),
      // 获取文章
      async fetchData() {
        // let {page, desc, category_id, keyword} = this.$route.query;
        const res = await this.getUserList({
          page: this.currentPage
        });
        console.log(res)
        this.list = res.data.data;
        this.page.total = res.data.total;
        this.loading = false;
      },
      // 切换分页
      handlePage(page) {
        // 替换路由里的查询参数
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
        this.$router.push(`/movie/update/${id}`);
      },
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      },
      // 删除文章
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroyMovie(id);
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
