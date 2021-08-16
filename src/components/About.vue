<style scoped>
.breadcrumb{font-size: 12px;color: #666666;text-align: left;padding: 10px 0px;position: relative;}
.breadcrumb ul{display: flex;align-items: center;position: absolute;right: 0px;top: -100%;}
.breadcrumb ul li{margin-left: 20px;width: 194px;height: 119px;}
.introduce{text-align: left;margin-top: 100px;color: #333333;}
.introduce .title_left{border-left: 10px solid #14398F;padding: 10px 20px;font-size: 16px;}
.introduce .title_left div{font-size: 32px;line-height: 52px;}
.introduce .content_right{padding-top: 20px;font-size: 18px;}
.icon{position: relative;}
.icon .list{display: flex;align-items: center;text-align: left;margin: 25px 0px;}
.icon .list img{margin-right:10px;}
.icon .font1{color: #333333;font-size: 16px;line-height: 30px;}
.icon .font2{color: #666666;font-size: 12px;}
.address{font-size: 18px;color: #333333;text-align: right;}
</style>
<template>
  <div>
    <div class="banner_div">
        <img src="@/assets/image/组 3698@2x.png" width="100%">
      <div class="banner_title">
        <div>ABOUT&nbsp;&nbsp;&nbsp;AIKON&nbsp;&nbsp;&nbsp;&nbsp;关于艾康</div>
      </div>
    </div>
    <div class="main">
      <div class="breadcrumb">
        首页-<span style="color:#102141;">关于艾康</span>
        <ul>
          <li><img src="@/assets/image/308708449@2x.png" width="100%"></li>
          <li><img src="@/assets/image/310739312@2x.png" width="100%"></li>
          <li><img src="@/assets/image/167621689@2x.png" width="100%"></li>
        </ul> 
      </div>
      <div class="introduce">
        <el-row>
          <el-col :span="9">
            <div class="title_left">
              <div>专业领先，值得信赖</div> 
              <span>Professional leading, trustworthy</span>
            </div>
          </el-col>
          <el-col :span="15">
            <div class='content_right'>
                <span style="color:#E61A12;">江苏艾康生物医药研发有限公司</span>，于2009年成立于“六朝古都”—南京。
                江苏艾康致力于为医药研发领域提供高质量服务，我们提供5万余种库存化合物保证快速发货时效，并提供多品类合成定制服务，
                分析检测中心完备的检测设备和技术也为我们的产品质量提供了保证。
                产品主要覆盖：有机合成砌块，药物中间体、普通化学试剂以及特殊化学品，可提供从mg到kg级标准包装满足客户需求。
                公司优势产品包括特色杂环化合物、PEG类化合物、含氟化合物、手性化合物、氨基酸及其衍生物、硼酸及其衍生物等。
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="background:#F6F6F6;margin:80px 0px 120px 0px;">
      <div class="main">
        <el-row class="icon">
            <el-col :span="9">
              &nbsp;
              <div style="width:341px;height:476px;position: absolute;top:50%;transform:translateY(-50%);">
                <img src="@/assets/image/107864277@2x.png" width="100%">
              </div>
            </el-col>
            <el-col :span="15">
                <el-row>
                    <el-col :span="12">
                        <div class="list">
                            <img src="@/assets/image/组 3699@2x.png" width="100">
                            <div>
                                <div class="font1">公司愿景</div>
                                <div class="font2">科学的管理体系，精细化生产，技术领先行业</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="list">
                            <img src="@/assets/image/组 3699@2x.png" width="100">
                            <div>
                                <div class="font1">严谨服务</div>
                                <div class="font2">为企业带来实际利益的产业相关服务</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="list">
                            <img src="@/assets/image/组 3701@2x.png" width="100">
                            <div>
                                <div class="font1">使命责任</div>
                                <div class="font2">为企业提供一站式服务模式，助力发展</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="list">
                            <img src="@/assets/image/组 3701@2x.png" width="100">
                            <div>
                                <div class="font1">核心价值观</div>
                                <div class="font2">客户导向 以人为本严谨务实 积极进取</div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
      </div>
    </div>
    <div class="main" style="margin-bottom:20px;">
        <div class="select">
            <div>我们在</div>
            <div class="under">
                <div class="under-border"></div>
                <div class="under-middle"></div>
                <div class="under-border"></div>
            </div>
        </div>
        <iframe src="static/map/index.html" scrolling="no" width="1200px" height="457px" class="iframe" frameborder="0"></iframe>
        <div class="address">江苏省 南京市 浦口区 星火路17号 中建环球大厦11楼</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'about',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>