<style scoped>
.font{font-size: 12px;color: #666666;margin-top: 10px;text-align: left;}
.address{font-size: 18px;color: #333333;text-align: right;margin-bottom: 30px;}
</style>
<template>
  <div>
    <div class="banner_div">
      <img src="@/assets/image/组 3703@2x.png" width="100%">
      <div class="banner_title">
        <div>contact us</div>
        <div>联系我们</div>
      </div>
    </div>
    <div class="main">
      <div class="font">首页-<span style="color:#102141;">联系我们</span></div>
      <div>
          <img src="@/assets/image/组 25@2x.png" width="471" style="margin:56px 0px;">
      </div>
      <iframe src="static/map/index.html" scrolling="no" width="1200px" height="457px" class="iframe" frameborder="0"></iframe>
      <div class="address">江苏省 南京市 浦口区 星火路17号 中建环球大厦11楼</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'contact',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>