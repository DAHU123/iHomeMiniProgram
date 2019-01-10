//sureOrder.js
const app = getApp()
Page({
    data: {
        goTo: '../../utils/img/back.png',
        threeInfo: '../../utils/img/three.png',
        checkAll: '../../utils/img/checkAll.svg',
        infoAdd: '../../utils/img/infoAdd.png',
        colorBrd: '../../utils/img/colorBrd.png',
        userLogo: 'http://ihome-img-dev.oss-cn-beijing.aliyuncs.com/saturn/CjrSFfyMkW.jpg',
        expressNum: '1234&nbsp;0000&nbsp;1234',
        address: '北京市朝阳区北京市朝阳区北京市朝阳区北京市朝阳区兆维工业园区民谐路6号',
        userNickName: '王健',
        userPhone: '15993342869',
        shopData:[],
        totalPrice:"",
        skuData:[]
    },
    onLoad: function (options) {
       var that = this;
    //立即购买的数据处理
   
    var arr = JSON.parse(options.skuData);
    this.setData({ 
      totalPrice: options.totalPrice,
      skuData: arr
    });
    //购物车购买的数据的处理
    },
    showData:function(){
      var that = this;
      wx.request({
        url: 'https://deve.luckcul.com/wshop/order/submitOrder',
        data: {
          "requestHead": {
            "uuid": wx.getStorageSync("openid")
          },
          "requestBody": {
            "shopOrderModel": {
              "shopId": wx.getStorageSync("ShopId"),
              "personalId": app.globalData.UserId,
              "personalName": app.globalData.UserName,
              "personalPhone": app.globalData.UserPhone,
              "totalPrice": that.data.totalPrice,
              "recipient": "王健",
              "phone": 17600302794,
              "address": "北京市北京市朝阳区酒仙桥兆维工业园C3一层",
              "details": that.data.skuData
            }
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data.responseBody.data.number);
          if (res.data.responseBody.data.status == 1){
            wx.setStorageSync('OrderNumber', res.data.responseBody.data.number)
            wx.navigateTo({
              url: "../Payment/Payment"
            })
          }
          // that.setData({
          //   dataList: res.data.responseBody.data
          // });
        }
      })
    },
    goBack: function () {
        wx.navigateBack({
            delta: 1
        });
    },
    address: function () {
      wx.navigateTo({
        url: "../addressLIst/addressLIst"
      })
    },
    tabMMMM: function () {

        console.log(1111);
    },

})