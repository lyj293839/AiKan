<style scoped>
.bill /deep/ .el-form-item {margin-bottom: 20px;text-align: left;}
.bill /deep/ .el-form-item .el-form-item__label{padding: 0px;}
.bill /deep/ .el-form .el-radio-group .el-radio-button{border: 1px solid #DDDDDD;margin-right: 10px;}
.bill /deep/ .el-form .el-radio-group .el-radio-button__inner{border: none;background: white;font-size: 16px;border-radius:0px;}
</style>
<template>
<div class="bill">
    <el-form label-position="top" label-width="100px" ref="Form" :model="formData" :rules="rules1">
        <el-row type="flex" justify="space-between">
            <el-col :span="11">
                <el-form-item label="类型" required>
                    <el-select v-model="type" placeholder="请选择" style="width:100%;" @change="type_change()">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="接收邮箱" prop='email'>
                    <el-input v-model="formData.email" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="发票税号" prop='duty_paragraph'>
            <el-input v-model="formData.duty_paragraph" placeholder="请输入内容"></el-input>
        </el-form-item>
        <div v-if="type==1">
            <el-form-item label="发票抬头" prop='rise'>
                <el-input v-model="formData.rise" placeholder="请输入内容"></el-input>
            </el-form-item>
        </div>
        <div v-else>
            <el-form-item label="开户银行" prop='open_bank'>
                <el-input v-model="formData.open_bank" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="开户账号" prop='bank_no'>
                <el-input v-model="formData.bank_no" placeholder="请输入内容"></el-input>
            </el-form-item>
        </div>
        <el-form-item label="详细街道" prop='address'>
            <el-input v-model="formData.address" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right;">
            <el-button type="primary" class="button-primary" size="small" :loading="loading_bill" @click="save('Form')">确定</el-button>
            <el-button size="small" class="button-plain" @click="close()">取消</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
import {isPhone} from "../../../common/rule";
export default {
  data() {
    var riseCheck = (rule, value, callback) => {
      if (!value&&this.type==1) {
        callback(new Error('发票抬头不能为空'));
      } else {
        callback();
      }
    };
    var open_bankCheck = (rule, value, callback) => {
      if (!value&&this.type==2) {
        callback(new Error('开户银行不能为空'));
      } else {
        callback();
      }
    };
    var bank_noCheck = (rule, value, callback) => {
      if (!value&&this.type==2) {
        callback(new Error('开户账号不能为空'));
      } else {
        callback();
      }
    };
    var registerCheck = (rule, value, callback) => {
      if (!value&&this.type==2) {
        callback(new Error('企业注册地址不能为空'));
      } else {
        callback();
      }
    };
    return {
        loading:false,
        formData:{
            email:'',
            duty_paragraph:'',
            province_id:'',
            city_id:'',
            area_id:'',
            mobile :'',
            address:'',
            open_bank:'',
            bank_no:'',
            rise:'',
        },
        options:[
            {label:'普通发票',value:1},
            {label:'增值税专用发票',value:2}
        ],
        loading_bill:false,
        type:1,
        rules1:{
            email:[
              { required: true, message: "邮箱不能为空", trigger: 'blur'},
            ],
            duty_paragraph:[
            { required: true, message: "发票税号不能为空", trigger: 'blur'},
            ],
            rise:[
            { required: true,validator: riseCheck, trigger: 'blur'},
            ],
            open_bank:[
            { required: true,validator: open_bankCheck, trigger: 'blur'},
            ],
            bank_no:[
            { required: true,validator: bank_noCheck, trigger: 'blur'},
            ],
            address:[
            { required: true, message: "地址不能为空", trigger: 'blur'},
            ],
        }
    };
  },
  created() {
    this.fetach()
  },
  methods: {
    fetach(a){
      if(a){
        this.formData = a
      }else{
        this.formData={
            email:'',
            duty_paragraph:'',
            province_id:'',
            city_id:'',
            area_id:'',
            mobile :'',
            address:'',
            open_bank:'',
            bank_no:'',
            rise:'',
        }
      }
    },
    type_change(){
      this.$refs['Form'].clearValidate();
    },
    save(a){
      this.$refs[a].validate((val)=>{
        if(val){
          this.loading_bill = true
          this.formData.type = this.type
          this.$post('home/member/invoiceSet',this.formData).then(res=>{
            if(res&&res.code==200){
              this.$message.success(res.msg)
              this.loading_bill = false
              this.$refs[a].resetFields();
              // this.$parent.cancel_address()
              this.$parent.$parent.cancel_bill()
            }else{
              this.loading_bill = false
              this.$message.error(res.msg)
            }
          }).catch(err=>{this.loading_bill = false})
        }else{return false;}
      })
    },
    close(){
      this.$refs['Form'].resetFields();
      this.$parent.$parent.dialogBill = false
    }
  }
};
</script>
