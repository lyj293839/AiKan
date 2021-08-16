<style scoped>
.el-table /deep/ .el-table__header th{background: #E9EDF5 !important;color: #333333;font-size: 16px;font-weight: normal;}
.el-table .el-button{color: #153A90;font-size: 14px;}
</style>
<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;min-height:500px;">
      <el-table-column label="订单编号" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#14398F;">AK1505d15</span>
          </template>
      </el-table-column>
      <el-table-column label="订单商品" align="center">
          <template slot-scope="scope">
            <span style="color:#102141;">6-甲氧基-异吲哚啉-1-酮</span>
          </template>
      </el-table-column>
      <el-table-column label="下单时间" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#999999;">2021-09-03</span>
          </template>
      </el-table-column>
      <el-table-column label="发货状态" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#102141;">已发货</span>
          </template>
      </el-table-column>
      <el-table-column label="相关文件" align="center">
          <template slot-scope="scope">
            <span style="color:#999999;">{{scope.row.num}}</span>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'personal_download',
  data () {
    return {
      list:[
        // {g:'AK1505d15',num:1},
        // {g:'0.1g',num:1},
        // {g:'0.1g',num:1},
        // {g:'0.1g',num:1},
        // {g:'0.1g',num:1}
      ],
    }
  },
  methods: {
  }
}
</script>