import axios from 'axios';
import {SUCC_CODE, TIMEOUT} from './config';

const CancelToken = axios.CancelToken;
let cancel;

export const getCategoryContent = (id) => {
  cancel && cancel('取消了前一次的请求!');

  return axios.get(`http://www.imooc.com/api/category/content/${id}`, {
    timeout: TIMEOUT,
    cancelToken: new CancelToken(function (c) {
      cancel = c;
    })
  }).then(res => {
    if (res.data.code === SUCC_CODE) {
      // 请求成功cancel为Null
      cancel = null;
      return res.data;
    }

    throw new Error('未能获取到数据');
  }).catch(err => {
    if (axios.isCancel(err)) { // 取消前一次的请求
      console.log(err);
    } else {
      console.log(err);
    }
  });
};
