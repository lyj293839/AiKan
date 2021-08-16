<style scoped>
.font{font-size: 20px;color: #27282C;margin: 15px 0px;text-align: left;}
.el-table .el-button{font-size: 14px;color: #153A90;}
.el-table /deep/ .el-table__header th{color: #27282C;font-size: 15px;}
.total{padding: 10px 15px;background: #E9EDF5;color: #FF0000;font-size: 21px;text-align: right;}
.total ul{display: flex;justify-content: flex-end;align-items: flex-end;margin-top: 10px;}
.total ul li{margin-left: 20px;color: #27282C;font-size: 13px;}
.total ul .el-button{background: #E90026;border-color: #E90026;width: 138px;}
</style>
<template>
  <div class="main">
    <div class="font">购物车</div>
    <div style="min-height:300px;">
    <div v-if="list.total>0">
      <el-table
        :data="list.list"
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        style="width: 100%;min-height:300px;">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column label="商品信息" align="left" width="250">
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
                <el-input-number v-model="scope.row.num" style="width:100%;" size="mini" :min="1" @change="num_change(scope.row)"></el-input-number>
            </template>
        </el-table-column>
        <el-table-column label="总价" align="center">
            <template slot-scope="scope">{{(Number(scope.row.price)*Number(scope.row.num)).toFixed(2)}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
                <el-button type="text" @click="cancel(scope.row.cart_id)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <div style="display:flex;justify-content: space-between;align-items: center;">
        <el-button plain class="button-plain" style="color:red !important;border-color:red !important;" size="small" @click="cancel()">删除商品</el-button>
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
    <div v-else>
      <img src="@/assets/image/nodata.png" width="200" height="200">
      <div style="color:#153A90;font-size:20px;text-align:center;margin-top:-20px;"><b>暂无内容</b></div>
    </div>
    </div>
    <div class="total">
        <div>总金额：￥{{total_money}}</div>
        <ul>
            <li>商品总价：￥{{total_money_a}}</li>
            <li><el-button type="primary" @click="to_settle()">结算</el-button></li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'prod_goods',
  data () {
    return {
      list:{list:[]},
      queryList:{
        page:1,
      },
      currentPage:1,
      total_money:0,
      total_money_a:0,
      ids:[],
      val:[]
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData(){
      this.$post('home/member/cartList',this.queryList).then(res=>{
        if(res&&res.code==200){
          this.list = res.data
          // if(this.$route.params.go_settle){
          //   // res.data.list.forEach(i=>{
          //   //   this.$refs.multipleTable.toggleRowSelection(i);
          //   // })
          // }
          this.num_change()
        }else{this.$message.error(res.msg)}
      })
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    num_change(item){
      this.total_money_a = 0
      this.$nextTick(()=>{
        this.list.list.forEach(i=>{
          this.total_money_a+=Number(Number(i.price)*Number(i.num).toFixed(2))
        })
      })
      this.total_money = 0
      this.val.forEach(i=>{
        this.ids.push(i.cart_id)
        this.total_money +=Number(Number(i.price)*Number(i.num).toFixed(2))
      })
    },
    handleSelectionChange(val) {
      this.ids = []
      this.val = val
      this.total_money = 0
      val.forEach(i=>{
        this.ids.push(i.cart_id)
        this.total_money +=Number(Number(i.price)*Number(i.num).toFixed(2))
      })
    },
    cancel(id){
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(id){
          var obj = {
            ids:JSON.stringify(id)
          }
        }else{
          var obj = {
            ids:this.ids.join()
          }
        }
        this.$post('home/member/delCart',obj).then(res=>{
          if(res&&res.code==200){
            this.$message.success(res.msg)
            this.fetchData()
          }else{
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    to_settle(){
      if(this.val.length>0){
        localStorage.setItem('settleShop',JSON.stringify(this.val))
        this.$router.push({
          path: '/prod_settle',
          name:'prod_settle'
        });
      }else{
        this.$message.error('请选择需要结算的产品规格')
      }
    },
  }
}
</script>