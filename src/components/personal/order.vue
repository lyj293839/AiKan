<style scoped>
.table_a /deep/ .el-table__header th{background: #E9EDF5 !important;color: #333333;font-size: 16px;font-weight: normal;}
.table_a .el-button{color: #153A90;font-size: 14px;}
.el_dialog /deep/ .el-dialog__header{display: none;}
.el_dialog .el-form-item{margin-bottom: 0px;}
.dialog-footer{text-align: center;}
.dialog-footer .el-button{width: 100px;}
table {border-collapse: collapse;width: 100%;line-height: 20px;}
.active th{background: #E9EDF5 !important;text-align: center;}
.active td{text-align: center !important;}
</style>
<template>
  <div style="padding-bottom:10px;">
    <el-table
      :data="list.list"
      class="table_a"
      style="width: 100%;min-height:300px;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <table border="1" bordercolor="#EBEEF5" class="active">
            <tr>
              <th>cas</th>
              <th>规格</th>
              <th>纯度</th>
              <th>数量</th>
              <th>原价</th>
              <th>折扣</th>
              <th>实付价格</th>
            </tr>
            <tr v-for="item in props.row.child_order">
              <td>{{item.cas}}</td>
              <td>{{item.pack}}</td>
              <td>{{item.purity}}</td>
              <td>{{item.num}}</td>
              <td>¥{{item.price}}</td>
              <td>{{item.discount?item.discount:'--'}}</td>
              <td>¥{{Number(item.discount?item.discount:1)*Number(item.price)}}</td>
            </tr>
            <tr>
              <th colspan="5"></th>
              <th>合计：</th>
              <th>¥{{props.row.total_money}}</th>
            </tr>
          </table>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" align="center" width="200">
          <template slot-scope="scope">
            <span style="color:#14398F;cursor: pointer;" @click="to_detail(scope.row)">{{scope.row.order_sn}}</span>
          </template>
      </el-table-column>
      <el-table-column label="订单商品" align="left">
          <template slot-scope="scope">
            <div style="display:flex;align-items: center;color:#102141;">
              <img :src="scope.row.child_order[0].prod_img" width="50" height="50" @error="$All.defImg" style="margin-right:5px;">
              <div>{{scope.row.child_order[0].prod_name}}</div>
            </div>
          </template>
      </el-table-column>
      <el-table-column label="订单总金额" align="center" width="150">
          <template slot-scope="scope">
            <span>¥{{scope.row.total_money}}</span>
          </template>
      </el-table-column>
      <el-table-column label="下单时间" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#999999;">{{scope.row.create_time.trim().split(" ")[0]}}</span>
          </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" width="150">
          <template slot-scope="scope">
            <span style="color:#999999;">
              <span v-if="scope.row.order_status==1">
                <span v-if="new Date(scope.row.end_time) - new Date()<0">
                  待支付
                </span>
                <span v-else>
                  <span v-if="scope.row.time.m=='00'&&scope.row.time.s=='00'" style="color:red;">
                    已取消
                  </span>
                  <span v-else>
                    待支付 <br>
                    {{scope.row.time.h+'时' + scope.row.time.m+'分'+scope.row.time.s +'秒'}}
                  </span>
                </span>
              </span>
              <span v-else-if="scope.row.order_status==2" style="color:red;">已取消</span>
              <span v-else-if="scope.row.order_status==3">待发货</span>
              <span v-else-if="scope.row.order_status==4">
                <el-popover
                  placement="top-start"
                  title="标题"
                  width="400"
                  trigger="hover">
                    <el-form label-width="100px">
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label="已发货量:">
                            <el-input v-model="scope.row.id" size="mini" disabled></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="配送方式:">
                            <el-input v-model="scope.row.id" size="mini" disabled></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="发运日期:">
                            <el-input v-model="scope.row.id" size="mini" disabled></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="物流信息:">
                            <el-input v-model="scope.row.id" size="mini" disabled></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="运单编号:">
                            <el-input v-model="scope.row.id" size="mini" disabled></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="发货备注:">
                            <el-input v-model="scope.row.id" type="textarea" :rows="2" size="mini" disabled></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  <el-button slot="reference" type="text">已发货</el-button>
                </el-popover>
              </span>
              <span v-else-if="scope.row.order_status==5">已完成</span>
              <span v-else>--</span>
            </span>
          </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.pay_status===0 && scope.row.order_status==1">
              <span v-if="new Date(scope.row.end_time) - new Date()<0">
                <el-button type="text"  @click="to_pay(scope.row)">立即支付</el-button>
                <!-- <span>--</span> -->
              </span>
              <span v-else>
                <span v-if="scope.row.time.m=='00'&&scope.row.time.s=='00'" style="color:red;">
                  --
                </span>
                <span v-else>
                  <el-button type="text"  @click="to_pay(scope.row)">立即支付</el-button>
                </span>
              </span>
            </span>
            <span v-else>--</span><br>
            <el-button type="text" style="color:#909399;" v-if="scope.row.invoice_info" @click="see_invoice(scope.row)">查看发票</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        medium 
        class="el_pagination"
        layout="prev, pager, next"
        :page-size="$root.pageSize"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :total="list.total">
    </el-pagination>

    <el-dialog :visible.sync="dialogbill" width="500px" class='el_dialog'>
      <el-form label-position="left" label-width="100px" :model="formData">
        <el-form-item label="接收邮箱:">
          {{formData.email}}
        </el-form-item>
        <el-form-item label="发票税号:" prop='duty_paragraph'>
          {{formData.duty_paragraph}}
        </el-form-item>
        <div v-if="formData.invoice_type==1">
            <el-form-item label="发票抬头:" prop='rise'>
              {{formData.rise}}
            </el-form-item>
        </div>
        <div v-else>
            <el-form-item label="开户银行:" prop='open_bank'>
              {{formData.open_bank}}
            </el-form-item>
            <el-form-item label="开户账号:" prop='bank_no'>
              {{formData.bank_no}}
            </el-form-item>
        </div>
        <el-form-item label="详细街道:" prop='address'>
          {{formData.address}}
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="primary" class="button-primary" size="small" @click="dialogbill = false">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- <el-dialog :visible.sync="dialogEnquiry" width="1000px" class='el_dialog'>
      <el-table
        :data="list_a"
        >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="产品名称" align="center">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <img src="@/assets/image/prod.png" width="76" height="76">
                {{scope.row.name}}
              </div>
            </template>
        </el-table-column>
        <el-table-column label="下单金额" align="center" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.g}}</span>
            </template>
        </el-table-column>
        <el-table-column label="下单数量" align="center" width="150">
            <template slot-scope="scope">{{scope.row.g}}</template>
        </el-table-column>
        <el-table-column label="产品规格" align="center" width="150">
            <template slot-scope="scope">{{scope.row.g}}</template>
        </el-table-column>
        <el-table-column label="下单数量" align="center" width="150">
            <template slot-scope="scope">{{scope.row.g}}</template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="18">
          <el-form>
            <el-form-item label="退款事由">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>
            </el-form-item>
            <el-form-item label="客服回复">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <img src="@/assets/image/组 3706@2x.png" width="123" style="margin-top:30px;">
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEnquiry = false" size="small" plain class='button-plain'>取 消</el-button>
        <el-button type="primary" class="button-primary" @click="dialogEnquiry = false" size="small">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
export default {
  name: 'personal_order',
  data () {
    return {
      list:{list:[]},
      formData:{},
      list_a:[
        {g:'0.1g',name:'N,N,N,N-四（对氨基酸）对苯二胺'},
      ],
      currentPage:1,
      queryList:{
        page:1,
      },
      textarea:'',
      order_status:[{id:1,name:'待支付'},{id:2,name:'已取消'},{id:3,name:'待发货'},{id:4,name:'已发货'},{id:5,name:'已完成'}],
      dialogEnquiry:false,
      dialogbill:false
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData(){
      this.$post('home/member/orderList',this.queryList).then(res=>{
        if(res&&res.code==200){
          res.data.list.forEach(i=>{
            if(i.pay_status===0){
              i.time = {h: "00",m: "00",s:"00"}
              i.end_time = new Date(new Date(i.create_time).setMinutes(new Date(i.create_time).getMinutes() + 1))
              this.$All.setEndTime(i.end_time,i.time,1000)
            }
          })
          this.list = res.data
        }else{this.$message.error(res.msg)}
      })
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    see_invoice(item){
      this.formData = item.invoice_info
      this.dialogbill = true
    },
    to_pay(item){
      var order = {
        order_on:item.order_sn,
        total_money:item.total_money,
      }
      localStorage.setItem('settle_order',JSON.stringify(order))
      this.$router.push({
        path: '/prod_settle_pay',
        name:'prod_settle_pay',
      });
    },
    to_detail(item){
      this.$router.push({
        path: '/personal_order_detail',
        name:'personal_order_detail',
        query:{
          order_sn:item.order_sn
        }
      });
    }
  }
}
</script>