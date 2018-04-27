import axios from 'axios';

let baseUrl = window.Api.ApiUrl; //api域名
let token = 'qqq'; //登录后的身份标识

//首页数据获取
export const getIndexData = params => {
  return axios.get(`${baseUrl}/init/api/5ab7b5513ad4a`, {timeout: 60000}).then(res => res.data);
};

//cell.vue组件页面数据获取
export const getCellData = params => {
  return axios.get('src/api/cellData.json', params).then(res => res.data);
};

//Message.vue获取报警消息
export const getMessage = params => {
  return axios.get(`${baseUrl}/init/api/5ac9cdc65b075`, params).then(res => res.data);
};
