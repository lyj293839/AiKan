<style scoped>
ul{
    width: 60px;
    box-shadow: 0px 0px 6px rgba(20, 57, 143, 0.17);
    position: fixed;
    right: 50%;
    top: 50%;
    transform: translate(680px,-50%);
}
ul li{border-bottom: 1px solid #E3E3E3;font-size: 11px;color: #14398F;padding: 10px 5px;cursor: pointer;}
ul li i{font-size: 30px;}
</style>
<template>
    <div style="background:white;">
        <ul>
            <li @click="toRouter('personal')">
                <i class="el-icon-user-solid"></i>
                <div>个人中心</div>
            </li>
            <li @click="toRouter('prod_goods')">
                <i class="el-icon-shopping-cart-1"></i>
                <div>购物车</div>
            </li>
            <li @click="toRouter('personal_collect')">
                <i class="el-icon-star-off"></i>
                <div>个人收藏</div>
            </li>
            <li @click="$All.goTop()">
                <i class="el-icon-upload2"></i>
                <div>返回顶部</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  methods: {
    toRouter(a){
      this.$router.push({
        path: '/'+a,
        name:a
      });
    },
  }
}
</script>