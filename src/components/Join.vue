<style scoped>
.font{font-size: 12px;color: #666666;margin: 10px 0px;text-align: left;}
.font1{color: #333333;font-size: 40px;font-weight: bold;}
.font2{color: #666666;font-size: 20px;line-height: 40px;margin: 30px 0px;}
.el-tabs /deep/ .el-tabs__item{font-size: 16px;color: #333333;}
.el-tabs /deep/ .el-tabs__content{min-height: 258px;}
.el-collapse{border-top: none;font-size: 16px;}
.el-collapse /deep/ .el-collapse-item__header{font-size: 16px;color: #333333;}
.el-collapse /deep/ .el-collapse-item__content{font-size: 16px;color: #999;text-align: left;}
</style>
<template>
  <div>
    <div class="banner_div">
      <img src="@/assets/image/组 3702@2x.png" width="100%">
      <div class="banner_title">
        <div>Join us</div>
        <div>加入我们</div>
      </div>
    </div>
    <div class="main">
      <div class="font">首页-<span style="color:#102141;">加入我们</span></div>
      <div>
        <div class="font1">开放的职位</div>
        <div class="font2">
            如果你有同样的梦想等待实现<br>
            如果你坚信自己拥有推动化工与理想的能力<br>
            那么，加入我们，一起奔跑去改变未来
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" stretch class="el_tabs">
        <el-tab-pane v-for="item in list.list" :label="item.name" :name="item.id.toString()">
          <div v-if="activeName_list.total>0">
            <el-collapse accordion>
                <el-collapse-item v-for="i in activeName_list.list">
                    <template slot="title">
                        <div style="display:flex;justify-content: space-between;width: 100%;">
                            <span style="color:#999999;">{{i.city_name}}</span>
                            <span>{{i.name}}</span>
                            <span style="margin-right:10px;">{{i.experience}}</span>
                        </div>
                    </template>
                    <div v-html="i.describr"></div>
                    <div>{{i.address}}</div>
                </el-collapse-item>
            </el-collapse>
            <el-pagination
                background
                medium 
                class="el_pagination"
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="$root.pageSize"
                :total="activeName_list.total">
            </el-pagination>
          </div>
            <div v-else>
              <img src="@/assets/image/nodata.png" width="200" height="200">
              <div style="color:#153A90;font-size:20px;text-align:center;margin-top:-20px;"><b>暂无内容</b></div>
            </div>
            
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'join',
  data () {
    return {
        list:{list:[]},
        activeName: '',
        currentPage:1,
        queryList:{
            page:1,
            department_id:''
        },
        activeName_list:''
    }
  },
  created () {
    this.fetachData()
  },
  methods: {
    fetachData(){
      this.$post('home/departmentList').then(res=>{
        if(res&&res.code==200){
          this.list = res.data
          this.activeName = res.data.list[0].id.toString()
        }else{this.$message.error(res.msg)}
      })
    },
    handleClick() {
        this.queryList.department_id = this.activeName
        this.$post('home/recruitList',this.queryList).then(res=>{
            if(res&&res.code==200){
            this.activeName_list = res.data
            }else{this.$message.error(res.msg)}
        })
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.handleClick();
    },
  }
}
</script>