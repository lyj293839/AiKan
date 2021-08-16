<style scoped>
.card{background: white;box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.08);margin: 30px 0px;}
.middle{width: 350px;margin: 0px auto;padding: 50px 0px 100px 0px;}
.middle /deep/ .el-input__inner{border-radius: 20px;}
.middle .message_div{display: flex;justify-content: space-between;}
.middle .message_div .el-button{margin-left: 5px;color: #666666;background: #E9EDF5;border-color: #E9EDF5;}
.middle .agree{font-size: 16px;line-height: 20px;}
.middle .agree /deep/ .el-form-item__content{line-height:normal;}
.middle .agree /deep/ .el-form-item__error{width: 100%;text-align: center;}
.button1{background: #14398F;width: 100%;border-color: #14398F;padding: 20px 0px;border-radius: 40px;font-size: 18px;}
.font1{color: #14398F;font-size: 18px;margin-bottom: 20px;}
.inner_dialog /deep/ .el-dialog__header{background: #14398F;text-align: center;padding:10px 0px;}
.inner_dialog /deep/ .el-dialog__body{padding: 18px 20px 0px 20px;}
.inner_dialog /deep/ .el-dialog__title{color: white;font-size: 18px;}
.inner_dialog /deep/ .el-dialog__headerbtn{display: none;}
.inner_dialog .inner{display:flex;justify-content: center;align-items: center;}
</style>
<template>
    <div style="background:#F3F7FA;">
      <top></top>
      <div class="main">
        <div class="card">
          <div class="middle">
            <div class="font1">找回账户密码</div>
            <el-form :model='formDate' :rules="rules" ref="Form">
                <el-form-item prop="mobile">
                    <el-input v-model="formDate.mobile" placeholder="手机号码">
                        <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="sms_code">
                    <div class="message_div">
                        <el-input v-model="formDate.sms_code" placeholder="您的验证码">
                            <i slot="prefix" class="el-input__icon el-icon-message"></i>
                        </el-input>
                        <el-button type="info" round :disabled="is_send" @click="sendMessage()">
                            <span v-if="!is_send">获取验证码</span>
                            <span v-else>{{codeTime}}s后重新获取</span>
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="formDate.password" placeholder="请设置您的密码" show-password>
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="Checkpassword">
                    <el-input v-model="formDate.Checkpassword" placeholder="请再次输入您的密码" show-password>
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="agreen" class="agree">
                    <el-checkbox v-model="formDate.agreen">我同意</el-checkbox>
                    <span style="color:#14398F;cursor: pointer;" @click="to_txt()">（用户协议）</span>
                </el-form-item>
            </el-form>
            <el-button type="primary" class="button1" round :loading="loading_sure" @click="sure('Form')">确&nbsp;&nbsp;&nbsp;认</el-button>
          </div>
        </div>
      </div>
      <el-dialog
          width="300px"
          title="请输入验证码"
          :visible.sync="dialogVisible"
          class="inner_dialog">
          <div class="inner">
            <el-input v-model="msg.captcha" size="small" placeholder="请输入" style="width:150px;margin-right:10px;"></el-input>
            <img :src="msg.img" @click="sendMessage()" @error="$All.defImg" style="cursor: pointer;">
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" size="small" class="button-primary" :loading="loading_message" @click="sure_identify()">确 定</el-button>
          </span>
      </el-dialog>
      <foot></foot>
    </div>
</template>
<script>
import foot from '../components/footer'
import top from "../components/top";
export default {
  name: 'forgin',
  components: {
    foot,
    top
  },
  data () {
    var validateAgreen = (rule, value, callback) => {
        if (!value) {
            callback(new Error('请选择协议'));
        } else {
            callback();
        }
    }
    var validateCheck = (rule, value, callback) => {
        if (!value) {
            callback(new Error('请再次输入密码'));
        } else {
            if(value!=this.formDate.password){
                callback(new Error('两次密码不一致'));
            }else{
                callback();
            }
        }
    }
    return {
      formDate:{
        mobile:'',
        sms_code:'',
        password:'',
        Checkpassword:'',
        sms_id:'',
        agreen:false
      },
      msg:{},
      is_send:false,
      codeTime:59,
      dialogVisible:false,
      loading_message:false,
      loading_sure:false,
      rules: {
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        Checkpassword: [
          { required: true, validator: validateCheck, trigger: 'blur' }
        ],
        sms_code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        agreen: [
          { required: true, validator: validateAgreen, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    sure(a){
      this.$refs[a].validate((val)=>{
        if(val){
          this.loading_sure = true
          this.$post('home/forgetPassword',this.formDate).then(res=>{
            if(res&&res.code==200){
              this.$message.success(res.msg)
              this.loading_sure = false
              this.$refs[a].resetFields();
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
    sendMessage(){
      if(this.formDate.mobile){
        if(!this.is_send){
          this.$post('home/getCaptcha').then(res=>{
            if(res&&res.code==200){
              this.msg = {
                img:res.data.img,
                key:res.data.key,
                mobile:this.formDate.mobile,
                send_type:3,
                captcha:''
              }
              this.dialogVisible = true
            }else{this.$message.error(res.msg)}
          })
        }
      }else{this.$message.error('请先输入手机号码')}
    },
    sure_identify(){
      this.loading_message = true
      this.$post('home/sendSms',this.msg).then(res=>{
        if(res&&res.code==200){
          this.loading_message = false
          this.dialogVisible = false
          this.formDate.sms_id = res.data.sms_id
          this.$All.get_Verification(this)
        }else{
          this.loading_message = false
          this.$message.error(res.msg)
        }
      }).catch(err=>{this.loading_message = false})
    },
    to_txt(){
      this.$router.push({
          path: '/txt',
          name:'txt'
      });
    }
  }
}
</script>