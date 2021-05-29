import {moment} from "../helpers/Time";

const Promise = require("../lib/es6.min.js");
import {HOSELIST, ENV, URLLIST} from "url.js";
import allToast from "../helpers/newTip";
import UserUtils from "../helpers/UserUtils";
import Route from "../helpers/route";
const app = getApp();
var MD5 = require('../lib/md5.js');
const BASEPARAMS = {
  "dev": {
    "ua": "wxapplet"
  },
  "gray": {
    "ua": "wxapplet"
  },
  "pro": {
    "ua": "wxapplet"
  }
}


class fetchNetwork {
  constructor(pageContext, options) {
    this.page = pageContext;
    this.url;
    this.method,
      this.params;
  }

  setParams(params, method) {//参数处理
    //this.params = Object.assign(BASEPARAMS[ENV], receive)
    let baseParams = BASEPARAMS['dev'];
    let paramsRes = {};
    if (method == 'GET') {
      for (let bBalue in baseParams) {
        paramsRes[bBalue] = baseParams[bBalue];
      }
      for (let value in params) {
        paramsRes[value] = params[value] ;
      }
    } else if (method == 'POST') {
      for (let bBalue in baseParams) {
        paramsRes[bBalue] = baseParams[bBalue];
      }
      for (let value in params) {
        paramsRes[value] = params[value] ;
      }
    }
    this.params = this.objKeySort(paramsRes);
  }

  objKeySort = (obj) => {
    var secretkey = 'c916cad11b36fb494c93fe482c7c2eab';//微信配置
    let appid ="wx4505eeb37ac5607e";//微信配置
    // wx.getExtConfigSync().appid;
    if (appid) {
      obj.appid = appid;
    }
    let openId = UserUtils.getOpenId();
    if (openId){
      obj.openid = openId;
    }
    obj.version = "V3.1.0";
    let userInfo = UserUtils.getUser();
    if (userInfo && userInfo.member_id){
      obj.member_id = userInfo.member_id;
    }
    var newkey = Object.keys(obj).sort();
    let jsonStr = "";
    for (var i = 0; i < newkey.length; i++) {
      if(obj[newkey[i]] != ''){
        let instance = Object.prototype.toString.call(obj[newkey[i]]);
        if (instance!== '[object Object]' && instance !== '[object Array]'){
          let tempStr = newkey[i] + "=" + obj[newkey[i]] + "&";
          jsonStr += tempStr;
        }
      }
    }
    jsonStr = jsonStr.substr(0,jsonStr.length-1);
    jsonStr = jsonStr + secretkey;
    obj.sign = MD5.md5(jsonStr);
    return obj; //返回排好序的新对象
  }

  request = (url, method, params, isToast = true) => {//请求拦截等信息
    let that = this;
    isToast && allToast.toastLoading("加载中...", this.page);
    this.setParams(params, method);
    let reqUrl = HOSELIST['dev'] + URLLIST[url];
    console.log("request->url", reqUrl);
    console.log("request->params", that.params);
    return new Promise((reslove, reject) => {
      wx.request({
        url: reqUrl,
        data: that.params,
        header: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        method: method,
        dataType: "json",
        success(res) {
          console.log("response->", res);
          let code = res.data.code;
          if (code == 200) {
            isToast && allToast.clearToast();
            reslove(res.data.data);
          }else if (code == 40010 || code == 40011){
            UserUtils.saveUser({});
            allToast.toastFail("会员不存在，请重新登录", that.page);
            Route.navigateTo("/pages/login/login");
          }else if (code == 50001){
            allToast.toastFail("门店不存在", that.page);
            Route.navigateTo("/pages/home/home");
          }
          else {
            if (res.statusCode === 504){
              isToast && allToast.toastFail("请稍后重试", that.page);
            }
            else{
              let msg = res.data.message;
              console.log("msg", msg);
              isToast && allToast.toastFail(msg, that.page);
            }
            reject(res);
          }
        },
        fail(res) {
          isToast && allToast.toastFail("请求失败...", that.page);
          reject(res);
        },
        complete(res) {

        },
      })
    })
  }
}

const fetch = new fetchNetwork();
export default fetch
