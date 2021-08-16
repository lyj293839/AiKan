<style scoped>
.top_font1{color: #27282C;font-size: 14px;margin: 15px 0px;text-align: left;}
.top_font2{color: #14398F;font-size: 28px;text-align: left;font-weight: bold;}
.top_font3{color: #666666;font-size: 16px;margin: 15px 0px;text-align: left;}
.message_ul{display: flex;padding: 10px 0px;background: rgba(21, 58, 144, 0.09);}
.message_ul li{color: #14398F;font-size: 16px;margin:0px 20px;}
.enquiry{display: flex;justify-content: space-between;margin: 15px 0px;}
.enquiry .make_button{display: flex;align-items: center;justify-content: space-between;margin: 20px 0px;}
.el-table /deep/ .el-table__header th{background: #F8F8F8 !important;color: #14398F;}
.el-table /deep/ .el-table__empty-text{width: 100%;line-height:normal;}
.el-table .el-col .el-col{margin: 10px 0px;}
.el-tabs{margin-bottom: 20px;}
.el-tabs /deep/ .el-tabs__item{padding: 0px 40px !important;color: #666666;font-size: 15px;margin: 10px 20px;}
.el-tabs /deep/ .el-tabs__item.is-active{border: 1px solid #14398F;border-radius: 20px;color: #14398F;}
.el-tabs /deep/ .el-tabs__active-bar{background-color:transparent;}
.table_a{border-collapse: collapse;width: 100%;color: #27282C;font-size: 15px;border-radius: 10px;}
.table_a th{width: 130px;padding: 15px 0px;font-weight: normal;background: #E9EDF5;}
.table_a td{padding: 0px 10px;text-align: left;}
.txt_left{
  padding-right: 45px;
  border-right: 1px solid #E9E9E9;
  text-align: left;
}
.txt_left /deep/ .el-form-item__label{line-height: normal;}
.txt_heart{
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}
.txt_msds{
  display: flex;
  align-items: center;
  color: #14398F;
  font-size: 14px;
  margin-top: 13px;
  cursor: pointer;
}
.txt_tip{color: #27282c;font-size: 12px;}
.txt_look{color: #14398F;font-size: 12px;cursor: pointer;}
.el_dialog /deep/ .el-dialog__header .el-dialog__title{font-size: 18px;color: #14398F;}
</style>
<template>
  <div class="main">
    <div class="top_font1">首页>产品目录>{{data.prod.name}}</div>
    <div class="top_font2">{{data.prod.name}}</div>
    <div class="top_font3">{{data.prod.ename}}(订货以英文名为准)</div>
    <ul class="message_ul">
        <li>产品编号：{{data.prod.number}}</li>
        <li>CAS No.：{{data.prod.cas}}</li>
        <li>MDL No.：{{data.prod.mdl_no}}</li>
        <li>分子式：{{data.prod.molecular_formula}}</li>
        <li>分子量：{{data.prod.molecular_weight}}</li>
    </ul>
    <div class="enquiry">
        <img :src="data.prod.img" @error="$All.defImg" width="230" height="230" style="border:1px solid #14398F;margin-right:10px;">
        <div style="width:100%;">
            <el-table
                :data="data.price_list"
                v-loading="table_loading"
                @selection-change="handleSelectionChange"
                size='small'
                style="width: 100%;min-height:230px;">
                <el-table-column
                  type="selection"
                  width="50">
                </el-table-column>
                <el-table-column label="规格" align="center">
                    <template slot-scope="scope">{{scope.row.num}}{{scope.row.unit}}</template>
                </el-table-column>
                <el-table-column label="纯度" align="center">
                    <template slot-scope="scope">{{scope.row.purity}}</template>
                </el-table-column>
                <el-table-column label="库存" align="center">
                    <template slot-scope="scope">{{scope.row.inventory}}</template>
                </el-table-column>
                <el-table-column label="目录价" align="center">
                    <template slot-scope="scope">{{scope.row.price}}</template>
                </el-table-column>
                <el-table-column label="艾康专享价" align="center">
                    <template slot-scope="scope">
                      <span v-if="data.discount>0">
                        {{Number(scope.row.price)*Number(data.discount)}}
                      </span>
                      <span v-else>{{scope.row.price}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="数量" align="center">
                    <template slot-scope="scope">
                        <el-input-number v-model.number="scope.row.number" size="mini" :min="1" @change="num_change(scope.row)"></el-input-number>
                    </template>
                </el-table-column>
                <template slot="empty">
                  <div style="width:100%;">
                    <el-row type="flex" align="middle">
                      <el-col :span="12">当前产品暂无报价，请先登录后提交询价</el-col>
                      <el-col :span="12">
                        <el-row :gutter="20">
                          <el-col :span="12">
                            <el-input v-model="FormData.prod_name" placeholder="请输入内容" class="input_prefix" size="small">
                              <span slot="prefix" class="tip">产品名称</span>
                            </el-input>
                          </el-col>
                          <el-col :span="12">
                            <el-input v-model="FormData.cas" placeholder="请输入内容" class="input_prefix" size="small">
                              <span slot="prefix" class="tip">Cas</span>
                            </el-input>
                          </el-col>
                          <el-col :span="24">
                            <el-input v-model="FormData.remarks" placeholder="备注" size="small"></el-input>
                          </el-col>
                          <div v-for="(item,index) in FormData.specification">
                            <el-col :span="12">
                              <el-input v-model.number="item.num" placeholder="请输入数量"  style="width:59%;" size="small"></el-input>
                              <el-select v-model="item.unit" placeholder="请选择"  style="width:39%;" size="small">
                                <el-option
                                  v-for="item in options"
                                  :key="item"
                                  :label="item"
                                  :value="item">
                                </el-option>
                              </el-select>
                            </el-col>
                            <el-col :span="8">
                              <el-input v-model="item.purity" placeholder="请输入纯度" size="small"></el-input>
                            </el-col>
                            <el-col :span="4" >
                              <el-button v-if="index==0" type="primary" size="small" class="button-primary" style="width:100%;" @click="add()">添加</el-button>
                              <el-button v-else type="danger" size="small" style="width:100%;" @click="cancel(index)">删除</el-button>
                            </el-col>
                          </div>
                          <el-col :span="24">
                            <el-button type="primary"  class="button-primary" size="small" style="width:50%;" @click="up_enquiry()">提交</el-button>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </template>
            </el-table>
            <div class="make_button">
                <div>
                    <el-button type="primary" size="small" class="button-primary" @click="open_enquiry()">大包装询价</el-button>
                    <el-button type="primary" size="small" class="button-primary" :loading="loading_collect" @click="collect()">加入收藏</el-button>
                    <el-button type="primary" size="small" class="button-primary">下载MSDS</el-button>
                </div>
                <div>
                    <el-button plain size="small" class="button-plain" :loading="loading_shopping" @click="do_shopping()">加入购物车</el-button>
                    <el-button type="primary" size="small" class="button-primary" :loading="loading_settle" @click="to_settle()">立即购买</el-button>
                </div>
            </div>
        </div>
    </div>
    <div>
        <el-tabs v-model="active">
          <el-tab-pane label="产品信息" name='first'>
            <table
              border="1"
              class="table_a"
              bordercolor="#153A90"
            >
              <tr>
                <th>英文名称</th>
                <td>{{data.prod.ename}}</td>
              </tr>
              <tr>
                <th>中文名称</th>
                <td>{{data.prod.name}}</td>
              </tr>
              <tr>
                <th>CAS号</th>
                <td>{{data.prod.cas}}</td>
              </tr>
              <tr>
                <th>分子式</th>
                <td>{{data.prod.molecular_formula}}</td>
              </tr>
              <tr>
                <th>分子量</th>
                <td>{{data.prod.molecular_weight}}</td>
              </tr>
              <tr>
                <th>MDL</th>
                <td>{{data.prod.mdl_no}}</td>
              </tr>
              <tr>
                <th>沸点</th>
                <td>{{data.prod.boiling_point}}</td>
              </tr>
              <tr>
                <th>熔点</th>
                <td>{{data.prod.melting_point}}</td>
              </tr>
              <!-- <tr>
                <th>外观</th>
                <td>{{data.prod.characters}}</td>
              </tr> -->
              <tr>
                <th>储存条件</th>
                <td>{{data.prod.storage_conditions}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="安全信息" name='two'>
            <table
              border="1"
              class="table_a"
              bordercolor="#153A90"
            >
              <tr>
                <th>标识符号</th>
                <td>{{data.prod.ldentifier}}</td>
              </tr>
              <tr>
                <th>化学稳定性</th>
                <td>{{data.prod.chemical_stability}}</td>
              </tr>
              <tr>
                <th>安全说明</th>
                <td>{{data.prod.safety_instructions}}</td>
              </tr>
              <tr>
                <th>危险品分类</th>
                <td>{{data.prod.danger_type}}</td>
              </tr>
              <tr>
                <th>危险类别码</th>
                <td>{{data.prod.danger_no}}</td>
              </tr>
              <tr>
                <th>UN代码</th>
                <td>{{data.prod.un_no}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="相关文档" name='three'>
            <el-row :gutter="40">
              <el-col :span="10">
                <div class="txt_left">
                  <div class="txt_heart">质检报告（COA）文件</div>
                  <el-form label-position="top" label-width="100px" :model="formLabelAlign">
                    <el-form-item label="产品编号（Item Number）">
                      <el-input v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <el-form-item label="批号（Lot Number）">
                      <el-input v-model="formLabelAlign.region"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" class="button-primary" size="small">查询并下载</el-button>
                    </el-form-item>
                    <el-form-item>
                      <span class="txt_tip">标签上如何找到货号和批号？</span><br>
                      <span class="txt_look">查看示例</span>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
              <el-col :span="10">
                <div>
                  <div class="txt_heart">化学品安全说明书MSDS</div>
                  <div class="txt_msds" @click="download(data.prod.cas)">
                    <img src="@/assets/image/组 3417@2x.png" width="42" height="42">
                    下载MSDS
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
    </div>

    <el-dialog title="大包装询价" :visible.sync="dialogEnquiry" width="600px" class='el_dialog' @close='close_enquiry'>
      <enquiry ref="child" :data_prod='data_prod'></enquiry>
    </el-dialog>
    <left></left>
  </div>
</template>
<script>
import axios from 'axios'
import left from "../components/leftList";
import enquiry from "../components/enquiry";
export default {
  name: 'prod_detail',
  components: {
    left,
    enquiry
  },
  data () {
    return {
      data:{prod:{}},
      data_prod:{},
      active:'first',
      formLabelAlign:{
        name:'',
        region:''
      },
      FormData:{
        prod_name:'',
        prod_id:'',
        specification:[{
          purity:'',
          num:'',
          unit:''
        }],
        cas:'',
        remarks:'',
      },
      shopping_list:{
        prod_id:'',
        carts:[]
      },
      loading_collect:false,
      dialogEnquiry:false,
      loading_shopping:false,
      loading_settle:false,
      table_loading:false,
      options:['kg','g','mg']
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData(){
      var obj = {
        cas:this.$route.query.cas
      }
      this.table_loading = true
      this.$post('home/prodInfo',obj).then(res=>{
        if(res&&res.code==200){
          res.data.price_list.forEach(i=>{
            i.number = 1
          })
          this.data = res.data
          this.data_prod = res.data.prod
          this.shopping_list.prod_id = res.data.prod.id
          this.FormData={
            prod_name:res.data.prod?res.data.prod.name:'',
            prod_id:res.data.prod?res.data.prod.id:'',
            specification:[{
              purity:'',
              num:'',
              unit:''
            }],
            cas:res.data.prod.cas,
            remarks:'',
          }
          this.table_loading = false
        }else{this.$message.error(res.msg)}
      })
    },
    handleSelectionChange(val){
      this.shopping_list.carts = []
      val.forEach(i=>{
        this.shopping_list.carts.push({num:i.number,id:i.id})
      })
    },
    num_change(item){
      this.shopping_list.carts.forEach(res=>{
        if(res.id==item.id){res.num = item.number}
      })
    },
    download(cas){
      axios({
          method: 'get',
          withCredentials:false,
          url: process.env.API_BASEURL+'api/sds/sdspdf/Angene/'+cas,
          responseType: 'arraybuffer'
      }).then(response => {
          this.$All.forceFileDownload(response.data,cas+'.pdf')
      }).catch(() => console.log('error occured'))
    },
    do_shopping(){
      if(!this.shopping_list.carts.length||this.shopping_list.carts.length==0){
        this.$message.error('请先选择产品规格')
      }else{
        var obj = JSON.parse(JSON.stringify(this.shopping_list))
        obj.carts = JSON.stringify(obj.carts)
        this.loading_shopping= true
        this.$post('home/member/addCart',obj).then(res=>{
          if(res&&res.code==200){
            this.$message.success(res.msg)
            this.loading_shopping = false
          }else{
            this.$message.error(res.msg)
            this.loading_shopping = false
          }
        }).catch(err=>{this.loading_shopping = false})
      }
    },
    collect(){
      if(localStorage.getItem('token')){
        this.loading_collect = true
        var obj = {prod_id:this.data.prod.id}
        this.$post('home/member/addFavorites',obj).then(res=>{
          if(res&&res.code==200){
            this.$message.success(res.msg)
            this.loading_collect = false
          }else{
            this.$message.error(res.msg)
            this.loading_collect = false
          }
        }).catch(err=>{this.loading_collect = false})
      }else{
        this.$message.error('请先登录')
        this.$router.push({
          path: '/login',
          name:'login'
        });
      }
    },
    open_enquiry(){
      if(localStorage.getItem('token')){
        this.dialogEnquiry = true
      }else{
        this.$message.error('请先登录')
        this.$router.push({
          path: '/login',
          name:'login'
        });
      }
    },
    up_enquiry(){
      if(localStorage.getItem('token')){
        var obj = JSON.parse(JSON.stringify(this.FormData))
        obj.specification = JSON.stringify(obj.specification)
        this.$post('home/member/addInquiry',obj).then(res=>{
          if(res&&res.code==200){
            this.$message.success(res.msg)
            this.fetchData()
          }else{this.$message.error(res.msg)}
        })
      }else{
        this.$message.error('请先登录')
        this.$router.push({
          path: '/login',
          name:'login'
        });
      }
    },
    to_settle(){
      if(!this.shopping_list.carts.length||this.shopping_list.carts.length==0){
        this.$message.error('请先选择产品规格')
      }else{
        var obj = JSON.parse(JSON.stringify(this.shopping_list))
        obj.carts = JSON.stringify(obj.carts)
        this.loading_settle= true
        this.$post('home/member/addCart',obj).then(res=>{
          if(res&&res.code==200){
            this.$router.push({
              path: '/prod_goods',
              name:'prod_goods',
            });
            this.loading_settle = false
          }else{
            this.$message.error(res.msg)
            this.loading_settle = false
          }
        }).catch(err=>{this.loading_settle = false})
      }
    },
    close_enquiry(){
      this.$refs.child.fetach()
      this.dialogEnquiry = false
    },
    add(){
      var obj = {
        purity:'',
        num:'',
        unit:''
      }
      this.FormData.specification.push(obj)
    },
    cancel(index){
      this.FormData.specification.splice(index,1)
    }
  }
}
</script>