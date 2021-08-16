<style scoped>
.body{margin: 0px;padding:0px;}
.body ul{list-style: none;}
.foot{background: white;font-size: 3.5vw;text-align: center;margin-top: 2vw;padding: 5vw 0px;color: #999999;}
.banner{position: relative;}
.txt{position: absolute;top: 50%;transform: translateY(-50%);left: 4vw;}
.list_ul .prod{
    display: flex;
    align-items: center;
    font-size: 3vw;
    color: #666666;
    line-height: 5vw;
    position: relative;
}
.list_ul .prod .price{
    position: absolute;
    bottom: 1vw;
    right: 1vw;
    color: red;
    font-size: 3vw;
    text-align: right;
}
.list_ul li{border-bottom: 0.2vw solid #F9F9F9;padding: 1vw 0;}
 .list_ul li /deep/ .el-input-group__prepend{padding: 0 10px;}
</style>
<template>
    <div style="text-align:left;" class="body">
      <div class="banner">
          <img src="@/assets/image/组 3715@2x.png" width="100%">
          <div class="txt">
            <div style="font-size: 4.5vw;color: white;line-height: 6vw;"><b>询单回复</b></div>
          </div>
      </div>
      <div style="padding: 0 3vw;">
        <ul class="list_ul">
            <li>
              <div><b style="color: #333;font-size: 4vw;">我的询单</b></div>
              <div class="prod">
                <img src="@/assets/image/组 3709@2x.png" style="width: 25%;margin-right: 1vw;">
                <div>
                    <div><b style="color: #27282C;font-size: 3.5vw;line-height:normal;">N,N,N,N-四（对氨基酸）对苯二胺</b></div>
                    <div>Cas：3298-07-6</div>
                    <div>规格：100g</div>
                    <div>纯度：97&</div>
                </div>
              </div>
              <el-input v-model="input" size="mini">
                <template slot="prepend">备注</template>
              </el-input>
            </li>
            <li>
              <div><b style="color: #333;font-size: 4vw;">官方回复</b></div>
              <div class="prod">
                <img src="@/assets/image/组 3709@2x.png" style="width: 25%;margin-right: 1vw;">
                <div>
                    <div><b style="color: #27282C;font-size: 3.5vw;line-height:normal;">N,N,N,N-四（对氨基酸）对苯二胺</b></div>
                    <div>Cas：3298-07-6</div>
                    <div>规格：100g</div>
                    <div>纯度：97&</div>
                </div>
                <div class="price">
                    <div>x1</div>
                    <div>¥1388.00</div>
                </div>
              </div>
              <el-input v-model="input" size="mini">
                <template slot="prepend">备注</template>
              </el-input>
            </li>
        </ul>
        <div class='foot'>更多信息请登录艾康官网查看</div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'wx_requery',
  data () {
    return {
      input:''
    }
  },
  created () {
  },
  methods: {
  }
}
</script>