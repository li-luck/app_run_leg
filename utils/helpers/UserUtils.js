import fetch from "../NetWork/fetch"//用来处理用户信息数据 缓存本地数据
const app = getApp()
class UserUtils {
    //返回上一页
    static saveOpenId(openId) {
        wx.setStorageSync("OPENID", openId);
    }
    static getOpenId() {
        return wx.getStorageSync("OPENID");
    }
    static saveUser(user) {
        wx.setStorageSync("USER", user);
    }
    static getUser(user) {
        return wx.getStorageSync("USER");
    }
    static setCurrentInnId(innid) {
        wx.setStorageSync("CURRENT-INNID", innid);
    }
    static getCurrentInnId() {
        let innid = wx.getStorageSync("CURRENT-INNID");
        if (innid) {
            return innid + "";
        } else {
            return "";
        }
    }
    static openLocation(lat, lng, name = "", address = '') {
        wx.openLocation({
            latitude: Number(lat),
            longitude: Number(lng),
            name:name,
            address:address
        });
    }
}

export default UserUtils
