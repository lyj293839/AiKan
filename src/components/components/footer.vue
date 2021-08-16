<style scoped>
.footer{background: #EEEEEE;font-size: 13px;text-align: left;padding: 30px 0px;}
.footer ul{display: flex;align-items: center;justify-content: space-between;}
.footer ul li{color: #14398F;cursor: pointer;}
.footer .el-col{margin: 10px 0px;}
.footer .el-col a{text-decoration: none;color: #14398F;}
</style>
<template>
    <div class='footer'>
      <div class="main">
        <el-row>
          <el-col :span="8"><span>公司名称：江苏艾康生物医药研发有限公司</span></el-col>
          <el-col :span="8"><span>公司电话：025-58851090/025-58859352/025-66151770</span></el-col>
          <el-col :span="8">
            <ul>
              <li>协议条款</li>
              <li>付款方式</li>
              <li>发货方式</li>
              <li>大包装询价</li>
            </ul>
          </el-col>
          <el-col :span="8"><span>公司地址：江苏省南京市浦口区星火路17号中建环球大厦11楼</span></el-col>
          <el-col :span="8"><span>联系邮箱：sales01@aikonchem.com</span></el-col>
          <el-col :span="24"><span>©版权所有 Copyright(C)2009-2021 江苏艾康生物医药研发有限公司
            <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">苏ICP备15058685号-2</a></span>
          </el-col>
        </el-row>
      </div>
    </div>
</template>