var app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open - type.getUserInfo')
  },
  onLoad:function(){
    console.log(this.data.canIUse);
  },
  onAuth() {
    
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          console.log(123);
          // wx.reLaunch({
          //   url: '../index/index',
          // })
        }else{
          console.log(321);
        }
      }
    })
  }
})