<style scoped>
.el-form /deep/ .el-form-item__content{line-height: normal;}
.el-col{margin: 5px 0px;}
</style>
<template>
  <div>
    <el-form :model='FormData' :rules="rules_a" ref="Form">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <el-input v-model="FormData.prod_name" placeholder="请输入内容" class="input_prefix" disabled>
              <span slot="prefix" class="tip">产品名称</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="cas">
            <el-input v-model="FormData.cas" placeholder="请输入内容" class="input_prefix" disabled>
              <span slot="prefix" class="tip">Cas<span>*</span></span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-input v-model="FormData.remarks" placeholder="请输入内容" class="input_prefix">
              <span slot="prefix" class="tip">特殊备注</span>
            </el-input>
          </el-form-item>
        </el-col>
        <div v-for="(item,index) in FormData.specification">
          <el-col :span="12">
            <el-form-item prop="num">
              <el-input v-model.number="item.num" placeholder="请输入内容" class="input_prefix" style="width:59%;">
                <span slot="prefix" class="tip">数量<span>*</span></span>
              </el-input>
              <el-select v-model="item.unit" placeholder="请选择"  style="width:39%;">
                <el-option
                    v-for="item in options"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="purity">
              <el-input v-model="item.purity" placeholder="请输入内容" class="input_prefix">
                <span slot="prefix" class="tip">纯度<span>*</span></span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" >
            <el-button v-if="index==0" type="primary"  class="button-primary" style="width:100%;" @click="add()">添加</el-button>
            <el-button v-else type="danger"  style="width:100%;" @click="cancel(index)">删除</el-button>
          </el-col>
        </div>
        <el-col :span="24">
          <el-button type="primary"  class="button-primary" style="width:50%;" @click="sure('Form')">提交</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      FormData:{
        prod_name:'',
        id:'',
        specification:[{
          purity:'',
          num:'',
          unit:''
        }],
        cas:'',
        remarks:'',
      },
      options:[
        'kg','g','mg'
      ],
      rules_a: {
        // purity: [
        //   {required: true, message: '请输入纯度', trigger: 'blur' }
        // ],
        cas: [
          {required: true, message: '请输入cas', trigger: 'blur' }
        ],
        // num: [
        //   {required: true, validator: validateNum, trigger: 'blur' }
        // ],
      }
    }
  },
  props:['data_prod'],
  created() {
    this.fetach()
  },
  methods: {
    fetach(){
      this.FormData={
        prod_name:this.data_prod.name,
        prod_id:this.data_prod.id,
        specification:[{
          purity:'',
          num:'',
          unit:''
        }],
        cas:this.data_prod.cas,
        remarks:'',
      }
      this.$refs['Form'].resetFields();
    },
    sure(a){
      this.$refs[a].validate((val)=>{
        if(val){
          var obj = JSON.parse(JSON.stringify(this.FormData))
          obj.specification = JSON.stringify(obj.specification)
          this.$post('home/member/addInquiry',obj).then(res=>{
            if(res&&res.code==200){
              this.$message.success(res.msg)
              this.$parent.$parent.close_enquiry()
              this.$parent.$parent.fetchData()
            }else{this.$message.error(res.msg)}
          })
        }else{return false;}
      })
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