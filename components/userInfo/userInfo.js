// pages/userInfo/userInfo.js
import UserUtils from '../../utils/helpers/UserUtils';
import NetWorking from "../../utils/NetWork/fetch" 
import Route from "../../utils/helpers/route"
const app = getApp()
Component({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight:0,
    userInfo: {},
    isSingle: false, // 是否是单店版
    marketerRegister: false,
    isMarketer: false,
    tabbarScene:''
  },

  attached() {
    let height = app.globalData.navHeight;
    let scene = app.globalData.scene
    console.log(scene)
    this.setData({
      navHeight:height,
      tabbarScene:scene
    });
  },

  // /**
  //  * 生命周期函数--监听页面加载
  //  */
  // onLoad: function (options) {
  //
  // },
  // onShow () {
  //   const globalData = app.globalData
  //   this.setData({
  //     userInfo: {
  //       ...UserUtils.getUser()
  //     },
  //     isSingle: globalData.currentModel == 'many' && globalData.scene == 'single' // 只有是多店版小程序,并且当前在单店版才有返回页面
  //   })
  //   if (this.data.userInfo.member_id) {
  //     this.getMemberLevel()
  //     this.getMarket()
  //   }
  // },
  methods:{
    onShow(){
      const globalData = app.globalData
      this.setData({
        userInfo: {
          ...UserUtils.getUser()
        },
        isSingle: globalData.currentModel == 'many' && globalData.scene == 'single' // 只有是多店版小程序,并且当前在单店版才有返回页面
      })
      if (this.data.userInfo.member_id) {
        this.getMemberLevel()
        this.getMarket()
      }
    },
    getMarket(){
      NetWorking.request('getMarketerSetting', 'GET', {}, true).then((res) => {
        this.setData({
          marketerRegister: !!res.settings.find(item => item.register == 1)
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    // 获取当前会员等级
    getMemberLevel () {
      let params = {}
      const net1 = NetWorking.request('getLevelRights', 'GET', params, true)
      const net2 = NetWorking.request('getUserInfo', 'GET', params, true)
      Promise.all([net1, net2]).then(([res1, res2]) => {
        const _steps = res1.level_rights
        let userInfo = {
          level_rights: _steps,
          ...this.data.userInfo,
          ...UserUtils.getUser(),
          ...res2,
          isMarketer: res2.marketer_id != 0,
        }
        if (!!res2.level) {
          userInfo = {
            ..._steps.find(item => item.level_id == res2.level.id),
            ...userInfo
          }
          userInfo.level.discount = parseFloat(userInfo.level.discount)
          userInfo.level.reduce = parseFloat(userInfo.level.reduce)
        }
        console.log(userInfo)
        this.setData({
          userInfo: userInfo
        })
      })
      // NetWorking.request('getLevelRights', 'GET', params, true).then((res) => {
      //
      //   NetWorking.request('getUserInfo', 'GET', params, true).then((r) => {
      //
      //   }).catch((err) => {
      //     console.log(err);
      //   });
      // }).catch((err) => {
      //   console.log(err);
      // });
    },
    goOrder (e) {
      Route.navigateTo('/pages/myOrder/myOrder', {active: e.currentTarget.dataset.active})
    },
    goAddress () {
      Route.navigateTo('/pages/address/address')
    },
    goPoints () {
      Route.navigateTo('/pages/userPoints/userPoints')
    },
    goCoupon () {
      Route.navigateTo('/pages/userCoupon/userCoupon')
    },
    goCard () {
      Route.navigateTo('/pages/card/card')
    },
    goAmb () {
      if(this.data.userInfo && this.data.userInfo.marketer_id == 0){
        Route.navigateTo('/packageA/pages/ambassador/application/application')
        return
      }
      Route.navigateTo('/packageA/pages/ambassador/ambassador')
    },
    logout () {
      let params = {}
      NetWorking.request('logout', 'POST', params, true).then((res) => {
        wx.removeStorage({
          key: 'USER',
          success (res) {
            console.log(res)
          }
        })
        wx.removeStorage({
          key: 'cart',
          success (res) {
            console.log(res)
          }
        })
        this.setData({
          userInfo: {}
        })
      }).catch((err) => {
        console.log(err);
      });
    },
    goMember () {
      Route.navigateTo('/pages/memberInfo/memberInfo')
    },

    loginCallBack(){
      const globalData = app.globalData
      this.setData({
        userInfo: {
          ...UserUtils.getUser()
        },
        isSingle: globalData.currentModel == 'many' && globalData.scene == 'single' // 只有是多店版小程序,并且当前在单店版才有返回页面
      })
      if (this.data.userInfo.member_id) {
        this.getMemberLevel()
        this.getMarket()
      }
    }
  },

})
