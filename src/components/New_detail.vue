<style scoped>
.font{font-size: 13px;color: #666666;margin-top: 10px;text-align: left;}
</style>
<template>
  <div>
    <div class="banner_div">
      <img src="@/assets/image/交叉 2@2x.png" width="100%">
      <div class="banner_title">
        <div>News and information</div>
        <div>新闻资讯</div>
      </div>
    </div>
    <div class="main">
        <div class="font">首页-新闻资讯-<span style="color:#102141;">{{data.title}}</span></div>
        <div v-html="data.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "news_detail",
  data() {
    return {
      data:{}
    };
  },
  created() {
    this.fetachData()
  },
  methods: {
    fetachData(){
      this.data = JSON.parse(localStorage.getItem('newDetail'))
      localStorage.removeItem('newDetail')
    },
  }
};
</script>
