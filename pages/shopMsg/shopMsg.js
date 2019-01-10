//index.js
//获取应用实例
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()

Page({
  data: {
    goBack: '../../utils/img/back.png',
    threeInfo: '../../utils/img/three.png',
    specAttr:{},
    nowSpec:{},//当前选中的规格
    show:"none",
    checkedSpec:[],
    userInfo: {},
    hasUserInfo: false,
    shopDataInfo:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    background: ['http://ihome-img-test.oss-cn-beijing.aliyuncs.com/saturn/WysNf8DpiN.jpg', 'http://ihome-img-test.oss-cn-beijing.aliyuncs.com/saturn/Z84sctC4zt.jpg', 'http://ihome-img-test.oss-cn-beijing.aliyuncs.com/saturn/cyj4nPJmbK.jpg'],
    // background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled'  
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log(app.globalData.httpUrl);
    // console.log(wx.setStorageSync('ShopId'));
    var that = this;
    var article = '<div style="color:red">我是<br>HTML代码</div>';
    
    let obj = JSON.parse(options.jsonstr);
    this.setData({ shopDataInfo: obj });
    console.log(this.data.shopDataInfo);
    WxParse.wxParse('article', 'html', that.data.shopDataInfo.description, that, 5);
  
    wx.request({
      url: 'https://deve.luckcul.com/wshop/getTemplateById',
      data: {
        "requestHead": {
          "uuid": wx.getStorageSync("openid")
        },
        "requestBody": {
          "shopModel": {
            "nTemplateId": this.data.shopDataInfo.templateId,
            "nShopPrdId": this.data.shopDataInfo.cShopProdId,
            "nShopId": wx.getStorageSync('ShopId')
          }
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var arr = res.data.responseBody.data.templateProp;

        for (var i = 0; i < arr.length;i++){
          arr[i].pValueId = arr[i].pValueId.split(";");
          arr[i].pValue=[];
          arr[i].pKeyId = arr[i].pKeyId.split(":");
          arr[i].pId = [];
          arr[i].color = [];
          that.data.checkedSpec.push('');
          // that.data.specAttr[i].pValueId = that.data.specAttr[i].pValueId.split(";").split(":")[0];
        }
        for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < arr[i].pValueId.length; j++) {
            
            arr[i].pValue.push(arr[i].pValueId[j].split(":")[1]);
            arr[i].pId.push(arr[i].pValueId[j].split(":")[0]);
            console.log(arr);
            if (j == 0) {
              that.data.checkedSpec[i] += arr[i].pKeyId[0] + ":" + arr[i].pId[j];
              arr[i].color.push("#ff5b01");
            }else{
              arr[i].color.push("#cccccc");
            }
            
          }
        }
     
        var specStr = '';
   
        for (var i = 0; i < that.data.checkedSpec.length;i++){

          if (i==(that.data.checkedSpec.length-1)){
            specStr += that.data.checkedSpec[i];
          }else{
            specStr += that.data.checkedSpec[i] + ";";
          }
        }
        console.log(specStr);
        wx.request({
          url: 'https://deve.luckcul.com/wshop/getSkuByPrdId',
          data: {
            "requestHead": {
              "uuid": wx.getStorageSync("openid")
            },
            "requestBody": {
              "shopModel": {
                "nProductId": that.data.shopDataInfo.cShopProdId,
                "properties": specStr
              }
            }
          },
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {

            var specData = res.data.responseBody.data;
            console.log(specData);
            specData.priceSupply = specData.priceSupply / 100;
            that.setData({
              nowSpec: specData
            })
            console.log(that.data.nowSpec);
          }
        })
        that.setData({
          specAttr: res.data.responseBody.data.templateProp
        })
      }
    })
  },
  isShow:function(){
    this.data.show = "none";
    var that = this; 
    that.setData({
      show: that.data.show
    })
  },
  selectSpec: function () {
    this.data.show = "block";
    var that = this;
    that.setData({
      show: that.data.show
    })
  },
  clickSpec:function(e){
    console.log(e.currentTarget.dataset);
    console.log(this.data.specAttr);
    var index = e.currentTarget.dataset.index; //点击属性组的下标
    var indexs = e.currentTarget.dataset.indexs;//点击属性组所属的属性的下标
    var AttrId = e.currentTarget.dataset.specnameid;//属性组id
    var AttrIdson = e.currentTarget.dataset.specid;//属性值id
    var ClassId = e.currentTarget.dataset.classid; //属性id
    // indexs
    var that = this; 
    that.data.checkedSpec[index] = ClassId + ":" + AttrIdson;
    console.log(that.data.checkedSpec);
    for (var i = 0; i < that.data.specAttr[index].color.length;i++){
      that.data.specAttr[index].color[i]="#cccccc";
    }
    that.data.specAttr[index].color[indexs] = "#fd5d01";
    that.setData({
      specAttr: that.data.specAttr
    })
    var specStr = '';

    for (var i = 0; i < that.data.checkedSpec.length; i++) {

      if (i == (that.data.checkedSpec.length - 1)) {
        specStr += that.data.checkedSpec[i];
      } else {
        specStr += that.data.checkedSpec[i] + ";";
      }
    }
    wx.request({
      url: 'https://deve.luckcul.com/wshop/getSkuByPrdId',
      data: {
        "requestHead": {
          "uuid": wx.getStorageSync("openid")
        },
        "requestBody": {
          "shopModel": {
            "nProductId": that.data.shopDataInfo.cShopProdId,
            "properties": specStr
          }
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        
        var specData = res.data.responseBody.data;

        specData.priceSupply = specData.priceSupply/100;
        that.setData({
          nowSpec: specData
        })
        console.log(that.data.nowSpec);
      }
    })
  },
  buy:function(){
    // let str = JSON.stringify(this.data.shopDataInfo);
    // let strSpec = JSON.stringify(this.data.checkedSpec);
    var obj = {};
    var arr = [];
    obj.shopPrdId = this.data.shopDataInfo.cShopProdId;
    obj.shopSkuId = this.data.nowSpec.nShopSkuId;
    obj.amount = this.data.num;
    obj.unitPrice = this.data.nowSpec.priceSupply * 100;
    obj.specifications = this.data.nowSpec.name;
    arr.push(obj);
    var totalPrice = obj.amount * obj.unitPrice;
    var dataMsg = JSON.stringify(arr);
    wx.navigateTo({
      url: "../sureOrder/sureOrder?totalPrice=" + totalPrice + "&skuData=" + dataMsg
    })
    // let str = JSON.stringify(e.currentTarget.dataset.shop);
    // wx.navigateTo({
    //   url: "../shopMsg/shopMsg?jsonstr=" + str
    // })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  }  
})
