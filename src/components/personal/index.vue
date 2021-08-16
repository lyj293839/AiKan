<style scoped>
.main_a{position: absolute;top: 50%;display: flex;justify-content: space-between;align-items: center;transform: translateY(-50%);}
.main_a .icon{display: flex;align-items: center;font-size: 14px;color: #102141;}
.main_a .icon .font1{font-size: 25px;line-height: 50px;}
.el-menu{display: flex;justify-content: space-between;}
.el-menu /deep/ .el-menu-item:hover{background: white !important;}
.main /deep/ .el-menu--horizontal{border: none;}
.content{padding-top: 10px;background: #F2F2F2;}
.inner_dialog /deep/ .el-dialog__header{background: #14398F;text-align: center;padding:10px 0px;}
.inner_dialog /deep/ .el-dialog__body{padding: 18px 20px 0px 20px;text-align: left;}
.inner_dialog /deep/ .el-dialog__title{color: white;font-size: 18px;}
.inner_dialog /deep/ .el-dialog__headerbtn{display: none;}
.message_div{display: flex;justify-content: space-between;}
.message_div .el-button{margin-left: 5px;color: #666666;background: #E9EDF5;border-color: #E9EDF5;}
.email_form /deep/ .el-form-item__label{padding: 0px;}
</style>
<template>
  <div>
    <div class="banner_div">
      <img src="@/assets/image/组 3705@2x.png" width="100%">
      <div class="main main_a">
        <div class="icon">
            <img v-if="$root.userInfo.avatar&&$root.userInfo.avatar!=0" :src="$root.userInfo.avatar" width="106" height="106" style="border-radius: 50%;">
            <img v-else src="@/assets/image/phone.png" width="106" height="106" style="border-radius: 50%;">
            <div style="margin-left:20px;text-align: left;">
                <div class="font1">{{$root.userInfo.username}}</div>
                <div>ID:{{$root.userInfo.mobile}}</div>
            </div>
        </div>
        <div class="icon">
            <div style='margin:0px 25px;cursor: pointer;' @click="email()">
                <img src="@/assets/image/组 3689@2x.png" width="55">
                <div v-if="$root.userInfo.email&&$root.userInfo.email!=0">已绑定</div>
                <div v-else>未绑定</div>
            </div>
            <div style='margin:0px 25px;cursor: pointer;' @click="$root.userInfo.wx_id&&$root.userInfo.wx_id!=0?'':wx()">
                <img src="@/assets/image/组 3672@2x.png" width="57">
                <div v-if="$root.userInfo.wx_id&&$root.userInfo.wx_id!=0">已绑定</div>
                <div v-else>未绑定</div>
            </div>
        </div>
      </div>
    </div>
    <div class="main">
        <el-menu
          :default-active="path"
          background-color="white"
          text-color="#102141"
          active-text-color="#14398F"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="personal_order">我的订单</el-menu-item>
          <el-menu-item index="personal_requery">我的询单</el-menu-item>
          <el-menu-item index="personal_download">文件下载</el-menu-item>
          <el-menu-item index="personal_collect">我的收藏</el-menu-item>
          <el-menu-item index="personal_info">基本资料</el-menu-item>
          <el-menu-item index="personal_password">密码管理</el-menu-item>
        </el-menu>
    </div>
    <div class="content">
      <div class="main" style="background:white;">
        <router-view></router-view>
      </div>
    </div>

    <el-dialog
        width="400px"
        title="绑定邮箱"
        :visible.sync="dialogEmail"
        class="inner_dialog">
        <el-form label-position="top" class="email_form">
          <el-form-item label="请输入邮箱">
            <el-input v-model="emailForm.email" >
                <i slot="prefix" class="el-input__icon el-icon-message"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="请输入验证码">
            <div class="message_div">
                <el-input v-model="emailForm.code">
                    <i slot="prefix" class="el-input__icon el-icon-message"></i>
                </el-input>
                <el-button type="info" round :disabled="is_send" @click="sendMessage()">
                    <span v-if="!is_send">获取验证码</span>
                    <span v-else>{{codeTime}}s后重新获取</span>
                </el-button>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="small" class="button-primary" @click="sure_identify()">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog
        width="300px"
        title="绑定微信"
        :visible.sync="dialogWX"
        class="inner_dialog">
        <div style="padding:0px 20px 20px 20px;display:flex;align-item:center;justify-content: center;min-height:200px;" ref="wx_loading">
          <div id="qrcode" ref="qrcode"></div>
        </div>
        <div style="text-align:center;padding-bottom:10px;">请扫码关注微信公众号，绑定微信</div>
    </el-dialog>
    

  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'personal',
  components: {
    QRCode
  },
  data () {
    return {
      emailForm:{
        email:'',
        code:''
      },
      loadingInstance:'',
      is_send:false,
      codeTime:59,
      path:'personal_order',
      dialogEmail:false,
      dialogWX:false
    }
  },
  created () {
    this.getCurrentMenu()
    this.fetach()
  },
  watch: {
    '$root.userInfo.wx_id' (val) { 
      if(val&&val!=0){
        this.dialogWX = false
      }
　　},
    $route(to,from){
      this.getCurrentMenu()
    }
  },
  methods: {
    fetach(){
      this.$post('home/member/memberInfo').then(res=>{
        if(res&&res.code==200){
          localStorage.setItem('userInfo',JSON.stringify(res.data))
          this.$root.userInfo = res.data
        }else{this.$message.error(res.msg)}
      })
    },
    email(){
      this.emailForm = {
        email:'',
        code:''
      }
      this.dialogEmail = true
    },
    wx(){
      var obj = {
        socket_id:localStorage.getItem('socket_id')
      }
      this.$post('home/member/bindwx',obj).then(res=>{
        if(res&&res.code==200){
          this.dialogWX = true
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
            this.change()
          }
        }else{this.$message.error(res.msg)}
      })
    },
    change(){
      var obj = {
        socket_id:localStorage.getItem('socket_id')
      }
      this.$post('home/makeQrcode',obj).then(res=>{
        if(res&&res.code==200){
          this.$cookies.set("socket_url", res.data.url, res.data.expire_seconds);
          this.$nextTick(() => {
            this.qrcode(res.data.url)
            if(this.loadingInstance){
              this.loadingInstance.close()
            }
          })
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    qrcode (text) {
      document.getElementById("qrcode").innerHTML = "";
      let qrcode = new QRCode('qrcode',{
          width: 200, // 设置宽度，单位像素
          height: 200, // 设置高度，单位像素
          text: text  // 设置二维码内容或跳转地址
      })
    },
    sendMessage(){
      if(this.emailForm.email){
        var obj = {
          email:this.emailForm.email
        }
        this.$post('home/member/verfiyEmail',obj).then(res=>{
          if(res&&res.code==200){
            this.$message.success(res.msg)
            this.$All.get_Verification(this)
          }else{
            this.$message.error(res.msg)
          }
        })
      }else{this.$message.error('请填入邮箱')}
    },
    sure_identify(){
      this.$post('home/member/bindEmail',this.emailForm).then(res=>{
        if(res&&res.code==200){
          this.$message.success(res.msg)
          this.dialogEmail = false
          this.fetach()
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    getCurrentMenu() {
      // 获取当前页面 菜单刷新后能自动选中
      let that = this;
      let currentUrl = window.location.href;
      let currentPage = currentUrl.split("/")[currentUrl.split("/").length-1];
      if(currentPage.indexOf('order')>-1){
        that.path = 'personal_order'
      }else{
        that.path = currentPage;
      }
    },
    handleSelect(key, keyPath) {
      this.path = keyPath[0]
      this.$router.push({
        path: key
      });
    },
  }
}
</script>