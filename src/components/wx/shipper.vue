<style scoped>
.body{margin: 0px;padding:0px;}
.body ul{list-style: none;}
.banner{position: relative;}
.txt{position: absolute;top: 50%;transform: translateY(-50%);left: 4vw;}
.list_ul{padding: 1vw;list-style: none;margin: 0;background: white;}
.list_ul li{
    display: flex;
    align-items: center;
    padding: 1vw 0;
    border-bottom: 0.1vw solid #F9F9F9;
    font-size: 3vw;
    color: #666666;
    position: relative;
}
.list_ul li .price{
    position: absolute;
    bottom: 1vw;
    right: 1vw;
    color: #102141;
    font-size: 3vw;
    text-align: right;
}
.price_ul{margin: 2vw 0px 0px 0px;background: white;padding: 2vw;}
.price_ul li{display: flex;align-items: center;justify-content: space-between;width: 100%;margin-bottom: 0.5vw;}
.price_ul .font1{color: #333333;font-size: 3.5vw;}
.price_ul .font2{color: #999999;font-size: 3vw;}
.foot{background: white;font-size: 3.5vw;text-align: center;margin-top: 2vw;padding: 5vw 0px;color: #999999;}
</style>
<template>
    <div style="background:#F9F9F9;text-align:left;" class="body">
      <div class="banner">
          <img src="@/assets/image/组 3712@2x.png" width="100%">
          <div class="txt">
            <div style="font-size: 5vw;color: #14398F;line-height: 6vw;"><b>已发货</b></div>
            <div style="font-size: 3.5vw;color: #14398F;">顺丰：26589291618916</div>
          </div>
      </div>
      <ul class="list_ul">
        <li v-for='item in [1,2]'>
          <img src="@/assets/image/组 3709@2x.png" style="width: 20%;height: 20vw;margin-right: 1vw;">
          <div>
            <div><b style="color: #27282C;font-size: 3.5vw;">N,N,N,N-四（对氨基酸）对苯二胺</b></div>
            <div>Cas：3298-07-6</div>
            <div>规格：100g</div>
            <div>纯度：97</div>
          </div>
          <div class="price">
            <div>x1</div>
            <div>¥1388.00</div>
          </div>
        </li>
      </ul>
      <ul class="price_ul">
        <li class="font1">
          <span ><b>商品合计</b></span>
          <span>¥2766.00</span>
        </li>
        <li class="font2">
          <span >运费</span>
          <span>¥0.00</span>
        </li>
        <li class="font2">
          <span>专属折扣</span>
          <span>-¥553.30</span>
        </li>
        <li class="font1" style="border-top:0.1vw solid #F9F9F9;padding: 0.5vw 0;">
          <span><b>实际支付</b></span>
          <span style="color: #E61A12;">¥2212.70</span>
        </li>
      </ul>
      <ul class="price_ul">
        <li class="font1">
        <span ><b>收货地址</b></span>
        </li>
        <li class="font2">
        <span>江苏省南京市浦口区顶山街道顶山工业园2649</span>
        </li>
        <li class="font2">
        <span>顶山实验室   15518004101</span>
        </li>
      </ul>
      <ul class="price_ul">
        <li class="font1">
        <span ><b>订单信息</b></span>
        </li>
        <li class="font2">
        <span>订单编号：AK545816</span>
        </li>
        <li class="font2">
        <span>支付时间：2021.03.05 12:26 </span>
        </li>
        <li class="font2">
        <span>支付渠道：线下汇款</span>
        </li>
      </ul>
      <div class='foot'>更多信息请登录艾康官网查看</div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'wx_shipper',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    fetach(){
      axios({
        method: 'post',
        url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
        data: {
          appid: 'APPID',
          secret: 'SECRET',
          code:'CODE',
          grant_type:'authorization_code'
        }
      }).then(function (response) {
        console.log(response);
      })
      
      // axios.post('https://api.weixin.qq.com/sns/oauth2/access_token', {
      //   appid: 'APPID',
      //   secret: 'SECRET',
      //   code:'CODE',
      //   grant_type:'authorization_code'
      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    }
  }
}
</script>