<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="电影全名" prop="chinese_movie_name">
        <Input v-model="formValidate.chinese_movie_name" placeholder="" />
    </FormItem>
    <FormItem label="电影封面链接" prop="imgs">
    <div class="imgs">
      <div>
        <Input v-model="formValidate.imgs" placeholder="" />
      </div>
      <div class="movie-cover" v-if="formValidate.imgs">
        <br>
        <img :src="formValidate.imgs" alt="imgs">
      </div>
    </div>
  </FormItem>
    <FormItem label="正片名" prop="moviename">
        <Input v-model="formValidate.moviename" placeholder="" />
    </FormItem>
    <FormItem label="译名" prop="translation_name">
        <Input v-model="formValidate.translation_name" placeholder="" />
    </FormItem>
    <FormItem label="豆瓣评分" prop="doubanscore">
        <Input v-model="formValidate.doubanscore" placeholder="" />
    </FormItem>
    <FormItem label="IMDB评分" prop="imdbscore">
        <Input v-model="formValidate.imdbscore" placeholder="" />
    </FormItem>
    <FormItem label="上映时间" prop="dateyear">
        <Input v-model="formValidate.dateyear" placeholder="" />
    </FormItem>
    <FormItem label="导演" prop="director">
        <Input v-model="formValidate.director" placeholder="" />
    </FormItem>
    <FormItem label="主演" prop="actor">
        <Input v-model="formValidate.actor" placeholder="" />
    </FormItem>
    <FormItem label="国家" prop="country">
        <Input v-model="formValidate.country" placeholder="" />
    </FormItem>
    <FormItem label="分类" prop="style">
        <Input v-model="formValidate.style" placeholder="" />
    </FormItem>
    <FormItem label="语言" prop="language">
      <Input v-model="formValidate.language" placeholder="" />
    </FormItem>
    <FormItem label="详情描述" prop="aboutmovie">
        <mavon-editor
          v-model="formValidate.aboutmovie"
          :ishljs="true"
          ref=md>
        </mavon-editor>
    </FormItem>
    <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
/* eslint-disable */
import {mapActions} from 'vuex';
export default {
    data () {
        return {
            formValidate: {
                chinese_movie_name: '',
                moviename: '',
                imgs: '',
                translation_name: '',
                doubanscore: '',
                dateyear: '',
                director: '',
                actor: '',
                country: '',
                style: '',
                language: '',
                aboutmovie: '',
                imdbscore: '',
            },
            ruleValidate: {
                chinese_movie_name: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                moviename: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                imgs: [
                    { required: true, message: '电影封面连接不能为空', trigger: 'blur' }
                ],
                
            }
        }
    },
    methods: {
      ...mapActions({
        createMovie: 'movie/creatMovie',
        // getCategoryList: 'category/getCategoryList'
      }),
      // 创建
      async _createMovie() {
        this.formValidate.id = this.id;

        try {
          const movie = await this.createMovie(this.formValidate);
          console.log(movie);
          this.$Message.success('新增成功!');
          this.$router.push('/movies');

        } catch (e) {

        }
      },
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                this._createMovie();
              } else {
                  this.$Message.error('提交失败，填写有误!');
              }
          })
      },
      handleReset (name) {
          this.$refs[name].resetFields();
      }
    }
}
</script>

<style scoped>
  .movie-cover {
    width: 120px;
  }

  .movie-cover img {
    width: 200px;
  }

  .cover {
    display: flex;
  }

</style>
