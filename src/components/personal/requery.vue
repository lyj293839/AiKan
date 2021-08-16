<style scoped>
.heard{text-align: left;background: #E9EDF5;font-size: 16px;padding: 10px;}
.heard .el-col{padding:0px 20px;display: flex;justify-content: space-between;align-items: center;}
.contant{text-align: left;background: white;padding: 10px;padding-bottom: 50px;}
.contant .el-row{border: 1px solid #DDDDDD;margin-bottom: 10px;padding: 10px;}
.contant .el-row .col_left{font-size: 14px;color: #666666;padding: 0px 10px 0px 10px;}
/* .contant .el-row .col_left ul{border-right: 1px solid #DDDDDD;} */
.contant .el-row li{margin: 10px 0px;}
.contant .el-row .col_right{padding-left: 10px;margin-top: 30px;}
.contant .el-row .col_right .col_right_lef{background: #F5F5F5;padding:0px 10px 10px 10px;font-size: 14px;color: #333;width: 76%;position: relative;}
.contant .el-row .col_right .price{position: absolute;font-size: 30px;right: 10px;bottom: 0px;}
.contant .el-row .col_right .font1{font-size: 12px;color: rgba(21, 58, 144, 0.4);}
.contant .el-row .col_right .font2{font-size: 14px;color: #153A90;}
.contant .el-row .col_right .el-button{width: 100%;margin-top: 30px;}
.contant .el-row .col_right .button1{color: red !important;border-color: red !important;}
.el_dialog /deep/ .el-dialog__header .el-dialog__title{font-size: 18px;color: #14398F;}
</style>
<template>
  <div>
    <div class="heard">
      <el-row type="flex" align="middle">
        <el-col :span="12"><span>询单信息</span></el-col>
        <el-col :span="12">
          <span>询单回复</span>
          <!-- <span><el-button plain size="small" class="button-plain" @click="dialogEnquiry=true">新建询单</el-button></span> -->
        </el-col>
      </el-row>
    </div>
    <div class="contant" v-if="list.total>0">
      <div>
        <el-row type="flex" v-for="item in list.list">
          <el-col :span="12" class="col_left">
            <div><b style="color:#333333;">我的询单</b></div>
            <ul>
              <li>产品名称：{{item.prod_name}}</li>
              <li>Cas：{{item.cas}}</li>
              <li>备注：{{item.remarks&&item.remarks!=0?item.remarks:''}}</li>
            </ul>
          </el-col>
          <el-col :span="12" style="border-left: 1px solid #DDDDDD;" class="col_right">
            <div v-for="i in item.specification" style="display: flex;align-items: center;margin-bottom:10px;">
              <div class="col_right_lef">
                <ul>
                  <li>产品名称：{{item.prod_name}}</li>
                  <li>Cas：{{item.cas}}</li>
                  <li>
                    <span style="margin-right:10px;">数量：{{i.num}}{{i.unit}}</span>
                    <span>纯度：{{i.purity}}</span>
                  </li>
                </ul>
                <div class="price" v-if="i.status">
                  <span :style="i.status==1?'color:#E61A12':'color:#999999'">¥{{i.price}}</span>
                </div>
              </div>
              <div style="margin-left:20px;">
                <div v-if="i.status==1" class="font2">
                  <div class="font1">报价剩余有效期</div>
                  {{i.time.D +'天'+ i.time.h+'时' + i.time.m+'分'}}
                </div>
                <div v-else-if="i.status==2">已过期</div>
                <div v-else-if="i.status==3">已作废</div>
                <div v-else>报价中</div>

                <el-button v-if="i.status==1&&i.time.D!=i.time.h!=i.time.m!='00'" plain class="button-plain button1" size="small" :loading="i.loading_shopping" @click="do_shopping(i)">加入购物车</el-button>
                <el-button v-else-if="i.status==2" plain class="button-plain" size="small" @click="anew_enquiry(item)">重新询单</el-button>
                <div v-else></div>
              </div>
            </div>
          </el-col>
        </el-row>
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
    </div>
    <div v-else style="padding-bottom:10px;">
      <img src="@/assets/image/nodata.png" width="200" height="200">
      <div style="color:#153A90;font-size:20px;text-align:center;margin-top:-20px;"><b>暂无内容</b></div>
    </div>
    <el-dialog title="大包装询价" :visible.sync="dialogEnquiry" width="600px" class='el_dialog' @close='close_enquiry'>
      <enquiry ref="child" :data_prod='data_prod'></enquiry>
    </el-dialog>
  </div>
</template>
<script>
import enquiry from "../components/enquiry";
export default {
  name: 'personal_requery',
  components: {
    enquiry
  },
  data () {
    return {
      list:{list:[]},
      data_prod:{},
      currentPage:1,
      queryList:{
        page:1,
      },
      dialogEnquiry:false,
    }
  },
  created() {
    // this.$All.setEndTime('2021-06-01 12:00',this.time)
    this.fetchData()
  },
  methods: {
    fetchData(){
      this.$post('home/member/inquiryList',this.queryList).then(res=>{
        if(res&&res.code==200){
          res.data.list.forEach(i=>{
            i.specification.forEach(j=>{
              j.loading_shopping = false
              if(j.status==1){
                j.time = {D: "00",h: "00",m: "00"}
                if(j.effectiv_time.String&&j.effectiv_time.Valid){
                  this.$All.setEndTime(j.effectiv_time.String,j.time,60000)
                }
              }
            })
          })
          this.list = res.data
        }else{this.$message.error(res.msg)}
      })
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    anew_enquiry(item){
      this.data_prod = item
      this.data_prod.name = item.prod_name
      this.dialogEnquiry = true
    },
    do_shopping(item){
      var obj = {
        inquiry_id:item.inquiry_id,
        price_id:item.id
      }
      item.loading_shopping = true
      this.$post('home/member/inquiryCart',obj).then(res=>{
        if(res&&res.code==200){
          this.$message.success(res.msg)
          this.fetchData()
          item.loading_shopping = false
        }else{
          this.$message.error(res.msg)
          item.loading_shopping = false
        }
      }).catch(err=>{item.loading_shopping = false})
    },
    close_enquiry(){
      this.$refs.child.fetach()
      this.data_prod = {}
      this.dialogEnquiry = false
    },
  },
}
</script>
