import jsonp from 'assets/js/jsonp';
import {jsonpOptions} from './config';

export const getProductDetail = id => {
  const url = 'https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/';
  const params = {
    api: 'mtop.taobao.detail.getdetail',
    ttid: '2017@taobao_h5_6.6.0',
    data: `{"itemNumId":"${id}"}`,
    appKey: 12574478,
    dataType: 'jsonp',
    type: 'jsonp'
  };
  return jsonp(url, params, jsonpOptions).then(res => {
    let shuju = res.data;
    if (res.ret[0] === 'SUCCESS::调用成功') {
      let data = {};
      const apiStack = JSON.parse(res.data.apiStack[0].value);
      data.content = {};
      data.content.priceText = apiStack.priceSectionData.price.priceText;// 单价
      data.content.soldCount = apiStack.vertical.jhs.soldCount;// 已售件数
      data.content.title = apiStack.item.title;// 货物名称
      data.content.postage = apiStack.delivery.postage;// 包邮信息
      data.content.from = apiStack.delivery.from;// 寄出地址
      data.content.sellCount = apiStack.item.sellCount;// 总共出售
      data.content.sellerNick = shuju.seller.sellerNick;// 商店性质，如天猫超市
      data.content.shopName = shuju.seller.shopName;// 商店名称
      data.content.shopIcon = shuju.seller.shopIcon;// 商店图标
      data.content.totalCount = shuju.rate.totalCount;// 评价总数
      data.content.keywords = shuju.rate.keywords;// 评价语句及人数
      // [{word,count},{},{}]
      data.content.userName = shuju.rate.rateList[0].userName;// 评价用户名
      data.content.dateTime = shuju.rate.rateList[0].dateTime;// 评价日期
      data.content.content = shuju.rate.rateList[0].content;// 评价内容
      data.content.headPic = shuju.rate.rateList[0].headPic;// 评价用户图标
      data.content.creditIcon = shuju.seller.creditLevelIcon; // 天猫小图标
      data.content.evaluates = shuju.seller.evaluates;// 宝贝描述、卖家服务、物流服务
      // [{title,score},{},{}]
      data.slider = apiStack.item.images;// 轮播图图片
      return data;
    }

    throw new Error('没有获取到商品详情数据!');
  }).catch(err => {
    if (err) {
      console.log(err);
    }
  }).then(res => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  });
};
