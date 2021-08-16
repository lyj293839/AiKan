<style scoped>
.heard{background: #E9EDF5;color: #333333;font-size: 16px;line-height: 40px;}
.el-form{width: 300px;margin: 30px auto;}
.el-form-item{margin-bottom: 20px;}
.el-form-item /deep/ .el-form-item__label{line-height: 25px;}
.el-form-item /deep/ .el-input__inner{background-color: #F4F4F4;}
.font{margin-top: 20px;font-size: 14px;color: #FFA3A3;}
</style>
<template>
  <div style="background:white;min-height:600px;">
    <div class="heard">密码管理</div>
    <div>
      <el-form :model="formData" :rules="rules" ref="ruleForm">
        <el-form-item label="原密码" prop="old_password">
            <el-input type="password" v-model="formData.old_password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
            <el-input type="password" v-model="formData.new_password" show-password></el-input>
        </el-form-item>
        <el-form-item label="再次输入您的新密码" prop="checkpassword">
            <el-input type="password" v-model="formData.checkpassword" show-password></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="button-primary" style="width:230px;" :loading="loading_sure" @click="sure('ruleForm')">确认修改</el-button>
      <div class="font">请牢记您的密码，不要告诉他人您的登录密码</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personal_password',
  data () {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formData.new_password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    };
    return {
      formData:{
        old_password:'',
        new_password:'',
        checkpassword:''
      },
      loading_sure:false,
      rules: {
        old_password: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        new_password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        checkpassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    sure(a){
      this.$refs[a].validate((val)=>{
        if(val){
          this.loading_sure = true
          this.$post('home/member/editPassword',this.formData).then(res=>{
            if(res&&res.code==200){
              this.$message.success(res.msg)
              this.loading_sure = false
              this.$refs[a].resetFields();
              this.$store.commit('logout')
              this.$cookies.remove('socket_url')
              setTimeout(() => {
                location.reload() // 强制刷新
              }, 500)
              this.$router.push({
                path: '/login',
                name:'login'
              });
            }else{
              this.$message.error(res.msg)
              this.loading_sure = false
            }
          }).catch(err=>{this.loading_sure = false})
        }else{return false;}
      })
    },
  }
}
</script>