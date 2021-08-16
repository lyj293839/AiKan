{<style scoped>
.main ul{width: 100%;margin-bottom: 30px;}
.main ul li{border-bottom: 1px solid #E9E9E9;padding: 10px 15px;font-size: 16px;color: #333333;text-align: left;}
.main ul li .el-button{font-size: 16px;color: #14398F;}
.el-table /deep/ .el-table__header th{color: #27282C;font-size: 15px;}
.total{padding: 10px 15px;color: #FF0000;font-size: 21px;text-align: right;}
.total ul{display: flex;justify-content: flex-end;align-items: flex-end;margin-top: 10px;}
.total ul li{margin-left: 20px;color: #27282C;font-size: 13px;}
.total ul li .el-button{background: #E90026;border-color: #E90026;width: 138px;color: white;}
.inner_dialog /deep/ .el-dialog__header{background: #14398F;text-align: center;padding:10px 0px;}
.inner_dialog /deep/ .el-dialog__body{padding: 18px 20px 0px 20px;text-align: left;}
.inner_dialog /deep/ .el-dialog__title{color: white;font-size: 18px;}
.inner_dialog /deep/ .el-dialog__headerbtn{display: none;}
.inner_dialog .el-form-item{margin-bottom: 20px;}
.inner_dialog /deep/ .el-form-item__label{padding: 0px !important;line-height: 20px;}
.inner_dialog /deep/ .distpicker-address-wrapper select{padding: 0px !important;line-height: 30px;height: 30px;font-size: 13px;}
.text1 /deep/ .el-radio__label{font-size: 16px;line-height: 25px;}
.text1 /deep/ .el-radio{margin-bottom: 20px;}
.is_active{color: #0071E3;}
.order span{cursor: pointer;}
</style>
<template>
  <div class="main" style="padding:10px 0px;">
    <div style="text-align:right;margin:10px;">
      <el-button size="small" plain class="button-plain" style="width:100px;" @click="to_list()">
        <i class="el-icon-back"></i>返回列表
      </el-button>
    </div>
    <ul>
      <li>
        <el-row type="flex" align="middle">
          <el-col :span="2">收货地址</el-col>
          <el-col :span="14">
            {{data.address}}
          </el-col>
          <el-col :span="2" style="text-align:center;">{{data.username}}</el-col>
          <el-col :span="4" style="text-align:center;">{{data.phone}}</el-col>
        </el-row>
      </li>
      <li>
        <el-row type="flex" align="middle">
          <el-col :span="2">发票信息</el-col>
          <el-col :span="18">
            <el-switch
                active-text="开票"
                disabled
                v-model="is_bill">
            </el-switch>
          </el-col>
          <el-col :span="4" class="order" v-if="is_bill">
            <span v-if="data.invoice_info.invoice_type==1">普通发票</span>
            <span v-else>增值税专用发票</span>
          </el-col>
        </el-row>
      </li>
      <li v-if="is_bill">
        <el-row type="flex" align="middle">
          <el-col :span="2">收票地址</el-col>
          <el-col :span="10">{{data.address}}</el-col>
          <el-col :span="4" style="text-align:center;"></el-col>
          <el-col :span="2" style="text-align:center;">{{data.username}}</el-col>
          <el-col :span="4" style="text-align:center;">{{data.phone}}</el-col>
        </el-row>
        <el-row type="flex" align="middle" style="margin-top:10px;">
          <el-col :span="8">发票税号：{{data.invoice_info.duty_paragraph}}</el-col>
          <el-col :span="16">发票接收邮箱：{{data.invoice_info.email}}</el-col>
        </el-row>
        <el-row type="flex" align="middle" style="margin-top:10px;" v-if="data.invoice_info.invoice_type==1">
          <el-col :span="8" style="color:#14398F;"><b>普通发票<i class="el-icon-d-arrow-right"></i></b></el-col>
          <el-col :span="16">发票抬头：{{data.invoice_info.rise}}</el-col>
        </el-row>
        <el-row type="flex" align="middle" style="margin-top:10px;" v-else>
          <el-col :span="8" style="color:#14398F;"><b>增值税专用发票<i class="el-icon-d-arrow-right"></i></b></el-col>
          <el-col :span="8">开户行：{{data.invoice_info.open_bank}}</el-col>
          <el-col :span="8">开户账号：{{data.invoice_info.bank_no}}</el-col>
        </el-row>
      </li>
    </ul>
    <el-table
        :data="data.child_order"
        style="width: 100%">
        <el-table-column label="商品信息" align="center" width="250">
            <template slot-scope="scope">
                <div style="display:flex;align-items: center;justify-content: space-between;">
                    <img :src="scope.row.prod_img" width="76" height="76" @error="$All.defImg" style="margin-right:5px;">
                    {{scope.row.prod_name}}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Cas" align="center">
            <template slot-scope="scope">{{scope.row.cas}}</template>
        </el-table-column>
        <el-table-column label="纯度" align="center" width="100">
            <template slot-scope="scope">{{scope.row.purity}}</template>
        </el-table-column>
        <el-table-column label="规格" align="center">
            <template slot-scope="scope">{{scope.row.pack}}</template>
        </el-table-column>
        <el-table-column label="数量" align="center" width="120">
            <template slot-scope="scope">{{scope.row.num}}</template>
        </el-table-column>
        <el-table-column label="下单价" align="center">
            <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column label="折扣" align="center" width="80">
            <template slot-scope="scope">{{scope.row.discount?scope.row.discount:'--'}}</template>
        </el-table-column>
        <el-table-column label="实付价" align="center">
            <template slot-scope="scope">{{(Number(scope.row.price)*Number(scope.row.num)*Number(scope.row.discount?scope.row.discount:1)).toFixed(2)}}</template>
        </el-table-column>
    </el-table>
    <div class="total">
      <div style="color: #27282C;font-size: 13px;line-height: 30px;">运费：{{data.shipping}}</div>
      <div>总金额：￥{{data.total_money}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personal_order_detail',
  data () {
    return {
      data:{},
      is_bill:false
    }
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
      var obj = {
        order_sn:this.$route.query.order_sn
      }
      this.$post('home/member/orderInfo',obj).then(res=>{
        if(res&&res.code==200){
          this.data = res.data
          if(res.data.invoice_info){this.is_bill = true}else{this.is_bill = false}
        }else{this.$message.error(res.msg)}
      })
    },
    to_list(){
      this.$router.push({
        path: '/personal_order',
        name:'personal_order',
      });
    }
  }
}
</script>