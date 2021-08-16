<style scoped>
.card{background: white;box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.08);margin: 30px 0px;}
.content{display: flex;justify-content: center;position: relative;height: 450px;padding-top: 100px;}
.content .el-tabs{width: 420px;}
.content .el-tabs /deep/ .el-tabs__item{font-size: 22px;color: #A6A8B4;line-height:normal;}
.content .el-tabs .el-tab-pane{padding: 10px 30px;}
.content /deep/ .el-input__inner{border-radius: 20px;}
.content .font1{font-size: 14px;color: #666666;text-align: right;margin: 10px 10px 30px 0px;}
.content .font2{font-size: 14px;color: #14398F;text-align: right;margin: 30px 10px 0px 0px;}
.font3{color: #102141;font-size: 16px;text-align: center;}
.content .button1{background: #14398F;width: 100%;border-color: #14398F;padding: 20px 0px;border-radius: 40px;font-size: 18px;}
.content .icon{position: absolute;top: 15px;right: 15px;cursor: pointer;}
.content .icon_img2{position: absolute;top: 15px;right: 0px;}
.content .message_div{display: flex;justify-content: space-between;}
.content .message_div .el-button{margin-left: 5px;color: #666666;background: #E9EDF5;border-color: #E9EDF5;}
.content .sm_div{font-size: 28px;color: #102141;}
.content .sm_div .er_ma{display: flex;justify-content: center;margin-top: 30px;align-items: center;}
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
            <el-row type="flex">
                <el-col :span="8">
                  <img src="@/assets/image/组 3718@2x.png" width="100%" height="100%">
                </el-col>
                <el-col :span="16">
                    <div class="content">
                        <el-tabs v-if="dl_style==1" v-model="activeName" stretch @tab-click="handleClick" class="el_tabs">
                            <el-tab-pane label="密码登录" name="first">
                                <el-form :model="passFormData" :rules="rules" ref="passForm">
                                    <el-form-item prop="mobile">
                                        <el-input v-model="passFormData.mobile" placeholder="您的手机号" @keyup.enter.native="sure('passForm')">
                                            <i slot="prefix" class="el-input__icon el-icon-user"></i>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="password">
                                        <el-input v-model="passFormData.password" placeholder="您的密码" show-password @keyup.enter.native="sure('passForm')">
                                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                                <div class="font1">
                                    <span style="cursor: pointer;" @click="to_forgin()">忘记密码</span>
                                </div>
                                <el-button type="primary" class="button1" round :loading="loading_pass_login" @click="sure('passForm')">登&nbsp;&nbsp;&nbsp;录</el-button>
                                <div class="font2">
                                    <span style="cursor: pointer;" @click="to_register()">立即注册</span>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="短信登录" name="second">
                                <el-form :model="messFormDate" :rules="rules" ref="messForm">
                                    <el-form-item prop="mobile">
                                        <el-input v-model="messFormDate.mobile" placeholder="您的手机号" @keyup.enter.native="sure_mess('messForm')">
                                            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="sms_code">
                                        <div class="message_div">
                                            <el-input v-model="messFormDate.sms_code" placeholder="您的验证码" @keyup.enter.native="sure_mess('messForm')">
                                                <i slot="prefix" class="el-input__icon el-icon-message"></i>
                                            </el-input>
                                            <el-button type="info" round :disabled="is_send" @click="sendMessage()">
                                              <span v-if="!is_send">获取验证码</span>
                                              <span v-else>{{codeTime}}s后重新获取</span>
                                            </el-button>
                                        </div>
                                    </el-form-item>
                                </el-form>
                                <div class="font1"></div>
                                <el-button type="primary" class="button1" round :loading="loading_mess_login" @click="sure_mess('messForm')">登&nbsp;&nbsp;&nbsp;录</el-button>
                                <div class="font2">
                                    <span style="cursor: pointer;" @click="to_register()">立即注册</span>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                        <div v-else class="sm_div">
                            <div>微信扫码登录</div>
                            <div class="er_ma">
                                <div style="margin-right:20px;min-height:200px;min-width:200px;" ref="wx_loading">
                                  <div id="qrcode" ref="qrcode"></div>
                                </div>
                                <img src="@/assets/image/scan_guide@2x.png" height="150">
                            </div>
                        </div>
                        <el-popover
                                placement="left"
                                v-if="dl_style==1"
                                trigger="hover">
                                <div class="font3">扫码登录</div> 
                            <div class="icon" slot="reference" @click="change()">
                                <img src="@/assets/image/路径 11714@2x.png" width="68" class="icon_img2">
                                <img src="@/assets/image/路径 11715@2x.png" width="51">
                            </div>
                        </el-popover>
                        <el-popover
                                placement="left"
                                v-else
                                trigger="hover">
                                <div class="font3">账号密码登录</div> 
                            <div class="icon" slot="reference" @click="dl_style=1">
                                <img src="@/assets/image/路径 11714@2x.png" width="68" class="icon_img2">
                                <img src="@/assets/image/组 3680@2x.png" width="51">
                            </div>
                        </el-popover>
                    </div>
                </el-col>
            </el-row>
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
import QRCode from 'qrcodejs2'
export default {
  name: 'login',
  components: {
    foot,
    top,
    QRCode
  },
  data () {
    return {
      activeName:'first',
      input:'',
      dl_style:1,
      is_send:false,
      codeTime:59,
      passFormData:{
        mobile:'',
        password:'',
        socket_id:''
      },
      messFormDate:{
        mobile:'',
        sms_code:'',
        sms_id:'',
        socket_id:''
      },
      msg:{},
      loadingInstance:'',
      dialogVisible:false,
      loading_message:false,
      loading_pass_login:false,
      loading_mess_login:false,
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        sms_code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    $route(to,from){
      this.$All.title_change(to.meta)
    }
  },
  methods: {
    qrcode (text) {
      document.getElementById("qrcode").innerHTML = "";
      let qrcode = new QRCode('qrcode',{
          width: 200, // 设置宽度，单位像素
          height: 200, // 设置高度，单位像素
          text: text  // 设置二维码内容或跳转地址
      })
    },
    change(){
      this.dl_style = 2
      var obj = {
        socket_id:localStorage.getItem('socket_id')
      }
      this.$nextTick(()=>{
        this.loadingInstance = this.$loading({
          target:this.$refs.wx_loading,
          lock: true,
          text: 'Loading',
          background: 'rgba(255, 255, 255, 0.7)'
        });
      })
      if(this.$cookies.get('socket_url')){
        this.$nextTick(() => {
          this.qrcode(this.$cookies.get('socket_url'))
          if(this.loadingInstance){
            this.loadingInstance.close()
          }
        })
      }else{
        this.$post('home/makeQrcode',obj).then(res=>{
          if(res&&res.code==200){
            this.$cookies.set("socket_url", res.data.url, res.data.expire_seconds);
            this.$nextTick(() => {
              this.qrcode(res.data.url)
            })
            if(this.loadingInstance){
              this.loadingInstance.close()
            }
          }else{
            this.$message.error(res.msg)
          }
        })
      }
    },
    sure(a){
      this.$refs[a].validate((val)=>{
        if(val){
          this.loading_pass_login = true
          this.passFormData.socket_id = localStorage.getItem('socket_id')
          this.$post('home/login',this.passFormData).then(res=>{
            if(res&&res.code==200){
              localStorage.setItem('token',res.data.userToken)
              this.$message.success(res.msg)
              this.$refs[a].resetFields();
              this.loading_pass_login = false
              this.$router.push({
                path: '/personal_order',
                name:'personal_order'
              });
              // setTimeout(() => {
              //   location.reload() // 强制刷新
              // }, 500)
            }else{
              this.$message.error(res.msg)
              this.loading_pass_login = false
            }
          }).catch(err=>{this.loading_pass_login = false})
        }else{return false;}
      })
    },
    sure_mess(a){
      this.$refs[a].validate((val)=>{
        if(val){
          this.loading_mess_login = true
          this.messFormDate.socket_id = localStorage.getItem('socket_id')
          this.$post('home/smsLogin',this.messFormDate).then(res=>{
            if(res&&res.code==200){
              localStorage.setItem('token',res.data.userToken)
              this.$message.success(res.msg)
              this.$refs[a].resetFields();
              this.loading_mess_login = false
              this.$router.push({
                path: '/personal_order',
                name:'personal_order'
              });
              // setTimeout(() => {
              //   location.reload() // 强制刷新
              // }, 500)
            }else{
              this.$message.error(res.msg)
              this.loading_mess_login = false
            }
          }).catch(err=>{this.loading_mess_login = false})
        }else{return false;}
      })
    },
    sendMessage(){
      if(this.messFormDate.mobile){
        if(!this.is_send){
          this.$post('home/getCaptcha').then(res=>{
            if(res&&res.code==200){
              this.msg = {
                img:res.data.img,
                key:res.data.key,
                mobile:this.messFormDate.mobile,
                send_type:2,
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
          this.messFormDate.sms_id = res.data.sms_id
          this.$All.get_Verification(this)
        }else{
          this.loading_message = false
          this.$message.error(res.msg)
        }
      }).catch(err=>{this.loading_message = false})
    },
    handleClick(tab, event){
      this.$refs['passForm'].clearValidate();
      this.$refs['messForm'].clearValidate();
    },
    to_register(){
      this.$router.push({
          path: '/register',
          name:'register'
      });
    },
    to_forgin(){
      this.$router.push({
          path: '/forgin',
          name:'forgin'
      });
    },
  }
}
</script>