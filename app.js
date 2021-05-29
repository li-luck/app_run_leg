import UserUtils from '/utils/helpers/UserUtils'
import Yzgfetch from "/utils/NetWork/fetch";
import { moment } from '/utils/helpers/Time';
App({
  onLaunch: function () {
    //日历订单日期初始化
    this.globalData.startDate = moment();
    this.globalData.endDate = moment().add(1, 'days');
    wx.getSystemInfo({
      success: (e) => {
        let custom = wx.getMenuButtonBoundingClientRect();//菜单按钮
        this.globalData.height = custom.bottom + custom.top - e.statusBarHeight;
        this.globalData.navHeight = this.globalData.height + 12;
      }
    });
    this.checkFullSucreen();

    // 检查版本更新
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
    });
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      })
    });
    updateManager.onUpdateFailed(function() {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    })
  },
  checkFullSucreen: function () {
    const self = this
    wx.getSystemInfo({
      success: function (res) {
        self.globalData.windowHeight =  res.windowHeight;
        // 根据 屏幕高度 进行判断
        let modelmes = res.model;
        if (res.screenHeight - res.windowHeight - res.statusBarHeight - 32 > 72 || modelmes.search('iPhone X') != -1) {
          self.globalData.isFullScreen = true
        }
        console.log("modelmes", modelmes.search('iPhone X'));
        if(res.system.indexOf('iOS') != -1){
          self.globalData.platform = "ios"
        }else if(res.platform == "android"){
          self.globalData.platform = "android"
        }
      }
    })
  },

  globalData: {
    height:0,
    isFullScreen:false,
    platform:"android",
    navHeight:0,
    startDate:"",
    endDate:"",
    windowHeight:0,
    fromCodeId:"",
    version:"v1.0.0",
    scene:"",//记录当前页面在多店还是单店  single单店 many多店
    currentModel:"",//记录当前小程序是多店还是单店  single单店 many多店
    marketer_id:0,
    requestCount:0,//当前请求次数
    tabBarList:[]
  }
})
