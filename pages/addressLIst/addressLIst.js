//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    goBack: '../../utils/img/back.png',
    threeInfo: '../../utils/img/three.png',
    userInfo: {},
    AddressData:[],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    this.addressList();
  },
  addressList:function(e){
    var that = this;
    wx.request({
      url: 'https://deve.luckcul.com/wshop/address/list',
      data: {
        "requestHead": {
          "uuid": wx.getStorageSync("openid")
        },
        "requestBody": {
          "userAddress": {
            "buyers": "1" //用户id
          }
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.responseBody.data);

        that.setData({
          AddressData: res.data.responseBody.data
        });
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  AddAddress:function(){
    wx.navigateTo({
      url: "../updataAddress/updataAddress?status=1"
    })
  },
  UpataAddress: function (e) {
    console.log(e.currentTarget.dataset);

    wx.navigateTo({
      url: "../updataAddress/updataAddress?status=0&addressId=" + e.currentTarget.dataset.addressid
    })
  },
  del:function(e){
    var that = this;
    wx.request({
      url: 'https://deve.luckcul.com/wshop/address/delete',
      data: {
        "requestHead": {
          "uuid": wx.getStorageSync("openid")
        },
        "requestBody": {
          "userAddress": {
            "id": 6 //地址id
          }
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.responseBody.data);

        that.addressList();
      }
    })

  }
})
