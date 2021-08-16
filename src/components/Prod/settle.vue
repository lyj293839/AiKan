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
  <div class="main">
    <div style="text-align:right;margin:10px 0px;"><el-button size="small" plain class="button-plain" style="width:100px;" @click="add_address()">添加地址</el-button></div>
    <ul>
      <li>
        <el-row type="flex" align="middle">
          <el-col :span="2">收货地址</el-col>
          <el-col :span="14">
            {{addressList_data.province_name}}
            {{addressList_data.city_name}}
            {{addressList_data.area_name}}
            {{addressList_data.address}}
          </el-col>
          <el-col :span="2" style="text-align:center;">{{addressList_data.username}}</el-col>
          <el-col :span="4" style="text-align:center;">{{addressList_data.mobile}}</el-col>
          <el-col :span="2" style="text-align:center;"><el-button type="text" @click="select_address()">更换</el-button></el-col>
        </el-row>
      </li>
      <li>
        <el-row type="flex" align="middle">
          <el-col :span="2">发票信息</el-col>
          <el-col :span="18">
            <el-switch
                active-text="开票"
                v-model="is_bill">
            </el-switch>
          </el-col>
          <el-col :span="4" class="order" v-if="is_bill">
            <span>普通发票</span>/
            <span>增值税专用发票</span>
          </el-col>
        </el-row>
      </li>
      <li v-if="is_bill">
        <el-row type="flex" align="middle">
          <el-col :span="2">收票地址</el-col>
          <el-col :span="10">{{bill_data.address}}</el-col>
          <el-col :span="4" style="text-align:center;"></el-col>
          <el-col :span="2" style="text-align:center;">{{$root.userInfo.username}}</el-col>
          <el-col :span="4" style="text-align:center;">{{$root.userInfo.mobile}}</el-col>
          <el-col :span="2" style="text-align:center;"><el-button type="text" @click="edit_bill()">修改</el-button></el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="8">发票税号：{{bill_data.duty_paragraph}}</el-col>
          <el-col :span="16">发票接收邮箱：{{bill_data.email}}</el-col>
        </el-row>
        <el-row type="flex" align="middle" style="margin-top:10px;" v-if="bill_data.invoice_type==1">
          <el-col :span="8" style="color:#14398F;"><b>普通发票<i class="el-icon-d-arrow-right"></i></b></el-col>
          <el-col :span="16">发票抬头：{{bill_data.rise}}</el-col>
        </el-row>
        <el-row type="flex" align="middle" style="margin-top:10px;" v-if="bill_data.invoice_type==2">
          <el-col :span="8" style="color:#14398F;"><b>增值税专用发票<i class="el-icon-d-arrow-right"></i></b></el-col>
          <el-col :span="8">开户行：{{bill_data.open_bank}}</el-col>
          <el-col :span="8">开户账号：{{bill_data.bank_no}}</el-col>
        </el-row>
      </li>
    </ul>
    <el-table
        :data="list"
        style="width: 100%;min-height:300px;">
        <el-table-column label="商品信息" align="center" width="250">
            <template slot-scope="scope">
                <div style="display:flex;align-items: center;justify-content: space-between;">
                    <img :src="scope.row.img" width="76" height="76" @error="$All.defImg" style="margin-right:5px;">
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
            <template slot-scope="scope">{{scope.row.price_num}}{{scope.row.unit}}</template>
        </el-table-column>
        <el-table-column label="下单价" align="center">
            <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column label="数量" align="center" width="120">
            <template slot-scope="scope">
                <el-input-number disabled v-model.number="scope.row.num" style="width:100%;" size="mini" :min="1" @change="num_change(scope.row)"></el-input-number>
            </template>
        </el-table-column>
         <el-table-column label="折扣" align="center" width="100">
            <template slot-scope="scope">{{discount?discount:'--'}}</template>
        </el-table-column>
        <el-table-column label="实付价" align="center">
            <template slot-scope="scope">{{(Number(scope.row.price)*Number(scope.row.num)*Number(discount?discount:1)).toFixed(2)}}</template>
        </el-table-column>
    </el-table>
    <div class="total">
        <div>总金额：￥{{Number(total_money)+Number(yun_code)}}</div>
        <ul>
            <li>商品总价：￥{{total_money}}</li>
            <li>运费：￥{{yun_code}}</li>
            <li><el-button type="primary" :loading="loading_" @click="to_settle()">确认结算</el-button></li>
        </ul>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="430px"
      title="选择收货地址"
      class="inner_dialog"
    >
      <div class="text1">
        <el-radio-group v-model="radio">
          <div v-for="item in addressList">
            <el-radio  :label="item.id">
              <span>{{item.username}}</span>
              <span>{{item.mobile}}</span> 
              <span style="margin-left:10px;">{{item.email}}</span>
              <div>{{item.province_name}}{{item.city_name}}{{item.area_name}}{{item.address}}</div>
            </el-radio>
          </div>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="button-primary" size="small" @click="save_select()">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog
        width="500px"
        title="添加地址"
        :visible.sync="dialogAddress"
        class="inner_dialog">
        <AddAddress ref="child_address"></AddAddress>
    </el-dialog>

    <el-dialog
        width="450px"
        title="编辑开票"
        :visible.sync="dialogBill"
        class="inner_dialog">
        <billList ref="child_Bill"></billList>
    </el-dialog>
  </div>
