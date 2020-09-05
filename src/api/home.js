import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import {SUCC_CODE, TIMEOUT, RECOMMENDS_PERSIZE, JSONP_OPTIONS} from './config';

// 获取幻灯片数据-ajax
export const getHomeSlider = () => {
  return axios.get('https://www.imooc.com/api/home/slider', {
    timeout: TIMEOUT
  }).then(res => {
    if (res.data.code === SUCC_CODE) {
      let sliders = res.data.slider;
      let slider = [sliders[Math.floor(Math.random() * sliders.length)]];
      sliders = sliders.filter(value => Math.random() >= 0.5);
      sliders = disOrganizeArr(sliders);

      if (sliders.length === 0) {
        sliders = slider;
      }
      return sliders;
    }

    throw new Error('没有获取到数据！');
  }).catch(err => {
    if (err) {
      console.log(err);
    }

    return [
      {
        linkUrl: 'https://www.imooc.com',
        picUrl: require('assets/img/404.png')
      }
    ];
  }).then(data => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  });
};

const disOrganizeArr = (arr) => {
  let i = arr.length;
  while (i--) {
    let rNum = Math.floor(Math.random() * i);
    if (arr[i] !== arr[rNum]) {
      [arr[i], arr[rNum]] = [arr[rNum], arr[i]];
    }
  }
  return arr;
};
// 获取热门推荐数据--jsonp
export const getHomeRecommend = (page = 1, psize = RECOMMENDS_PERSIZE) => {
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
  const params = {
    page,
    psize,
    type: 0,
    frontCatId: ''
  };

  return jsonp(url, params, JSONP_OPTIONS).then(res => {
    if (res.code === '200') {
      return res;
    }

    throw new Error('没有获取到数据！');
  }).catch(err => {
    if (err) {
      console.log(err);
    }
  }).then(data => {
    return new Promise(resolve => {
      /* setTimeout(() => {

        }, 1000); */
      resolve(data);
    });
  });
};
