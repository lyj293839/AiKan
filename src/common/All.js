import ElementUI from 'element-ui'
import axios from 'axios'
const All = {}
var is = function(obj, type) {
  let className = Object.prototype.toString.call(obj).slice(8, -1)
  return obj !== undefined && obj !== null && className === type
}
All.getTime = function(){
  axios({
    methods: 'post',
    url: process.env.API_BASEURL+'getTime',
  }).then(response => {
    localStorage.setItem('sever-time',response.data.time)
  }).catch(error => {
  })
}
All.goTop= function(){
    // 回到顶部
  let top = document.documentElement.scrollTop || document.body.scrollTop;
  // 实现滚动效果 
  const timeTop = setInterval(() => {
    document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
    if (top <= 0) {
      clearInterval(timeTop);
    }
  }, 10);
}
All.title_change = function(meta){
  if(meta&&meta.title){
    window.document.title = ('江苏艾康-'+meta.title)
  }else{
    window.document.title = '江苏艾康'
  }
  sessionStorage.setItem('title',window.document.title)
}
All.getDate = function(time,is_hours){
  if(time){
    const date = new Date(time);
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    var h = date.getHours().toString()==='0'?'00':date.getHours().toString()
    var f = date.getMinutes().toString()==='0'?'00':date.getMinutes().toString()
    var s = date.getSeconds().toString()==='0'?'00':date.getSeconds().toString()
    if (m < 10) {
      m = "0" + m;
    }
    if (d < 10) {
      d = "0" + d;
    }
    if(!is_hours){
      return y+'-'+m+'-'+d
    }else{
      return y+'-'+m+'-'+d+' '+h+':'+f+':'+s
    }
  }else{
    return ''
  }
}
All.get_Verification= function(that){
  let me = that;
  me.is_send = true;
  let codeInterval = window.setInterval(function() {
    if ((me.codeTime--) <= 0) {
          me.codeTime = 59;
          me.is_send = false;
          window.clearInterval(codeInterval);
      }
  }, 1000); 
}
// All.pay_Verification= function(that){
//   let me = that;
//   let codeInterval = window.setInterval(function() {
//     if ((me.codeTime--) <= 0) {
//           me.codeTime = 59;
//           window.clearInterval(codeInterval);
//       }
//   }, 1000); 
// }
All.getEnumValue = function(enums, pid, keyName) {
  // eslint-disable-next-line valid-typeof
  if(!keyName){
    keyName='name'
  }
  if (is(enums, 'Object')) {
    return enums.hasOwnProperty(pid) && enums[pid].hasOwnProperty(keyName) ? enums[pid][keyName] : ''
  }
  if (!is(pid, 'Number')) {
    return ''
  }
  if (is(enums, 'Array')) {
    for (var i = 0; i < enums.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (enums[i].hasOwnProperty('pid') && enums[i].hasOwnProperty(keyName) && enums[i].pid === pid) {
        return enums[i][keyName]
      }
      // return (enums[i].hasOwnProperty('id') && enums[i].hasOwnProperty('name') && enums[i].id == id) ? enums[i].name : '';
    }
  }
  return ''
}
All.defImg = function(){
  let img = event.srcElement;
  img.src = require("@/assets/image/416.png");
  img.onerror = null; //防止闪图
}
All.setEndTime = function(endTime,time,a) {
  var date_a = new Date(endTime) - new Date();
  if (date_a < 0) {
    time = {
      D: "00",
      h: "00",
      m: "00",
      s:'00'
    };
  } else {
    time.D = parseInt(date_a / 1000 / 60 / 60 / 24, 10);
    if (time.D < 10) {
      time.D = "0" + time.D;
    }
    time.h = parseInt((date_a / 1000 / 60 / 60) % 24, 10);
    if (time.h < 10) {
      time.h = "0" + time.h;
    }
    time.m = parseInt((date_a / 1000 / 60) % 60, 10);
    if (time.m < 10) {
      time.m = "0" + time.m;
    }
    time.s = parseInt((date_a / 1000 ) % 60, 10);
    if (time.s < 10) {
      time.s = "0" + time.s;
    }
  }
  let interval = setInterval(function timestampToTime() {
    var date = new Date(endTime) - new Date();
    if (date < 0) {
      time = {
        D: "00",
        h: "00",
        m: "00",
        s:'00'
      };
      clearInterval(interval);
      // return time.D + time.h + time.m;
    } else {
      time.D = parseInt(date / 1000 / 60 / 60 / 24, 10);
      if (time.D < 10) {
        time.D = "0" + time.D;
      }
      time.h = parseInt((date / 1000 / 60 / 60) % 24, 10);
      if (time.h < 10) {
        time.h = "0" + time.h;
      }
      time.m = parseInt((date / 1000 / 60) % 60, 10);
      if (time.m < 10) {
        time.m = "0" + time.m;
      }
      time.s = parseInt((date / 1000) % 60, 10);
      if (time.s < 10) {
        time.s = "0" + time.s;
      }
      // return time.D + time.h + time.m;
    }
  }, a);
}
All.forceFileDownload =  function(response, filename) {
  const url = window.URL.createObjectURL(new Blob([response]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename) // or any other extension
  document.body.appendChild(link)
  link.click()
  // eslint-disable-next-line no-unused-vars
  let timeout = setTimeout(function () {
    document.body.removeChild(link)
    // eslint-disable-next-line no-unused-expressions
    window.URL.revokeObjectURL(url)
    // eslint-disable-next-line no-sequences
    , 1000
  })
}
export default All