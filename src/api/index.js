import axios from 'axios'
import qs from 'qs';
import ElementUI from 'element-ui'
import router from '../router'
import store from '@/store'
import { sign_data,sign} from '@/common/crypto';

// axios.get(process.env.API_BASEURL+'getTime')
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
// });

axios.defaults.timeout = 5000;
axios.defaults.baseURL =process.env.API_BASEURL;

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = qs.stringify(config.data)
    let timestamp = Date.parse(new Date()) / 1000;
//     let timestamp = new Date
// timestamp.setMinutes( timestamp.getMinutes() + timestamp.getTimezoneOffset() ); // 当前时间(分钟) + 时区偏移(分钟)
    // console.log( "格林尼治时间戳: ", timestamp.toLocaleString() );
    let signstr = sign(timestamp);
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
      // time:timestamp.getTime(),
      time:timestamp,
      sign:signstr
    }
    if(localStorage.getItem('token')){
      config.headers.Authorization = localStorage.getItem('token');
      config.headers.userToken = localStorage.getItem('token');
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.code ==402){
      store.commit('logout')
      setTimeout(() => {
        location.reload() // 强制刷新
      }, 500)
      router.push({
        path:"/login",
      }) 
      ElementUI.Message.error('请登录');
    }else if(response.data.code ==403){
      setTimeout(() => {
        location.reload() // 强制刷新
      }, 500)
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

function getTime() {
  return new Promise(function(resolve, reject){
    axios.get(process.env.API_BASEURL+'getTime')
    .then(response=>{
      resolve(response.data);
    })
    .catch(error=>{
      reject(error)
    });
  });
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      localStorage.setItem('sever-time',response.data.time)
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })

  // getTime().then(res=>{
  //   return new Promise((resolve,reject) => {
  //   axios.post(url,data)
  //     .then(response => {
  //       resolve(response.data);
  //     },err => {
  //       reject(err)
  //     })
  //   })
  // })
  
  //  async function asyncCall(){
  //   await getTime()
  //   new Promise((resolve,reject) => {
  //     axios.post(url,data)
  //           .then(response => {
  //             resolve(response.data);
  //           },err => {
  //             reject(err)
  //           })
  //   })
  //  }
  //  return asyncCall()
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data = {}){
  return new Promise((resolve,reject) => {
    axios.delete(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}