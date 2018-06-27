import axios from 'axios'
import qs from 'qs'
import apis from '~/apis'
import env  from '~/apis/env'
import { Message } from 'element-ui'
import util from '~/util'

// 默认配置
let baseURL = env.baseURL;
let instance = axios.create({
  // baseURL:baseURL,
  // 请求数据修改
  // transformRequest: [
  //   data=>qs.stringify(data)
  // ],
});

// 请求拦截
let url = '';
instance.interceptors.request.use(httpRequest =>{
  // 对于外部请求, 不添加前缀, 也不加token参数
  url = apis[httpRequest.url] || httpRequest.url
  httpRequest.url = (url.indexOf('http')===0)? url: baseURL+url

  // console.log('____________');
  // console.log( httpRequest.url );
  // console.log('____________');
  
  // if ( httpRequest.method === 'post' ) {
  //   ( httpRequest.data? httpRequest.data: (httpRequest.data={}) )
  //     .token = localStorage.getItem('token');
  // } else if ( httpRequest.method === 'get' ) {
  //   ( httpRequest.params?httpRequest.params:(httpRequest.params={}) )
  //   .token = localStorage.getItem('token');
  // }

  httpRequest.headers['x-access-token'] = util.getToken();
  httpRequest.url = baseURL + url;

  return httpRequest;
});


// 响应拦截器
let respData, errorCode, message, duration;
instance.interceptors.response.use(
  httpResponse=>{
    respData  = httpResponse.data;
    errorCode = respData.errorCode;
    message   = '';
    duration  = 3000;
    
    if ( errorCode == '4001' ) {
      // message = `<span style="line-height:32px;">${respData.message}</span>
      // <button type="button" style="float:right;margin-right:30px;" class="el-button el-button--primary el-button--small" onclick="Message.closeAll();$nuxt._router.push('/login');">
      //   <span>重新登录</span>
      // </button>`;
      message = '请重新登录';
      util.setToken('');
      duration = 0;
    } else if ( respData.state !== 1 ) {
      if ( typeof respData === 'object' ) {
        message = respData.message;
        duration = 3000;
      }
    }
    
    if ( !!message ) {
      Message.closeAll();
      Message.error({
        dangerouslyUseHTMLString: true,
        showClose:true,
        message: message,
        duration:duration
      });
    }
    return respData;
  }, 
  error=>{
    Message.error({
      message: error.toString()
    })
    return Promise.reject(error)
  }
);


export default instance;
