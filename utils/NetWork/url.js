const Ext = wx.getExtConfigSync();
export const ENV = Ext.environment;
export const HOSELIST = {
  "dev":"https://lvjiasanshao.cn",
  "gray":"https://lvjiasanshao.cn",
  "pro":"https://lvjiasanshao.cn",
};

export const URLLIST = {//接口请求路径
  "getOpenIdByCode" : "/v1/wechat/openid_by_code",
  "getPopularGoodsList" : "/v1/goods/list_hotel_popular_goods",
};
