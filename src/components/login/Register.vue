<style scoped>
.card{background: white;box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.08);margin: 30px 0px;}
.content{height: 500px;padding: 40px 0px 80px 0px;width: 340px;margin: 0px auto;}
.content .font1{font-size: 18px;color: #14398F;margin-bottom: 20px;}
.content .font1 span{cursor: pointer;font-size: 13px;color: red;}
.content /deep/ .el-input__inner{border-radius: 20px;}
.content .button1{background: #14398F;width: 100%;border-color: #14398F;padding: 20px 0px;border-radius: 40px;font-size: 18px;}
.content .message_div{display: flex;justify-content: space-between;}
.content .message_div .el-button{margin-left: 5px;color: #666666;background: #E9EDF5;border-color: #E9EDF5;}
.content .agree{font-size: 16px;line-height: 20px;}
.content .agree /deep/ .el-form-item__content{line-height:normal;}
.content .agree /deep/ .el-form-item__error{width: 100%;text-align: center;}
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
            <div class="content">
                <div class="font1">
                  新用户注册
                  <span v-if="$route.params.is_ban" @click="type=!type">(已有账号绑定)</span>
                </div>
                <div v-if="!type">
                  <el-form :model='regFormData' :rules="rules" ref="regForm">
                    <el-form-item prop="username">
                        <el-input v-model="regFormData.username" placeholder="我们将如何称呼您">
                            <i slot="prefix" class="el-input__icon el-icon-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="company">
                        <el-input v-model="regFormData.company" placeholder="您的企业名称是">
                            <i slot="prefix" class="el-input__icon el-icon-office-building"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="mobile">
                        <el-input v-model="regFormData.mobile" placeholder="您的手机号">
                            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="sms_code">
                        <div class="message_div">
                            <el-input v-model="regFormData.sms_code" placeholder="您的验证码">
                                <i slot="prefix" class="el-input__icon el-icon-message"></i>
                            </el-input>
                            <el-button type="info" round :disabled="is_send" @click="sendMessage()">
                                <span v-if="!is_send">获取验证码</span>
                                <span v-else>{{codeTime}}s后重新获取</span>
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="regFormData.password" placeholder="请设置您的密码" show-password>
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="agreen" class="agree">
                        <el-checkbox v-model="regFormData.agreen">我同意</el-checkbox>
                        <span style="color:#14398F;cursor: pointer;" @click="to_txt()">（用户协议）</span>
                    </el-form-item>
                  </el-form>
                  <el-button type="primary" class="button1" round :loading="loading_reg" @click="sure_reg('regForm')">注&nbsp;&nbsp;&nbsp;册</el-button>
                </div>
                <div v-else>
                  <el-form :model='regFormData_b' :rules="rules" ref="regForm_b">
                    <el-form-item prop="mobile">
                        <el-input v-model="regFormData_b.mobile" placeholder="您的手机号">
                            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="regFormData_b.password" placeholder="您的密码" show-password>
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="agreen" class="agree">
                        <el-checkbox v-model="regFormData_b.agreen">我同意</el-checkbox>
                        <span style="color:#14398F;cursor: pointer;" @click="to_txt()">（用户协议）</span>
                    </el-form-item>
                  </el-form>
                  <el-button type="primary" class="button1" round :loading="loading_reg_b" @click="sure_reg_b('regForm_b')">完&nbsp;&nbsp;&nbsp;成</el-button>
                </div>
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
            <img :src="msg.img" @click="sendMessage()" style="cursor: pointer;">
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
  name: 'register',
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
    };
    return {
      regFormData:{
        username:'',
        company:'',
        mobile:'',
        sms_code:'',
        password:'',
        wx_id:'',
        agreen:false,
        sms_id:'',
        socket_id:''
      },
      regFormData_b:{
        mobile:'',
        password:'',
        agreen:false,
        socket_id:'',
        wx_id:''
      },
      msg:{},
      type:false,
      dialogVisible:false,
      is_send:false,
      loading_message:false,
      loading_reg:false,
      loading_reg_b:false,
      codeTime:59,
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入公司', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
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
    sure_reg(a){
      this.$refs[a].validate((val)=>{
        if(val){
          this.loading_reg = true
          this.regFormData.wx_id = localStorage.getItem('wx_id')
          this.regFormData.socket_id = localStorage.getItem('socket_id')
          this.$post('home/registered',this.regFormData).then(res=>{
            if(res&&res.code==200){
              this.loading_reg = false
              this.$message.success(res.msg)
              this.$refs[a].resetFields();
              localStorage.setItem('token',res.data.userToken)
              localStorage.removeItem('wx_id')
              this.$router.push({
                path: '/personal_order',
                name:'personal_order'
              });
            }else{
              this.$message.error(res.msg)
              this.loading_reg = false
            }
          }).catch(err=>{this.loading_reg = false})
        }else{return false;}
      })
    },
    sure_reg_b(a){
      this.$refs[a].validate((val)=>{
        if(val){
          this.loading_reg_b = true
          this.regFormData_b.wx_id = localStorage.getItem('wx_id')
          this.regFormData_b.socket_id = localStorage.getItem('socket_id')
          this.$post('home/bind',this.regFormData_b).then(res=>{
            if(res&&res.code==200){
              this.loading_reg_b = false
              this.$message.success(res.msg)
              this.$refs[a].resetFields();
              localStorage.setItem('token',res.data.userToken)
              localStorage.removeItem('wx_id')
              this.$router.push({
                path: '/personal_order',
                name:'personal_order'
              });
            }else{
              this.$message.error(res.msg)
              this.loading_reg_b = false
            }
          }).catch(err=>{this.loading_reg_b = false})
        }else{return false;}
      })
    },
    sendMessage(){
      if(this.regFormData.mobile){
        if(!this.is_send){
          // this.$All.get_Verification(this)
          this.$post('home/getCaptcha').then(res=>{
            if(res&&res.code==200){
              this.msg = {
                img:res.data.img,
                key:res.data.key,
                mobile:this.regFormData.mobile,
                send_type:1,
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
          this.regFormData.sms_id = res.data.sms_id
          this.$All.get_Verification(this)
        }else{
          this.sendMessage()
          this.loading_message = false
          this.$message.error(res.msg)
        }
      }).catch(err=>{this.loading_message = false})
    },
    // get_Verification(){
    //   let me = this;
    //   me.is_send = true;
    //   let codeInterval = window.setInterval(function() {
    //       if ((me.codeTime--) <= 0) {
    //             me.codeTime = 59;
    //             me.is_send = false;
    //             window.clearInterval(codeInterval);
    //         }
    //     }, 1000);
    // },
    to_txt(){
      this.$router.push({
          path: '/txt',
          name:'txt'
      });
    }
  }
}
</script>