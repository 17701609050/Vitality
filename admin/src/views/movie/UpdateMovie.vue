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
            id: this.$route.params.id,
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
                imdbscore: ''
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
    created() {
      this._getMovie();
    },
    methods: {
      ...mapActions({
        getMovie: 'movie/getMovie',
        updateMovie: 'movie/updateMovie',
      }),
      // 创建
      async _getMovie() {
        try {
          const res = await this.getMovie({id: this.id});
          const obj = res.data;

          this.formValidate.chinese_movie_name = obj.chinese_movie_name;
          this.formValidate.moviename = obj.moviename;
          this.formValidate.imgs = obj.imgs[0];
          this.formValidate.translation_name = obj.translation_name;
          this.formValidate.doubanscore = obj.doubanscore;
          this.formValidate.dateyear = obj.dateyear;
          this.formValidate.director = obj.director;
          this.formValidate.actor = obj.actor;
          this.formValidate.country = obj.country;
          this.formValidate.style = obj.style;
          this.formValidate.language = obj.language;
          this.formValidate.aboutmovie = obj.aboutmovie;

        } catch (e) {
            console.log('获取电影详情失败')
        }
      },
      // 更新
      async _updateMovie() {
        this.formValidate.id = this.id;
        const movie = await this.updateMovie(this.formValidate);
        console.log(movie);
        console.log(movie.data.status)

        if(movie.data.status==400){
            this.$Message.error('更新失败!');
        }else{
            this.$Message.success('更新成功!');
            this.$router.push('/movie');
        }
      },
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                this._updateMovie();;
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
