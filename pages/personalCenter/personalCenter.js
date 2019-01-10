//sureOrder.js
var app = getApp() ;

Page({
    data: {
        message: 'This is message',
        goBack: '../../utils/img/back.png',
        goTo: '../../utils/img/centerRight.png',
        threeInfo: '../../utils/img/three.png',
        isSex: '../../utils/img/girl.png',
        paySrc: '../../utils/img/pay_l.png',
        noDeli: '../../utils/img/noDeli_l.png',
        allSrc: '../../utils/img/all_h.png',
        hiddenBlack: true,
        hiddenMask: true,
        car: app.globalData.car,
        people: app.globalData.people,
        userLogo: 'http://ihome-img-dev.oss-cn-beijing.aliyuncs.com/saturn/CjrSFfyMkW.jpg',
        userNickName: '用户昵称',
        userPhone: '15993342869',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () {
      var that = this;
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
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
      console.log(that.data.userInfo);
   
      // wx.request({
      //   url: 'https://deve.luckcul.com/wechat/personal/initialize',
      //   data: {
      //     "requestHead": {
      //       "uuid": wx.getStorageSync("openid")
      //     },
      //     "requestBody": {
      //       "weChatModel": {
      //         "openid": wx.getStorageSync("openid"),
      //         "userId": '',
      //         "userPhone": ''
      //       }
      //     }
      //   },
      //   method: 'POST',
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   success: function (res) {
      //     console.log('获取用户个人信息');
      //     console.log(res.data.responseBody.data);
      //   }
      // })
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
    getUserInfo: function (e) {
      //console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
  UserInfo:function(){
    wx.navigateTo({
      url: '../personalInfo/personalInfo'
    })
  }

})