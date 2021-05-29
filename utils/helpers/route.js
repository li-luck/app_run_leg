//路由
class Route {
    //返回上一页
    static goBack(){
        wx.navigateBack({
            delta: 1
        });
    }
    //路由跳转  url:地址, params:传参 isRedirect页面重定向
    static navigateTo(url, params = {}, isRedirect = false){
        let parameter = "";
        for (let i in params){
            parameter = parameter + i + "=" + params[i] + "&";
        }
        if (parameter){
            parameter = parameter.substring(0, parameter.length - 1);
            url = url + "?" + parameter;
        }
        if (isRedirect){
            wx.redirectTo({
                url:url,
                fail(res) {
                    console.log("fail", res);
                }
            });
        }else{
            wx.navigateTo({
                url: url,
                fail(res) {
                    console.log("fail", res);
                }
            })
        }
    }
    //Tab 切换
    // static switchTab(url){
    //     wx.switchTab({
    //         url:url
    //     })
    // }
    //是否是第一页
    static isFirstPage(){
        let pages = getCurrentPages();
        return pages.length == 1;
    }

    //获取上一个页面
    static getLastPage() {
        let pages = getCurrentPages();
        let prevPage = pages[ pages.length - 2 ];
        return prevPage;
    }

    static reLaunch(url){
        wx.reLaunch({
            url
        })
    }

}

export default Route
