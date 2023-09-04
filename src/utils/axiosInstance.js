import axios from 'axios'
import {store} from '../redux/store';

//前端开发测试
// axios.defaults.baseURL = 'http://127.0.0.1:4523/m1/2639033-0-default/'

//后端开发测试
axios.defaults.baseURL = '/api'

//axios.interceptors.response.use
//axios.interceptors.request.use
// Add a response interceptor
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    store.dispatch(
        {
            type: "change_loading",
            isLoading: true
        }
    )
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.dispatch(
        {
            type: "change_loading",
            isLoading: false
        }
    )
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //失败解加载
    store.dispatch(
        {
            type: "change_loading",
            isLoading: false
        }
    )
    return Promise.reject(error);
});