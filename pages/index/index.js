//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    searchValue:'',
    userInfo: {},
    dataList:[],
    shopInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clear: function () {
    console.log(111);
    wx.clearStorage();
  },
  onLoad: function () {
    wx.request({
      url: 'https://ip-api.com/json',
      success: function (e) {
        console.log(e);
        
      }
    })
    var that = this;
    this.dataLsit();
    this.shopMessage();
    // this.userInfo();
  },
  dataLsit:function(){
    var that = this;

    wx.request({
      url: 'https://deve.luckcul.com/wshop/listPrdsByShopId',
      data: {
        "requestHead": {
          "uuid": wx.getStorageSync("openid")
        },
        "requestBody": {
          "shopModel": {
            "nShopId": 1,
            "cProductName": ''
          }
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          dataList: res.data.responseBody.data
        });
      }
    })
  },
  userInfo:function(){
    var encryptedData = app.globalData.encryptedData;
    var iv = app.globalData.iv;
    console.log(app.globalData.encryptedData);
    console.log(iv);
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
            "encryptedData": encryptedData,//小程序接口geUserInfo获取
            "iv": iv//小程序接口geUserInfo获取
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
        // console.log(res);
      }
    })
  },
  shopMessage:function(){
    var that = this;
    wx.request({
      url: 'https://deve.luckcul.com/wshop/get',
      data: {
        "requestHead": {
          "uuid": wx.getStorageSync("openid")
        },
        "requestBody": {
          "icanShop": {
            "nCompanyId": 10 //当前用户的公司id
          }
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.setStorageSync('ShopId',res.data.responseBody.data.content.id);
        that.setData({
          shopInfo: res.data.responseBody.data.content
        });
      }
    })
  },
  wangjian: function (e) {
   
    this.setData({
      searchValue: e.detail.value
    });
  },
  shopInfo(e){
    let str = JSON.stringify(e.currentTarget.dataset.shop);
    wx.navigateTo({
      url: "../shopMsg/shopMsg?jsonstr="+str
    })
   
  },
  adadad(){
    var that = this;
 
    wx.request({  
      url: 'https://deve.luckcul.com/wshop/listPrdsByShopId',
      data: {
        "requestHead": {
          "uuid": wx.getStorageSync("openid")
        },
        "requestBody": {
          "shopModel": {
            "nShopId": 1,
            "cProductName": that.data.searchValue
          }
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
  
        that.setData({
          dataList: res.data.responseBody.data
        });
      

      }
    })
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  UserCenter:function(){
    wx.navigateTo({
      url:"../personalCenter/personalCenter"
    })
  }
})
