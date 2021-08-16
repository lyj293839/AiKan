<style scoped>
.heard{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0px;
  border-bottom: 1px solid #E9E9E9;
  color: #14398F;
  font-size: 16px;
}
.el-row{padding: 20px 0px;text-align: center;color: #E61A12;font-size: 14px;}
.el-row span{color: #333;line-height: 43px;}
.left_a{display: flex;justify-content: center;align-items: center;margin: 30px 0px;}
.left_a /deep/ .el-radio__label{padding-left: 0px !important;}
.font1{font-size: 16px;color: #14398F;}
.font2{font-size: 16px;margin: 10px 0px;}
.font4{font-size: 12px;}
.font3{font-size: 48px;}
.el-row /deep/ .el-divider--vertical{height: 400px;margin-top: 50px;}
.tab{display: flex;align-items: center;justify-content: center;font-size: 15px;margin-top: 30px;}
.tab li{padding: 10px 0px;background: #FAFAFA;cursor: pointer;border-radius: 5px;width: 150px;}
.tab .wx_active{color: white !important;background: #40BA49;}
.tab .zfb_active{color: white !important;background: #03A9F3;}
.erm{position: absolute;top: 95px;left: 219px;width:150px;height:150px;}
</style> 
<template>
  <div class="main">
    <div class="heard">
        &nbsp;
        <span>订单号：{{order_data.order_on}}</span>
        <el-button size="small" plain class="button-plain" @click="to_detail()">订单详情</el-button>
    </div>
    <el-row type="flex" justify='space-between'>
      <el-col :span="12" class="left">
        <div class="font1">线上付款</div>
        <ul class="tab">
          <li :class="radio==2?'zfb_active':''" @click="change_radio(2)" style="color:#03A9F3">支付宝支付</li>
          <li :class="radio==1?'wx_active':''" @click="change_radio(1)" style="color:#40BA49">微信支付</li>
        </ul>
        <div style="margin-top:20px;position: relative;">
          <img v-if="radio==1" src="@/assets/image/微信@2x.png" width="300" height="425">
          <img v-else src="@/assets/image/支付宝支付@2x.png" width="300" height="425">
           <div ref="loading_zfb" class="erm" v-if="radio==2" @click="upload_code(2)">
            <div   id="zfb_qrcode" ref="zfb_qrcode" ></div>
          </div>
          <div ref="loading_wx" class="erm" v-if="radio==1" @click="upload_code(1)">
            <div   id="wx_qrcode" ref="wx_qrcode" ></div>
          </div>
        </div>
      </el-col>
      <el-divider direction="vertical" style="height:100px;"></el-divider>
      <el-col :span="12">
        <div class="font1">线下付款</div>
        <div class="left_a">
            <img src="@/assets/image/组 3657@2x.png" width="143">
        </div>
        <div style="text-align:left;margin-left:100px;">
          <div><span>名称：</span>江苏艾康医药研发有限公司</div>
          <div><span>纳税人识别号：</span>9132 0116 3023 151985</div>
          <div><span>地址、电话：</span>南京市六合区竹镇镇竹丰路5号2173室 025-66117060</div>
          <div><span>开户行及账号：</span>中国银行南京市高新技术开发区支行 470264745219</div>
          <div><span>行号：</span>104301003610</div>
        </div>
        <div class="left_a">
          <img src="@/assets/image/图像 60@2x.png" width="86" height="86">
          <ul style="line-height:30px;text-align:left;margin-left:10px;">
            <li>客服联系方式：</li>
            <li>QQ：2850281387</li>
            <li>微信：aikon123465</li>
            <li>座机：025-66061636</li>
            <li>电话：13155353615</li>
          </ul>
        </div>
        <div>
          <div class="font2">请您汇款后联系客服人员提供订单号确认您的款项信息</div>
          <div class="font3">CNY￥{{order_data.total_money}}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'prod_settle_pay',
  components: {QRCode},
  data () {
    return {
      activeName:'first',
      order_data:{},
      radio:2,
      wx_url:'',
      zfb_url:'',
      loadingInstance:''
    }
  },
  created () {
    this.order_data = JSON.parse(localStorage.getItem('settle_order'))
    this.change_radio(1)
  },
  methods: {
    change_radio(a){
      var obj = {
        order_sn:this.order_data.order_on,
        type:a
      }
      this.radio = a
      if(this.wx_url&&a==1){
        this.$nextTick(() => {this.wx_qrcode()})
        return false
      }
      if(this.zfb_url&&a==2){
        this.$nextTick(() => {this.zfb_qrcode()})
        return false
      }
      if(a==1){
        this.$nextTick(()=>{this.load_img("'loading_wx'")})
      }
      if(a==2){
        this.$nextTick(()=>{this.load_img("'loading_zfb'")})
      }
      this.$post('home/member/pay',obj).then(res=>{
        if(res&&res.code==200){
          if(a==1){
            this.wx_url = res.data.code_url
            this.$nextTick(() => {this.wx_qrcode()})
          }else{
            this.zfb_url = res.data.code_url
            this.$nextTick(() => {this.zfb_qrcode()})
          }
          if(this.loadingInstance){this.loadingInstance.close()}
        }else{this.$message.error(res.msg)}
      })
    },
    upload_code(a){
      var obj = {
        order_sn:this.order_data.order_on,
        type:a
      }
      this.radio = a
      if(obj.type==1){
        this.$nextTick(()=>{this.load_img("'loading_wx'")})
      }
      if(obj.type==2){
        this.$nextTick(()=>{this.load_img("'loading_zfb'")})
      }
      this.$post('home/member/pay',obj).then(res=>{
        if(res&&res.code==200){
          if(obj.type==1){
            this.wx_url = res.data.code_url
            this.$nextTick(() => {this.wx_qrcode()})
          }else{
            this.zfb_url = res.data.code_url
            this.$nextTick(() => {this.zfb_qrcode()})
          }
          if(this.loadingInstance){this.loadingInstance.close()}
        }else{this.$message.error(res.msg)}
      })
    },
    load_img(a){
      if(this.$refs[a]){
        this.loadingInstance = this.$loading({
          target:this.$refs[a],
          lock: true,
          text: 'Loading',
          background: 'rgba(224, 224, 224, 1)'
        });
      }
    },
    wx_qrcode () {
      let that = this
      document.getElementById("wx_qrcode").innerHTML = "";
      let qrcode = new QRCode('wx_qrcode',{
          width: 150, // 设置宽度，单位像素
          height: 150, // 设置高度，单位像素
          text: that.wx_url  // 设置二维码内容或跳转地址
      })
    },
    zfb_qrcode () {
      document.getElementById("zfb_qrcode").innerHTML = "";
      let that = this
      let qrcode = new QRCode('zfb_qrcode',{
          width: 150, // 设置宽度，单位像素
          height: 150, // 设置高度，单位像素
          text: that.zfb_url  // 设置二维码内容或跳转地址
      })
    },
    to_detail(){
      this.$router.push({
        path: '/personal_order_detail',
        name:'personal_order_detail',
        query:{
          order_sn:this.order_data.order_on
        }
      });
    }
  }
}
</script>