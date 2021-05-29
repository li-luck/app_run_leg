import YzgFetch from "../../utils/NetWork/fetch";
import Route from '../../utils/helpers/route'
import UserUtils from "../../utils/helpers/UserUtils"
import { moment } from '../../utils/helpers/Time';
const app = getApp();
const Ext = wx.getExtConfigSync()
Page({
  data: {
    brandInfo: {},
    bannerList: [],
    moduleSort: "12",
    isManyInn:1,
    ymd:{},
    checkInOutDate:[],
    dateDesc:[],
    night:1,
    calendarShow:false,
    opacity:0,
    pageTitle:"",
    addInMine:true,
    loading:true,
    navH:0,
    menuTop:0,
    isFullScreen:false
  },
  onChange(event) {
    this.setData({
      active: event.detail,
      isFullScreen:app.globalData.isFullScreen
    });
  },
  onPageScroll: function(e) {
    let top = e.scrollTop
    let _opacity;
    if(top > 250){
      _opacity = 1
    }else{
      _opacity = (top/200).toFixed(1)
    }
    this.setData({
      opacity:_opacity
    })
  },
  handlerCalenShow(){
    let visi
    if(!this.data.calendarShow){//需要点击弹起日期框
      visi = false
    }else{
      visi = true
    }
    this.setData({
      calendarShow: !this.data.calendarShow
    });
  },
  onShow() {

    app.globalData.scene = 'many'
    this.show()
    this.getDate()
  },
  onLoad() {
    const { statusBarHeight } = wx.getSystemInfoSync();
    // 计算导航栏的高度
    // 此高度基于右上角菜单在导航栏位置垂直居中计算得到
    // 得到右上角菜单的位置尺寸
    const menuButtonObject = wx.getMenuButtonBoundingClientRect();
    const { top, height,left } = menuButtonObject;
    const navBarHeight = height + (top - statusBarHeight) * 2;
    // 计算状态栏与导航栏的总高度
    const statusNavBarHeight = statusBarHeight + navBarHeight;
    let _capsule = {
      top:top + height + 10,
      left:left - 60
    }
    this.setData({
      pageTitle:Ext.appletName,
      capsule:_capsule,
      navH:statusNavBarHeight + 5,
      menuTop:top - 5
    })
    //this.getBanner()
  },
  closeMine(){
    this.setData({
      addInMine:false
    })
  },
  getDate(d){
    const weekArr = ["日","一","二","三","四","五","六"]
    const {startDate,endDate} = app.globalData;
    let night = endDate.diff(startDate,'days')
    let _startDate = moment(startDate).format("MM-DD").replace('-','月') + '日';
    let _endDate = moment(endDate).format('MM-DD').replace('-','月') + '日';
    this.setData({
      ymd:{checkin:moment(startDate).format("YYYY-MM-DD"),checkout:moment(endDate).format("YYYY-MM-DD")},
      checkInOutDate:[_startDate,_endDate],
      night:night,
      dateDesc:['周' + weekArr[startDate.day()],'周' + weekArr[endDate.day()]],
      calendarShow: false,
    })
  },
  getBanner(){
    YzgFetch.request('majorBanner', 'GET', {}, false).then(res => {
      let _banner = res.map((m,i)=>{
        m.imgId = i + 1;
        return m
      })
      this.setData({
        bannerList:_banner,
        loading:false
      })
    })
  },
  show() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 0
      })
    }
  },
  goSearchInn() {
    Route.navigateTo('/pages/searchInn/searchInn', {
    })
  },
  onShareTimeline() {
    return {
      title: "小程序"
    }
  },
  onShareAppMessage() {
    return {
      title: "这里有好多民宿酒店，好玩好吃应有尽有，快来看看吧！",
      imageUrl:this.data.bannerList[0].url,
      path:"/pages/home/home"
    }
  },
})
