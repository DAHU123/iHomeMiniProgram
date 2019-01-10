//personalCenter.js

Page({
  data: {
    message: 'This is message',
    goBack: '../../utils/img/back.png',
    goTo: '../../utils/img/back.png',
    threeInfo: '../../utils/img/three.png',
    userLogo: 'http://ihome-img-dev.oss-cn-beijing.aliyuncs.com/saturn/CjrSFfyMkW.jpg',
    userNickName: '用户昵称',
    userPhone: '15993342869'
  },
  
  onLoad: function (options) {
    var that = this;
    //立即购买的数据处理
    this.ipAddress();
    
    //购物车购买的数据的处理
  },
  aaaa:function(){
    wx.request({
      url: 'https://deve.luckcul.com/miniProgram/wxpay/unifiedOrder',
      data: {
        "requestHead": {
          "uuid": wx.getStorageSync("openid")
        },
        "requestBody": {
          "wxpayModel": {
            "body": "王健测试支付数据",
            "out_trade_no": wx.getStorageSync("OrderNumber"),
            "device_info": "WEB",
            "fee_type": "CNY",
            "total_fee": "1",
            "spbill_create_ip": "123.12.12.123",
            "trade_type": "JSAPI",
            "openid": "oWujAwZsCusRT0TU1sKyVq6HrlmU"
          }
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        
      
      }
    })
  },
  //获取实际的ip地址
  ipAddress: function () {
    wx.request({
      url: 'https://pv.sohu.com/cityjson?ie=utf-8',
      success: function (e) {
        console.log(e.data);
        that.setData({
          motto: e.data
        })
      }
    })
  },
  goBack: function () {
    wx.navigateBack({
      delta: 1
    });
  },

})