<style scoped>
.font{color:#14398F;font-size: 14px;margin-top: 15px;text-align: left;}
.menu ul{display: flex;align-items: center;flex-wrap: wrap;font-size: 16px;}
.menu ul li{cursor: pointer;padding: 5px 20px;margin: 15px 5px 0px 0px;border-radius: 5px;}
.menu ul li:hover{background: #7499f0;color: white;}
.menu .is_active{background: #14398F !important;color: white !important;}
</style>
<template>
  <div class="main">
    <div class="font">请选择您所需的分类</div>
    <div class="menu" >
      <ul>
        <li v-for="(item,index) in searchList" :class="queryList.cate_id==item.id?'is_active':''" @click="select_prod(item.id)">{{item.name}}</li>
      </ul>
    </div>
    <div ref="prodList">
      <div v-if="list.total>0">
        <ul class="prod_content">
          <li v-for="(item,index) in list.list" @click="to_detail(item)">
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
      <div v-else style="height:50vh;display:flex;align-items: center;justify-content: center;">
        <div>
          <img src="@/assets/image/nodata.png" width="200" height="200">
          <div style="color:#153A90;font-size:20px;text-align:center;margin-top:-20px;"><b>暂无内容</b></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'prod',
  data () {
    return {
      Index:0,
      searchList:[],
      list:{list:[]},
      queryList:{
        page:1,
        cate_id:'',
        keyword:'',
        smiles_type:'',
        smiles:''
      },
      currentPage:1,
      loadingInstance:''
    }
  },
  watch: {
    $route(to,from){
      this.fetchData()
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData(){
      this.Index=0
      var categoryList = JSON.parse(localStorage.getItem('categoryList'))
      this.searchList = 
      categoryList.filter(i=>{return i.id==this.$route.query.cate_id})[0]?categoryList.filter(i=>{return i.id==this.$route.query.cate_id})[0].children:''
      this.select_prod(this.searchList[0]?this.searchList[0].id:'')
    },
    select_prod(index){
      this.$nextTick(()=>{
        this.loadingInstance = this.$loading({
          target:this.$refs.prodList,
          lock: true,
          text: 'Loading',
          background: 'rgba(255, 255, 255, 0.7)'
        });
      })
      this.queryList.cate_id = index
      this.queryList.keyword = this.$route.query.keyword
      this.queryList.smiles_type = localStorage.getItem('smiles_type')
      this.queryList.smiles = localStorage.getItem('smiles')
      this.$post('home/prodList',this.queryList).then(res=>{
        if(res&&res.code==200){
          this.list = res.data
          localStorage.removeItem('smiles')
          localStorage.removeItem('smiles_type')
        }else{this.$message.error(res.msg)}
        if(this.loadingInstance){
          this.loadingInstance.close()
        }
        if(this.$route.query.keyword){
          this.$route.query.keyword = 0
        }
      })
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    to_detail(item){
      this.$router.push({
        path: '/prod_detail',
        name:'prod_detail',
        query:{
          cas:item.cas
        }
      });
    }
  }
}
</script>