</template>
<script>
import billList from "../personal/components/add_bill";
import AddAddress from '../personal/components/add_address'
export default {
  name: 'prod_settle',
  components: {
    billList,
    AddAddress
  },
  data () {
    return {
      addressList:[],
      addressList_data:{},
      bill_data:{},
      is_bill:false,
      radio:'',
      list:[],
      discount:0,
      bill_type:1,
      total_money:0,
      yun_code:0,
      dialogVisible:false,
      dialogAddress:false,
      dialogBill:false,
      loading_:false,
    }
  },
  created () {
    this.fetach()
    this.memberDiscount()
  },
  methods: {
    fetach(){
      this.fetach_address()
      this.fetach_bill()
      this.list = localStorage.getItem('settleShop')?JSON.parse(localStorage.getItem('settleShop')):''
      this.total_money = 0
      this.list.forEach(i=>{
        this.total_money+=Number(Number(i.price)*Number(i.num)*Number(this.discount?this.discount:1).toFixed(2))
      })
    },
    fetach_bill(){
      this.$post('home/member/invoiceInfo').then(res=>{
        if(res&&res.code==200){
          this.bill_data = res.data
        }else{this.$message.error(res.msg)}
      })
    },
    fetach_address(){
      this.$post('home/member/addressList').then(res=>{
        if(res&&res.code==200){
          this.addressList = res.data
          this.addressList_data = res.data[0]?res.data[0]:{}
          if(this.addressList_data){
            this.yunFile()
          }
        }else{this.$message.error(res.msg)}
      })
    },
    memberDiscount(){
      this.$post('home/member/memberDiscount').then(res=>{
        if(res&&res.code==200){
          this.discount = res.data.discount
        }else{this.$message.error(res.msg)}
      })
    },
    yunFile(){
      if(Number(this.total_money)<100){
        if(this.addressList_data.province_name.indexOf('江苏')>-1||
        this.addressList_data.province_name.indexOf('浙江')>-1||
        this.addressList_data.province_name.indexOf('上海')>-1)
        {
          this.yun_code = 10
        }else{
          this.yun_code = 15
        }
      }else{
        this.yun_code = 0
      }
    },
    edit_bill(){
      this.dialogBill = true
      this.bill_data.type = 1
      setTimeout(()=>{
        this.$refs.child_Bill.fetach(JSON.parse(JSON.stringify(this.bill_data)))
      })
    },
    cancel_bill(){
      this.dialogBill = false
      this.fetach_bill()
    },
    select_address(){
      this.radio = this.addressList_data.id
      this.dialogVisible = true
    },
    save_select(){
      this.addressList_data = this.addressList.filter(i=>{return i.id==this.radio})[0]
      this.dialogVisible = false
      this.yunFile()
    },
    cancel_address(){
      this.dialogAddress = false
      this.fetach_address()
    },
    to_settle(){
      var arr = []
      this.list.forEach(i=>{
        var obj = {
          id:i.cart_id,
          num:i.num
        }
        arr.push(obj)
      })
      var obj = {
        carts:JSON.stringify(arr),
        address_id:this.addressList_data.id,
        is_invoice:this.is_bill,
      }
      this.loading_ = true
      this.$post('home/member/createOrder',obj).then(res=>{
        if(res&&res.code==200){
          this.loading_ = false
          var order = {
            order_on:res.data.order_sn,
            total_money:res.data.total_money,
          }
          localStorage.setItem('settle_order',JSON.stringify(order))
          this.$router.push({
            path: '/prod_settle_pay',
            name:'prod_settle_pay',
          });
        }else{
          this.$message.error(res.msg)
          this.loading_ = false
        }
      }).catch(err=>{this.loading_ = false})
    },
    add_address(){
      this.dialogAddress = true
      setTimeout(()=>{
        this.$refs.child_address.fetach()
      })
    }
  }
}
</script>