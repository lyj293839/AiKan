<style scoped>
.cancel{position: absolute;top: 5px;right: 10px;}
</style>
<template>
  <div style="padding-bottom:20px;">
    <div v-if="list.total>0">
      <ul class="prod_content" >
        <li v-for="(item,index) in list.list" @click="to_detail()" style="position: relative;">
          <img :src="item.img" @error="$All.defImg" width="222">
          <div style="padding:0px 5px;">
            <div class="font1" v-if="item.name&&item.name!='N/A'">{{item.name}}</div>
            <div class="font2">{{item.ename}}</div>
            <div class="text">
              <span class="font3">CAS:{{item.cas}}</span>
            </div>
            <div style="position: absolute;bottom: 0px;right:10px;">
              <span class="font4">${{item.min_price}}</span>
            </div>
          </div>
          <img class="cancel" src="@/assets/image/组 3661@2x.png" width="20" @click.stop="cancel(item.id)">
        </li>
      </ul>
      <el-pagination
        background
        medium 
        class="el_pagination"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="$root.pageSize"
        :total="list.total">
      </el-pagination>
    </div>
    <div v-else>
      <img src="@/assets/image/nodata.png" width="200" height="200">
      <div style="color:#153A90;font-size:20px;text-align:center;margin-top:-20px;"><b>暂无内容</b></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personal_collect',
  data () {
    return {
      list:{list:[]},
      queryList:{
        page:1,
      },
      currentPage:1
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData(){
      this.$post('home/member/favoritesList',this.queryList).then(res=>{
        if(res&&res.code==200){
          this.list = res.data
        }else{this.$message.error(res.msg)}
      })
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    to_detail(){
      this.$router.push({
        path: '/prod_detail',
        name:'prod_detail',
        query:{
          id:1
        }
      });
    },
    cancel(id){
      this.$confirm('将取消收藏该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {favorites_id:id}
        this.$post('home/member/cancelFavorites',obj).then(res=>{
          if(res&&res.code==200){
            this.$message.success(res.msg)
            this.fetchData()
          }else{this.$message.error(res.msg)}
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  }
}
</script>