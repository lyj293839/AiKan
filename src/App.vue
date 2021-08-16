<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      time:'',
      num:0,
      get_time:''
    }
  },
  watch: {
    $route(to,from){
      this.$All.title_change(to.meta)
    }
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.leaveConfirm)
  },
  mounted(){
        document.getElementById('app').style.display = 'block';
        document.getElementById('appLoading').style.display = 'none';
  },
  created () {
    window.addEventListener('beforeunload', this.leaveConfirm)
    window.document.title = sessionStorage.getItem('title')?sessionStorage.getItem('title'):'江苏艾康'
    // this.time_data()
    // this.get_time = setInterval(()=>{
    //   this.getTime()
    // },1000)
    this.initWebSocket()
  },
  methods: {
    leaveConfirm (e) {
      // clearInterval(this.get_time);
      // this.get_time = 0
      localStorage.removeItem('sever-time')
    },
    time_data(){
      // this.$post('getTime').then(code=>{
      //   if(code&&code.code==200){
      //     localStorage.setItem('sever-time',code.data.time)
      //   }else{
      //     clearInterval(this.get_time);
      //     this.get_time = 0
      //   }
      // })
    },
    getTime(){
      // var time =parseInt(localStorage.getItem('sever-time'))
      // if(time==0||!time){
      //   this.time_data()
      // }else{
      //   localStorage.setItem('sever-time',time+1)
      // }
    },
    fetach(){
      this.$post('home/member/memberInfo').then(res=>{
        if(res&&res.code==200){
          // this.userData  = res.data
          localStorage.setItem('userInfo',JSON.stringify(res.data))
          this.$root.userInfo = res.data
        }else{this.$message.error(res.msg)}
      })
    },
    doSend() {
      var time = Date.parse(new Date()); //当前时间戳
      let data = {
        time
      };
      data = JSON.stringify(data);
      this.websocket.send(data);
    },
    is_websocked_send(){
        setTimeout(()=>{
          this.initWebSocket()
        },this.num*1000)
    },
    initWebSocket() {
      if(!JSON.parse(localStorage.getItem('socket_id'))){
        var mydate = new Date()
        this.socket_id = mydate.getDay()+ mydate.getHours()+ mydate.getMinutes()+mydate.getSeconds()+mydate.getMilliseconds()+ Math.round(Math.random() * 10000)
        localStorage.setItem('socket_id',this.socket_id)
      }else{
        this.socket_id = JSON.parse(localStorage.getItem('socket_id'))
      }
      // console.log(this.socket_id)
      var url = process.env.API_BASEURL.replace('http','ws')
      const wsurl = url+'ws?socket_id='+this.socket_id+'&user_token='+localStorage.getItem('token');
      // const wsurl = "ws://192.168.31.59/ws?socket_id="+this.socket_id+'&user_token='+localStorage.getItem('token'); //ws 相当于http 而wss 相当于https 
      this.websocket = new WebSocket(wsurl); //实例对象
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onclose = this.websocketclose;
    },
    websocketonopen() {
      console.log("连接建立成功");
      this.num = 0
      this.timer = setInterval(() => {
        this.doSend();
      }, 60000);
    },
    websocketsend() {
      console.log("向后端发送数据");
      var time = Date.parse(new Date()); //当前时间戳
      let data = {
        time
      };
      data = JSON.stringify(data);
      this.websocket.send(data); 
    },
    websocketonmessage(e) {
      // console.log("接收后端返回数据", e);
      let data=""
      let that = this
      var reader = new FileReader();
        reader.onload = () => {
          data=JSON.parse(reader.result)
          if(data.event== "registered"){
            localStorage.setItem('wx_id',data.data.wx_id)
            that.$router.push({
              path: '/register',
              name:'register',
              params:{
                is_ban:true
              }
            });
          }else if(data.event== "login"){
            localStorage.setItem('token',data.data.userToken)
            that.$router.push({
              path: '/personal_order',
              name:'personal_order'
            });
          }else if(data.event== "member_info"){
            this.fetach()
          }else if(data.event== "orderInfo"){
            this.$message.success('支付成功')
            this.$router.push({
              path: '/personal_order_detail',
              name:'personal_order_detail',
              query:{
                order_sn:data.data
              }
            });
          }
        };
        reader.readAsText(e.data)
    },
    websocketonerror() {
      // console.log('WebSocket连接发生错误')
    },
    websocketclose(e) {
      console.log("websocket断开连接", e);
      this.websocket.close(); //离开路由之后断开websocket连接
      clearInterval(this.timer); //把定时器清掉
      this.timer = 0
      this.num++
      if(this.num<=5){
        this.is_websocked_send()
      }
      // localStorage.removeItem('socket_id')
      this.$cookies.remove('socket_url')
    }
  }
}
</script>

<style>
#app {
  font-family:'Microsoft YaHei','苹方';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main{width: 1200px;margin: 0px auto;color: #333333;}
ul{margin: 0px;padding: 0px;list-style: none;}
.select{text-align: center;font-size: 24px;font-weight: bold;color: #333333;margin-bottom: 30px;}
/* banner 标题 */
.banner_div{position: relative;display: flex;align-items: center;justify-content: center;}
.banner_div .banner_title{position: absolute;color: white;font-size: 33px;font-weight: bold;}
/* 标题下划线 */
.under{display: flex;align-items: center;justify-content: center;margin-top: 10px;}
.under-border{border: 2px solid #707070;width: 120px;}
.under-middle{height: 25px;width: 25px;background: #14398F;margin: 0px 5px;}
/* 产品列表 */
.prod_content {display: flex;align-items: center;flex-wrap: wrap;}
.prod_content li{border: 1px solid #E6E6E6;width: 222px;height: 335px;margin: 0px 8px; margin-top: 15px;text-align: left;cursor: pointer;position: relative;}
.prod_content li:hover{box-shadow: 2px 2px 8px #9c9c9c;}
.prod_content li div{margin-bottom: 7px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.prod_content .text{display: flex;align-items: center;justify-content: space-between;}
.prod_content .font1{font-size: 16px;color:#102141;}
.prod_content .font2{font-size: 14px;color:#999999;}
.prod_content .font3{font-size: 14px;color:#777777;}
.prod_content .font4{font-size: 14px;color:#E61A12;}
.prod_content .font5{font-size: 13px;color:#102141;}
/* 分页 */
.el_pagination{text-align: right;margin: 15px 0px;}
.el_pagination .el-pager li{background-color: white !important;border: 1px solid #14398F !important;}
.el_pagination .el-pager li:not(.disabled).active{background-color:#14398F !important;}
/* 标签页 */
.el_tabs .el-tabs__item.is-active{color:#14398F !important;}
.el_tabs .el-tabs__active-bar{background-color:#14398F;}
/* 勾选框 */
.el-checkbox__inner:hover{border-color: #14398F !important;}
.is-checked .el-checkbox__inner{background: #14398F !important;border-color: #14398F !important;}
.is-checked .el-checkbox__label{color: #14398F !important;}
/* 按钮 */
.button-primary{background-color: #14398F !important;border-color: #14398F !important;}
.button-plain{color: #14398F !important;border-color: #14398F !important;background-color: transparent !important;}
/* input 头部标签 */
.input_prefix .el-input__prefix{top: -10px;left: 20px;height: 0px;}
.input_prefix .tip{background: white;padding: 0px 5px;color: #14398F !important;}
.input_prefix .tip span{color: red;font-size: 12px;}
.input_prefix .el-input__inner{padding: 0px 15px !important;}
</style>
