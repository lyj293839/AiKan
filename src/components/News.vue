<style scoped>
.font{font-size: 13px;color: #666666;margin-top: 10px;text-align: left;}
.newsList ul{margin: 20px 0px;}
.newsList ul li{margin:4px 0px;}
.newsList .content{display: flex;text-align: left;justify-content: space-between;}
.newsList .content .font1{font-size: 16px;color: #333333;}
.newsList .content .font2{font-size: 14px;color: #999999;line-height: 40px;}
.newsList .content .font3{font-size: 12px;color: #666666;}
.newsList .content .font4{font-size: 12px;color: #14398F;margin-top: 40px; cursor: pointer;}
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
        <div class="font">首页-<span style="color:#102141;">新闻资讯</span></div>
        <div v-if="list.total>0">
          <div class="newsList">
            <ul>
                <li v-for="item in list.list">
                    <div class="content">
                        <img :src="item.img" @error="$All.defImg" width="360px" height='200px'>
                        <div style="width:68%;">
                            <div class="font1">{{item.title}}</div>
                            <div class="font2">发布时间：{{item.create_time}}</div>
                            <div class="font3">
                                {{item.introduction}}
                            </div>
                            <div class="font4" @click="to_datail(item)">了解详情<i class="el-icon-d-arrow-right"></i></div>
                        </div>
                    </div>
                </li>
            </ul>
          </div>
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
  </div>
</template>
<script>
export default {
  name: 'news',
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
      this.$post('home/newsList',this.queryList).then(res=>{
        if(res&&res.code==200){
          this.list = res.data
        }else{this.$message.error(res.msg)}
      })
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    to_datail(item){
      localStorage.setItem('newDetail',JSON.stringify(item))
      this.$router.push({
        path: '/news_detail',
        name:'news_detail',
      });
    }
  }
}
</script>