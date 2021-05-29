// pages/home/home.js

import Fetch from "../../utils/NetWork/fetch";//请求方法
import UserUtils from "../../utils/helpers/UserUtils";//处理用户信息
import Route from "../../utils/helpers/route";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    let openId = UserUtils.getOpenId();//获取openid
    console.log("homePage", openId);
    this.setData({
      options
    });
    if (openId){
      this.init();
    }else{
      this.wxLogin();
    }
  },

  
  init(){
    //初始化函数
  },


  wxLogin(){
    let that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(that);
          Route.switchTab("/pages/majorIndex/majorIndex");
          // Fetch.request("getOpenIdByCode","GET",{"code": res.code}).then(res=>{
          //   UserUtils.saveOpenId(res.openid);
          //   that.init();
          // }).catch(err => {
          //   allToast.toastFail(err.data.message, that.page);
          // });
        }
      },
      fail: function (res) {
        console.log("用户授权失败", that.page);
       // allToast.notify("用户授权失败", that.page);
      }
    });
  },

})
