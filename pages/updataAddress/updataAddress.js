//sureOrder.js
//获取应用实例
const app = getApp()

Page({
  data: {
      // 省市区三级联动初始化
      region: ["北京市", "北京市", "东城区"],
      hasUserInfo: false,
      regionStr: "北京市-北京市-东城区",
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      name:"",
      phone:"",
      addressMSG:"",
      status:null
    },
    onLoad: function (options) {
      console.log(options);
      var that = this;
      // addressId
      that.data.status = options.status;
      if (options.status == 0){
        wx.request({
          url: 'https://deve.luckcul.com/wshop/address/get',
          data: {
            "requestHead": {
              "uuid": wx.getStorageSync("openid")
            },
            "requestBody": {
              "userAddress": {
                "id": options.addressId, //地址id
              }
            }
          },
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data.responseBody.data);
            var arr = ["","",""];
            arr[0] = res.data.responseBody.data.cProvinceName;
            arr[1] = res.data.responseBody.data.cCityName;
            arr[2] = res.data.responseBody.data.cCountyName;
            that.setData({
              name: res.data.responseBody.data.consignee,
              phone: res.data.responseBody.data.phone,
              addressMSG: res.data.responseBody.data.address,
              region:arr,
              regionStr: arr[0] + "-" + arr[1] + "-" + arr[2]
            })
            
          }
        })
      }
    },
    changeText: function() {
       
    },
    // 选择省市区函数
    changeRegin(e) {
      this.setData({ region: e.detail.value });
      this.setData({ regionStr: e.detail.value[0] + "-" + e.detail.value[1] + "-" + e.detail.value[2] });
    },
    Verification:function(e){
      
    },
    inputName: function (e) {
      console.log(e.detail.value);
      this.data.name = e.detail.value;
    },
    inputiPhone: function (e) {
      console.log(e.detail.value);
      this.data.iphone = e.detail.value;
    },
    inputAddressMSg: function (e) {
      console.log(e.detail.value);
      this.data.addressMSG = e.detail.value;
    },
    Add:function (){
      var urlStr = '';

      if (this.data.status == 0){
        urlStr = "https://deve.luckcul.com/wshop/address/update";
      }else{
        urlStr = "https://deve.luckcul.com/wshop/address/update";
      }
      wx.request({
        // wx.getStorageSync("openid")
        url: urlStr,
        data: {
          "requestBody": {
            "userAddress": {
              "consignee": this.data.name,
              "phone": this.data.iphone,
              "nProvinceId": "",//省id
              "cProvinceName": this.data.region[0],//省名称
              "nCityId": "",//市id
              "cCityName": this.data.region[1],//市名称
              "nCountyId": "",//区id
              "cCountyName": this.data.region[2],//区名称
              "address": this.data.addressMSG,
              "status": 1,//状态：1为默认，0为非默认
              "buyers": 1
            }
          },
          "requestHead": {
            "uuid": wx.getStorageSync("openid")
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data.responseBody.data);
          wx.navigateTo({
            url: "../addressLIst/addressLIst"
          })
        }
      })
    }
})