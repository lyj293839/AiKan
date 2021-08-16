<style scoped>
.trapezoid{
  position:absolute;
  top: -5px;
  left: 0px;
  height: 5px;
  width: 105px;
  overflow:hidden;
  transition:0.3s;
}
.trapezoid:before{
  content:'';
  display:block;
  position:absolute;
  top:-1px;
  bottom:0;
  right:0;
  width: 105px;
  transform-origin:0 100%;
  transform:skewX(45deg);
  border-bottom: 0px;
  background: #E61A12;
  transition:0.3s;
}
.top{display: flex;justify-content: flex-end;margin-top: 10px;}
.top ul{display: flex;align-items: center;}
.top ul li{margin-left: 30px;cursor: pointer;font-size: 12px;}
.top /deep/ .el-dropdown-link{font-size: 12px;color:#153A90;}
.heard{display: flex;align-items: center;justify-content: space-between;font-size: 12px;margin: 10px 0px;}
.heard div{display: flex;align-items: center;}
.heard .input{border: 1px solid #DCDFE6;border-radius: 15px;width: 280px;margin-right: 15px;}
.heard .input /deep/ .el-input__inner{height: 30px;line-height: 30px;width: 260px;border: none;margin: 0px auto;padding: 0px;}
.heard .input /deep/ .el-input__icon{line-height: 30px;}
.menu{background:#153A90;}
.menu .el-menu{justify-content: flex-end;display: flex;border:none;z-index: 2;}
.menu /deep/ .el-menu--horizontal{border: none;}
.menu /deep/ .el-menu-item{border:none;position: relative;width: 100px;transition:0s;margin-left: 20px;}
.menu /deep/ .is-active{border:none !important;background: #E61A12 !important;}
.menu /deep/ .is-active .el-submenu__title{border-bottom: none !important;}
.menu /deep/ .el-submenu__icon-arrow{color: white !important;}
</style>
<template>
  <div>
    <div class="main">
      <div class="top">
        <ul>
          <li v-if='isLogin'>
            <el-dropdown>
              <span class="el-dropdown-link">
                {{$root.userInfo.mobile?$root.userInfo.mobile:'null'}}
              </span>
              <el-dropdown-menu slot="dropdown" class="el_dropdown" style="padding:5px 0px !important;">
                <el-dropdown-item style="font-size:11px;">
                  <div @click="loginOut()">
                    退出账户
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li style="color:#153A90;" v-else>
            <span @click="toRouter('login')">登录</span>
            /
            <span @click="toRouter('register')">注册</span>
          </li>
          <li @click="toRouter('prod_goods')">购物车</li>
          <li @click="toRouter('personal_order')">我的订单</li>
          <li @click="toRouter('personal')">个人中心</li>
        </ul>
      </div>
      <div class="heard">
        <img src="@/assets/image/资源 2@4x@2x.png" width="193" @click="to_home()">
        <div>
          <div class="input">
            <el-input v-model="input" placeholder="请输入CAS或产品编号" @keyup.enter.native='Search()'>
              <i slot="suffix" class="el-input__icon el-icon-search" style="cursor: pointer;" @click="Search()"></i>
            </el-input>
          </div>
          <span style="cursor: pointer;" @click="Structured_search()">结构式搜索</span>
        </div>
      </div>
    </div>
    <div class="menu">
      <div class="main">
        <el-menu
          :default-active="path"
          background-color="#153A90"
          :text-color="'white'"
          :active-text-color="'white'"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="home">
            首页
            <div v-if="path=='home'" class="trapezoid"></div>
            <div v-if="path=='home'" style="transform:rotateX(180deg);left:0px;position: absolute;">
              <div class="trapezoid"></div>
            </div>
          </el-menu-item>
          <el-menu-item index="about">
            关于艾康
            <div v-if="path=='about'" class="trapezoid"></div>
            <div v-if="path=='about'" style="transform:rotateX(180deg);left:0px;position: absolute;">
              <div class="trapezoid"></div>
            </div>
          </el-menu-item>
          <el-submenu index="prod" style="margin-left:20px;">
            <template slot="title">产品中心</template>
            <el-menu-item v-for="item in categoryList" :index="item.id.toString()">{{item.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item index="news">
            新闻资讯
            <div v-if="path=='news'" class="trapezoid"></div>
            <div v-if="path=='news'" style="transform:rotateX(180deg);left:0px;position: absolute;">
              <div class="trapezoid"></div>
            </div>
          </el-menu-item>
          <el-menu-item index="join">
            加入我们
            <div v-if="path=='join'" class="trapezoid"></div>
            <div v-if="path=='join'" style="transform:rotateX(180deg);left:0px;position: absolute;">
              <div class="trapezoid"></div>
            </div>
          </el-menu-item>
          <el-menu-item index="contact">
            联系我们
            <div v-if="path=='contact'" class="trapezoid"></div>
            <div v-if="path=='contact'" style="transform:rotateX(180deg);left:0px;position: absolute;">
              <div class="trapezoid"></div>
            </div>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <router-view/>
    <foot></foot>

    <el-dialog title="结构式搜索" :visible.sync="dialogTableVisible" class="">
      <div>
        <iframe id="iframe" src="static/search/ketcher_labgle.html" scrolling="no" width="100%" style="height:600px;" frameborder="0"></iframe>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import foot from '../components/components/footer'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'index',
  components: {
    foot
  },
  data () {
    return {
      path: 'home',
      input:'',
      categoryList:[],
      websocket: null,
      timer: 0,
      socket_id:'',
      isLogin:false,
      dialogTableVisible:false,
    }
  },
  watch: {
    $route(to,from){
      this.getCurrentMenu()
    }
  },
  created () {
    this.getCurrentMenu()
    if(localStorage.getItem('token')){this.isLogin = true}else{this.isLogin = false}
    this.fetachData()
  },
  methods: {
    fetachData(){
      this.$post('home/categoryList').then(res=>{
        res.data.unshift({name:'全部',id:0,children:[{id:0,name:'全部'}]})
        this.categoryList = res.data?res.data:[]
        localStorage.setItem('categoryList',JSON.stringify(res.data))
      })
    },
    Structured_search(){
      this.dialogTableVisible = true
    },
    Search(){
      this.$router.push({
        path: '/prod',
        name:'prod',
        query:{
          keyword:this.input
        }
      });
    },
    toRouter(a){
      this.$router.push({
        path: '/'+a,
        name:a
      });
    },
    getCurrentMenu() {
      // 获取当前页面 菜单刷新后能自动选中
      let that = this;
      let currentUrl = window.location.href;
      let currentPage = currentUrl.split("/")[currentUrl.split("/").length-1];
      if(currentPage.indexOf('prod')>-1){
        that.path = 'prod'
      }else{
        that.path = currentPage;
      }
    },
    handleSelect(key, keyPath) {
      this.path = keyPath[0]
      if(keyPath[0]=='prod'){
        this.$router.push({
          path: 'prod',
          query:{
            cate_id:keyPath[1]
          }
        });
      }else{
        this.$router.push({
          path: key
        });
      }
    },
    loginOut(){
      this.$confirm('确定退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$store.commit('logout')
        this.$cookies.remove('socket_url')
        this.isLogin = false
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        this.$router.push({
          path: '/home',
          name:'home'
        });
        setTimeout(() => {
          location.reload() // 强制刷新
        }, 500)
      }).catch(() => {
        this.$message({
          type: 'info',
          offset:'50',
          message: '已取消退出'
        })
      })
    },
    to_home(){
      this.$router.push({
          path: '/home',
          name:'home'
      });
    },
  }
}
</script>
