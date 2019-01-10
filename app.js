//app.js
var httpUrl = 'https://deve.luckcul.com' ;
App({
    onLaunch: function () {
        // 展示本地存储能力
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)
        var that = this;
        that.login();
        
       
      wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录

        }
      })

    },
    login:function(){
      var that = this;
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            wx.setStorageSync('code', res.code);
            wx.request({
              url: httpUrl + '/miniProgram/getUserMiniOpenid',
              data: {
                "requestBody": {
                  "weChatMiniModel": {
                    "code": res.code
                  }
                }
              },
              method: 'POST',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                // console.log('调通了****',res.data);
                if (res.data.responseBody.data.code == 1) {
                  // console.log('获取用户openid成功',res);
                  wx.setStorageSync('openid', res.data.responseBody.data.miniOpenid)
                  that.setting();
                } else {
                  console.log('获取用户openid失败,code无效');
                }
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    setting:function(){
      var that = this;
      // 获取用户信息
      wx.getSetting({
        success: res => {
          // console.log(res);
          if (res.authSetting['scope.userInfo']) {
            // console.log(111);
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

            wx.getUserInfo({
              withCredentials: true,
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                this.globalData.encryptedData = res.encryptedData;
                this.globalData.iv = res.iv;

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
                that.userInfos(res.encryptedData, res.iv);
              }
            })
          } else {
            console.log(222);
            // wx.redirect({
            //   url: '/pages/auth/auto',
            // })
          }
        }
      });
    },
    userInfos:function(a,b){
      var that = this;
      wx.request({
        url: 'https://deve.luckcul.com/miniProgram/personal/initialize',
        data: {
          "requestHead": {
            "uuid": wx.getStorageSync("openid")
          },
          "requestBody": {
            "weChatMiniModel": {
              "miniOpenid": wx.getStorageSync("openid"),
              "userId": 1,
              "userPhone": "17600302794",
              "encryptedData": a,//小程序接口geUserInfo获取
              "iv": b//小程序接口geUserInfo获取
            }
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          // console.log('获取unionid');
          // console.log(encryptedData);
          // console.log(iv);
          // console.log(res.data.responseBody.data);
          wx.setStorageSync('UserId',res.data.responseBody.data.id);
          that.globalData.UserId = res.data.responseBody.data.id;
          that.globalData.UserName = res.data.responseBody.data.name;
          that.globalData.UserPhone = res.data.responseBody.data.phone;
        }
      })
    },
    onShow: function(options) {
        // console.log(options);
        // Do something when show.
    },
    onHide: function() {
        // Do something when hide.
    },
    onError: function(msg) {
        // console.log(msg)
    },
    onPageNotFound: function(msg) {
        //console.log(msg)
    },
    // 根据code获取微信用户的openid
    getOpenId: function() {

    },
    globalData: {
        encryptedData:'',
        iv:'',
        userInfo: null,
        car: '../../utils/img/car.png',
        people: '../../utils/img/people.png',
        httpUrl: 'https://deve.luckcul.com',
        UserId:null,
        UserName:null,
        UserPhone: null,
    }
})