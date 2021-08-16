<style scoped>

</style>
<template>
<div>
    <el-form :model="addressForm" :rules="rules" ref="ruleForm" label-position="top" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名" prop="username">
          <el-input v-model="addressForm.username" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="mobile">
          <el-input v-model="addressForm.mobile" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-form-item label="联系邮箱" prop="email">
        <el-input v-model="addressForm.email" size="small"></el-input>
        </el-form-item>
        <el-form-item label="省.市.区" prop="province_name">
        <!-- <v-distpicker :province="addressForm.province_name" :city="addressForm.city_name" :area="addressForm.area_name" @selected="onSelected"></v-distpicker> -->
        <el-row :gutter="10">
            <el-col :span="8">
            <el-select v-model="addressForm.province_name" placeholder="请选择省" size="small" @change="provinceChange" clearable>
                <el-option
                v-for="item in provinceList"
                :key="item.name"
                :label="item.name"
                :value="item.name">
                </el-option>
            </el-select>
            </el-col>
            <el-col :span="8">
            <el-select v-model="addressForm.city_name" placeholder="请选择市" size="small" @change="cityChange" clearable>
                <el-option
                v-for="item in cityList"
                :key="item.name"
                :label="item.name"
                :value="item.name">
                </el-option>
            </el-select>
            </el-col>
            <el-col :span="8">
            <el-select v-model="addressForm.area_name" placeholder="请选择区" size="small" clearable>
                <el-option
                v-for="item in areaList"
                :key="item.name"
                :label="item.name"
                :value="item.name">
                </el-option>
            </el-select>
            </el-col>
        </el-row>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
        <el-input type="textarea" v-model="addressForm.address" size="small"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right;">
        <el-button type="primary" class="button-primary" size="small" :loading="loading_address" @click="submitForm('ruleForm')">确定</el-button>
        <el-button size="small" class="button-plain" @click="cancel()">取消</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
import {isPhone} from "../../../common/rule";
export default {
  data() {
    var validateAddress = (rule, value, callback) => {
        if (!value||!this.addressForm.city_name||!this.addressForm.area_name) {
          callback(new Error('请选择完详细地址'));
        } else {
          callback();
        }
    };
    return {
      addressForm:{
        username:'',
        mobile:'',
        email:'',
        province_name:'',
        city_name:'',
        area_name:'',
        address:''
      },
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
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        province_name: [
          { required: true, validator: validateAddress, trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
      } 
    };
  },
  created() {
    this.fetach()
  },
  methods: {
    fetach(a){
      this.$post('home/provinceList').then(res=>{
        if(res&&res.code==200){
          this.provinceList = res.data
          if(a){
            this.addressForm = a
            this.addressForm['address_id'] = a.id
            if(this.addressForm.province_name){
              this.provinceChange(this.addressForm.province_name)
            }
            if(this.addressForm.city_name){
              this.cityChange(this.addressForm.city_name)
            }
          }else{
            this.addressForm = {
              username:this.$root.userInfo.username,
              mobile:this.$root.userInfo.mobile,
              email:'',
              province_name:'',
              city_name:'',
              area_name:'',
              address:''
            }
          }
        }
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
              // this.$parent.cancel_address()
              this.$parent.$parent.cancel_address()
            }else{
              this.loading_address = false
              this.$message.error(res.msg)
            }
          }).catch(err=>{this.loading_address = false})
        }else{return false;}
      })
    },
    cancel(){
      this.$refs['ruleForm'].resetFields();
      this.$parent.$parent.dialogAddress = false
    },
    provinceChange(data){
      if(!data){
        this.areaList = []
        this.cityList = []
      }
      this.addressForm.city_name = ''
      this.addressForm.area_name = ''
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
      }
      this.addressForm.area_name = ''
      this.$post('home/getChildRegion',obj).then(res=>{
        if(res&&res.code==200){
          this.areaList = res.data
        }
      })
    }
  }
};
</script>
