<style scoped>
.screen{display: flex;justify-content: space-between;align-items: center;color: #14398F;font-size: 14px;}
.screen ul li{margin-right: 40px;font-size: 16px;color: #666666;cursor: pointer;}
.main{padding: 20px 0px 30px 0px;}
.main ul{display: flex;align-items: center;flex-wrap: wrap;}
.is_active{color: #102141 !important;padding-bottom: 3px;border-bottom: 1px solid #102141;}
.el-collapse{text-align: left;border: none;}
.el-collapse /deep/ .el-collapse-item__header{
  border:none;
  font-size: 13px;
  color: #333333;
  line-height:normal;
  height: auto;
  margin-bottom: 10px;
}
.el-collapse /deep/ .el-collapse-item__arrow{display: none;}
.el-collapse /deep/ .el-collapse-item__wrap{border: none;}
.el-collapse /deep/ .el-collapse-item__content{padding: 0px;margin-bottom: 10px;color: #666666;font-size: 12px;}
.el-collapse /deep/ .is-active .el-collapse-item__header{font-size: 16px;}
.look_over{text-align: right;color: #153A90;font-size: 13px;}
.look_over span{cursor: pointer;}
.banner2{position: relative;display: flex;align-items: center;}
.banner2 .font1{position: absolute;width: 100%;text-align: center;color: white;}
</style>
<template>
  <div>
    <el-carousel trigger="click" :height="bannerHeight+'px'" style="z-index:1;">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.path" width="100%" ref="bannerImg" @load="imgLoad">
      </el-carousel-item>
    </el-carousel>
    <div class="main">
      <div class="screen">
        <ul>
          <li v-for="item in categoryList" :class="Index==item.id?'is_active':''" @click="screen(item)">{{item.name}}</li>
        </ul>
        <span style="cursor: pointer;" @click="to_prod()">查看全部分类</span>
      </div>
      <div v-if="list.total>0">
        <ul class="prod_content">
          <li v-for="(item,index) in list.list" @click="to_detail()">
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
          </li>
        </ul>
        <el-pagination
          style="text-align:right;margin-top:15px;"
          layout="prev, pager, next"
          :page-size="$root.pageSize"
          :total="list.total">
        </el-pagination>
      </div>
      <div v-else>
        <img src="@/assets/image/nodata.png" width="200" height="200">
        <div style="color:#153A90;font-size:20px;text-align:center;margin-top:-20px;"><b>暂无内容</b></div>
      </div>
    </div>
    <div class="banner2">
      <img src="@/assets/image/组 7@2x.png" @error="$All.defImg" width="100%">
      <div class="font1">
        <div style="font-size:25px;"><b>公司坚持人才攻略为先导，专注于产品的研发投入与创新</b></div>
        <div style="font-size:18px;">The company adheres to the talent strategy as the guide, focusing on product R &amp; D investment and innovation</div>
      </div>
    </div>
    <div style="position: relative;">
      <img src="@/assets/image/交叉 1@2x.png" @error="$All.defImg" width="100%">
      <div class="select" style="position: absolute;width: 100%;text-align: center;top: 60px;">
        <div>选择我们的理由</div>
        <div class="under">
          <div class="under-border"></div>
          <div class="under-middle"></div>
          <div class="under-border"></div>
        </div>
      </div>
      <img src="@/assets/image/组 3697@2x.png" @error="$All.defImg" width="1266px" style="position: absolute;left:50%;transform: translateX(-50%);top:200px;">
    </div>
    <div class="main">
      <div class="select">
        <div>新闻资讯</div>
        <div class="under">
          <div class="under-border"></div>
          <div class="under-middle"></div>
          <div class="under-border"></div>
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span='8'>
          <img src="@/assets/image/00001@2x.png" @error="$All.defImg" width="100%">
        </el-col>
        <el-col :span='16'>
          <div v-if="activeNameList.list.length>0">
            <el-collapse accordion >
              <el-collapse-item v-for="item in activeNameList.list">
                <template slot="title">
                  <div style="display:flex;justify-content: space-between;width: 100%;">
                    <span>{{item.title}}</span>
                    <span style="color:#999999;">{{item.create_time}}</span>
                  </div>
                </template>
                <div>{{item.introduction}}</div>
              </el-collapse-item>
            </el-collapse>
            <div class="look_over">
              <span @click="to_new()">查看全部<i class="el-icon-d-arrow-right" style="margin-left:5px;"></i></span>
            </div>
          </div>
          <div v-else>
            <img src="@/assets/image/nodata.png" width="200" height="200">
            <div style="color:#153A90;font-size:20px;text-align:center;margin-top:-20px;"><b>暂无内容</b></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      Index: 1,
      list:{},
      categoryList:[],
      queryList:{
        page:1
      },
      bannerList:[
        {path:require('@/assets/image/7副本@2x.png'),id:1}
      ],
      activeNameList:{list:[]},
      bannerHeight:'',
    }
  },
  mounted () {
    this.imgLoad()
    window.addEventListener('resize',()=>{
      this.imgLoad()
    })
  },
  created () {
    this.fetachData()
  },
  methods: {
    fetachData(){
      this.categoryList = JSON.parse(localStorage.getItem('categoryList'))
      this.Index = this.categoryList[0]?this.categoryList[0].id:0
      this.$post('home/bannerList').then(res=>{
        if(res&&res.code==200){
          if(res.data.list.length>0){
            this.bannerList = res.data.list
          }
        }else{this.$message.error(res.msg)}
      })
      this.$post('home/newsList',this.queryList).then(res=>{
        if(res&&res.code==200){
          this.activeNameList = res.data
        }else{this.$message.error(res.msg)}
      })
    },
    prod_list(){
      var queryList = {
        page:1,
        cate_id:this.categoryList.filter(i=>{return i.id==this.Index})[0].children[0].id
      }
      this.$post('home/prodList',this.queryList).then(res=>{
        if(res&&res.code==200){
          this.list = res.data
        }else{this.$message.error(res.msg)}
      })
    },
    imgLoad(){
      this.$nextTick(()=>{
        this.bannerHeight = this.$refs.bannerImg[0]?this.$refs.bannerImg[0].height:0
      })
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
    to_prod(){
      this.$router.push({
        path: '/prod',
        name:'prod',
        query:{
          cate_id:this.Index
        }
      });
    },
    to_new(){
      this.$router.push({
        path: '/news',
        name:'news',
      });
    },
    screen(item){
      this.Index = item.id
      var queryList = {
        page:1,
        cate_id:item.children[0]?item.children[0].id:0,
      }
      this.$post('home/prodList',queryList).then(res=>{
        if(res&&res.code==200){
          this.list = res.data
        }else{this.$message.error(res.msg)}
      })
    }
  }
}
</script>