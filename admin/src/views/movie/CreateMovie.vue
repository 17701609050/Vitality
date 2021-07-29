<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="电影全名" prop="chinese_movie_name">
        <Input v-model="formValidate.chinese_movie_name" placeholder="" />
    </FormItem>
    <FormItem label="电影封面" prop="cover">
    <div class="cover">
      <div class="upload">
        <Upload
          multiple
          type="drag"
          action="http://up-z2.qiniu.com"
          :show-upload-list="false"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :data="{token}">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或者拖拽上传</p>
          </div>
        </Upload>
      </div>
      <div class="article-cover" v-if="formValidate.cover">
        <img :src="formValidate.cover" alt="cover">
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
        <Select v-model="formValidate.city" placeholder="">
            <Option value="1">0</Option>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
        </Select>
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
    export default {
        data () {
            return {
                formValidate: {
                    chinese_movie_name: '',
                    moviename: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    chinese_movie_name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    moviename: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' },
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
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
  .article-cover {
    width: 120px;
  }

  .article-cover img {
    width: 100%;
  }

  .cover {
    display: flex;
  }

  .cover .upload {
    width: 280px;
    margin-right: 32px;
  }
</style>
