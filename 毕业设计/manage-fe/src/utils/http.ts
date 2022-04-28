import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    data:{}
  });


// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  if(config.url == "user/login" || config.url == "user/regist"){
    return config;
  }else{
    console.log(config);
  const token = localStorage.getItem("token");
  if(token){
    config.headers.authorization = token;
     return config;
  }else{
    window.location.pathname="/login"
    throw new Error("没有权限");
  }
  }

}, function (error) {
  // Do something with request error
  window.location.pathname="/login"
  return Promise.reject(error);
})




// Add a response interceptor
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
  export default instance