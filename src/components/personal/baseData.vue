<style scoped>
.ul_ ul li{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  border-bottom: 1px solid rgba(112, 112, 112, 0.45);
  text-align: left;
  font-size: 14px;
  line-height: 40px;
}
.ul_ ul li .el-button{font-size: 14px;color: #0071E3;}
.index{display: flex;align-items: center;width: 100%;}
.index div{width: 110px;}
.index .el-input{width: 100%;}
.index /deep/ .el-input__inner{border: none;border-bottom: 1px solid #DCDFE6;border-radius: 0px;font-size: 14px;}
.heard{
  background: #E9EDF5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  color: #333333;
  line-height: 40px;
  padding: 0px 10px;
}
.heard .is_active{color: #0071E3;}
.heard span{cursor: pointer;}
.button-plain{margin: 10px 0px;}
.inner_dialog /deep/ .el-dialog__header{background: #14398F;text-align: center;padding:10px 0px;}
.inner_dialog /deep/ .el-dialog__body{padding: 18px 20px 0px 20px;text-align: left;}
.inner_dialog /deep/ .el-dialog__title{color: white;font-size: 18px;}
.inner_dialog /deep/ .el-dialog__headerbtn{display: none;}
.inner_dialog .el-form-item{margin-bottom: 20px;}
.inner_dialog /deep/ .el-form-item__label{padding: 0px !important;line-height: 20px;}
.inner_dialog /deep/ .distpicker-address-wrapper select{padding: 0px !important;line-height: 30px;height: 30px;font-size: 13px;}
</style>
<template>
  <div style="padding:0px 80px;" class="ul_">
    <ul>
      <li>
        <div class="index">
          <div>姓名：</div>
          <span v-if="!isData_1">{{data.username}}</span>
          <el-input v-else v-model="data.username" placeholder="请输入内容" size="small"></el-input>
        </div>
        <el-button type="text" @click="isData_1=!isData_1">{{isData_1?'保存':'修改'}}</el-button>
      </li>
      <li>
        <div class="index">
          <div>企业名称：</div>
          <span v-if="!isData_2">{{data.company}}</span>
          <el-input v-else v-model="data.company" placeholder="请输入内容" size="small"></el-input>
        </div>
        <el-button type="text" @click="isData_2=!isData_2">{{isData_2?'保存':'修改'}}</el-button>
      </li>
      <li>
        <div class="index">
          <div>联系方式：</div>
          <span v-if="!isData_3">{{data.mobile}}</span>
          <el-input v-else v-model="data.mobile" placeholder="请输入内容" size="small"></el-input>
        </div>
        <el-button type="text" @click="isData_3=!isData_3">{{isData_3?'保存':'修改'}}</el-button>
      </li>
    </ul>
    <div class="heard">
      <div><b>发票设置</b></div>
      <div>
        <span :class="data.type==1?'is_active':''" @click="data.type=1">普通发票</span>/
        <span :class="data.type==2?'is_active':''" @click="data.type=2">增值税专用发票</span>
      </div>
    </div>
    <ul>
      <li>
        <div class="index">
          <div><span style="color:red;">*</span> 发票税号：</div>
          <span v-if="!isData_4">{{data.duty_paragraph}}</span>
          <el-input v-else v-model="data.duty_paragraph" placeholder="请输入内容" size="small"></el-input>
        </div>
      </li>
      <li v-if="data.type==1">
        <div class="index">
          <div><span style="color:red;">*</span>发票抬头：</div>
          <span v-if="!isData_4">{{data.rise}}</span>
          <el-input v-else v-model="data.rise" placeholder="请输入内容" size="small"></el-input>
        </div>
      </li>
      <span v-else>
        <li>
          <div class="index">
            <div><span style="color:red;">*</span>开户行：</div>
            <span v-if="!isData_4">{{data.open_bank}}</span>
            <el-input v-else v-model="data.open_bank" placeholder="请输入内容" size="small"></el-input>
          </div>
        </li>
        <li>
          <div class="index">
            <div><span style="color:red;">*</span>开户账号：</div>
            <span v-if="!isData_4">{{data.bank_no}}</span>
            <el-input v-else v-model="data.bank_no" placeholder="请输入内容" size="small"></el-input>
          </div>
        </li>
      </span>
      <li>
        <div class="index">
          <div>发票接收邮箱：</div>
          <span v-if="!isData_4">{{data.email}}</span>
          <el-input v-else v-model="data.email" placeholder="请输入内容" size="small"></el-input>
        </div>
      </li>
      <li>
        <div class="index">
          <div><span style="color:red;">*</span>地址：</div>
          <span v-if="!isData_4">{{data.address}}</span>
          <el-input v-else v-model="data.address" placeholder="请输入内容" size="small"></el-input>
        </div>
      </li>
    </ul>
    <el-button plain round size="small" class="button-plain" :loading="loading_invoice" @click="save_invoice">{{isData_4?'保存':'修改'}}</el-button>
    <div class="heard">
      <div><b>地址簿</b></div>
    </div>
    <ul>
      <span v-for="item in addressList">
        <li>
          {{item.province_name}}
          {{item.city_name}}
          {{item.area_name}}
          {{item.address}}
        </li>
        <li>
            <span>{{item.username}}&nbsp;&nbsp;{{item.mobile}}&nbsp;&nbsp;{{item.email}}</span>
            <div>
              <el-button type="text" @click="del_address(item)">删除</el-button>
              <el-button type="text" @click="edit_address(item)">修改</el-button>
            </div>
        </li>
      </span>
    </ul>
    <el-button plain round size="small" class="button-plain" @click="add_address()">再加一条</el-button>

    <el-dialog
        width="500px"
        title="添加地址"
        :visible.sync="dialogAddress"
        class="inner_dialog">
        <AddAddress ref="child_address"></AddAddress>
        <!-- <v-distpicker :province="addressForm.province_name" :city="addressForm.city_name" :area="addressForm.area_name" @selected="onSelected"></v-distpicker> -->
    </el-dialog>
  </div>
</template>
<script>
import AddAddress from './components/add_address'
export default {
  name: 'personal_info',
  components: { AddAddress },
  data () {
    var validateAddress = (rule, value, callback) => {
        if (!value||!this.addressForm.city_name||!this.addressForm.area_name) {
          callback(new Error('请选择完详细地址'));
        } else {
          callback();
        }
    };
    return {
      type:1,
      data:{},
      addressForm:{},
      addressList:[],
      isData_1:false,
      isData_2:false,
      isData_3:false,
      isData_4:false,
      loading_invoice:false,
      dialogAddress:false,
      loading_address:false,
      provinceList:[],
      cityList:[],
      areaList:[],
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        province_name: [
          { required: true, validator: validateAddress, trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
      }
    }
  },
  created () {
    this.fetach()
    this.fetach_address()
  },
  methods: {
    fetach(){
      this.$post('home/member/invoiceInfo').then(res=>{
        if(res&&res.code==200){
          var userInfo = {
            username:this.$root.userInfo.username,
            company:this.$root.userInfo.company,
            mobile:this.$root.userInfo.mobile,
            type:1
          }
          this.data = Object.assign(userInfo,res.data)
          this.data.open_bank = this.data.open_bank&&this.data.open_bank!=0?this.data.open_bank:'-'
          this.data.bank_no = this.data.bank_no&&this.data.bank_no!=0?this.data.bank_no:'-'
        }else{this.$message.error(res.msg)}
      })
    },
    fetach_address(){
      this.$post('home/member/addressList').then(res=>{
        if(res&&res.code==200){
          this.addressList = res.data
        }else{this.$message.error(res.msg)}
      })
    },
    save_invoice(){
      this.isData_4=!this.isData_4
      if(!this.isData_4){
        this.loading_invoice = true
        this.$post('home/member/invoiceSet',this.data).then(res=>{
          if(res&&res.code==200){
            this.$message.success(res.msg)
            this.loading_invoice = false
          }else{
            this.$message.error(res.msg)
            this.loading_invoice = false
          }
        }).catch(res=>{this.loading_invoice = false})
      }
    },
    onSelected(data){
      this.addressForm.province_name = data.province.value
      this.addressForm.city_name = data.city.value
      this.addressForm.area_name = data.area.value
    },
    add_address(){
      // this.$post('home/provinceList').then(res=>{
      //   if(res&&res.code==200){
      //     this.provinceList = res.data
      //     this.addressForm = {
      //       username:'',
      //       mobile:'',
      //       province_name:'',
      //       city_name:'',
      //       area_name:'',
      //       address:''
      //     }
      //     this.dialogAddress = true
      //   }
      // })
      this.dialogAddress = true
      setTimeout(()=>{
        this.$refs.child_address.fetach()
      })
    },
    edit_address(item){
      this.dialogAddress = true
      setTimeout(()=>{
        this.$refs.child_address.fetach(item)
      })
    },
    submitForm(a){
      this.$refs[a].validate((val)=>{
        if(val){
          this.loading_address = true
          this.$post('home/member/'+(this.addressForm.address_id?'updateAddress':'subAddress'),this.addressForm).then(res=>{
            if(res&&res.code==200){
              this.$message.success(res.msg)
              this.loading_address = false
              this.$refs[a].resetFields();
              this.dialogAddress = false
              this.fetach_address()
            }else{
              this.loading_address = false
              this.$message.error(res.msg)
            }
          }).catch(err=>{this.loading_address = false})
        }else{return false;}
      })
    },
    cancel_address(){
      this.dialogAddress = false
      this.fetach_address()
    },
    del_address(item){
      this.$confirm('确定删除该地址?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        var obj = {
          address_id:item.id
        }
        this.$post('home/member/delAddress',obj).then(res=>{
          if(res&&res.code==200){
            this.$message.success(res.msg)
            this.fetach_address()
          }else{
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          offset:'50',
          message: '已取消'
        })
      })
    },
    provinceChange(data){
      if(!data){
        this.areaList = []
        this.cityList = []
        this.addressForm.city_name = ''
        this.addressForm.area_name = ''
      }
      var obj = {
        name:data
      }
      this.$post('home/getChildRegion',obj).then(res=>{
        if(res&&res.code==200){
          this.cityList = res.data
        }
      })
    },
    cityChange(data){
      var obj = {
        name:data
      }
      if(!data){
        this.areaList = []
        this.addressForm.area_name = ''
      }
      this.$post('home/getChildRegion',obj).then(res=>{
        if(res&&res.code==200){
          this.areaList = res.data
        }
      })
    }
  }
}
</script>