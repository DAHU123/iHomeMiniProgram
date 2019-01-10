//sureOrder.js
var app = getApp() ;
Page({
    data: {
        message: 'This is message',
        goBack: '../../utils/img/back.png',
        goTo: '../../utils/img/back.png',
        threeInfo: '../../utils/img/three.png',
        userLogo: 'http://ihome-img-dev.oss-cn-beijing.aliyuncs.com/saturn/CjrSFfyMkW.jpg',
        userNickName: '用户昵称',
        hiddenBlack: true,
        hiddenMask: true,
        car: app.globalData.car,
        people: app.globalData.people,
        userPhone: '15993342869'
    },
  onLoad: function () {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      
      // 由于 getUserInfo   是网络请求，可能会在 Page.onLoad 之后才返回 一般吃鸡都是十几杀，有时候会二十几杀，
      // 所以此处加入 callback 以防止这种情况  
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    // globalData
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
              "encryptedData": app.globalData.encryptedData,//小程序接口geUserInfo获取
              "iv": app.globalData.iv//小程序接口geUserInfo获取
            }
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log('获取unionid');
          console.log(res.data.responseBody.data);
        }
      })
    },
    goBack: function () {
        wx.navigateBack({
            delta: 1
        });
    },
    // 展示黑条条
    showBlack: function () {
        this.setData({
            hiddenBlack:!this.data.hiddenBlack,
            hiddenMask:!this.data.hiddenMask,
        })
    },
    // 隐藏黑条条
    hideBlack: function () {
        this.setData({
            hiddenBlack:!this.data.hiddenBlack,
            hiddenMask:!this.data.hiddenMask,
        })
    },


})