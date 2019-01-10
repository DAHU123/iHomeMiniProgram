//sureOrder.js
const app = getApp()
Page({
    data: {
        goBack: '../../utils/img/back.png',
        goTo: '../../utils/img/back.png',
        threeInfo: '../../utils/img/three.png',
        car: '../../utils/img/car.png',
        people: '../../utils/img/people.png',
        goodsImg: 'http://ihome-img-dev.oss-cn-beijing.aliyuncs.com/saturn/CjrSFfyMkW.jpg',
        hiddenBlack: true,
        hiddenMask: true,
        swiperHeight: 455 * 2 + 30,//其中一个的高度,乘以总的店铺个数,,另外再加上最后的一个间距 
        currentTab: 0,
        page:0,
        size:1.0,
        OrderData:[]
    },
    onLoad:function(){
        var that = this;
        that.showData();
    },
    onReachBottom:function(){
              console.log("上拉加载");
      
      var that = this;
      that.data.page = that.data.page + 1;
      wx.showLoading({
        title: '玩命加载中',
      })
        that.showData();
    },
    //查询订单列表
    showData: function () {
      console.log(app.globalData.UserId);
        var that = this;
        wx.request({
          url: 'https://deve.luckcul.com/wshop/order/listShoOrder',
          data: {
            "requestHead": {
              "uuid": wx.getStorageSync("openid")
            },
            "requestBody": {
              "shopOrderModel": {
                "orderStartTime": "2018-1-1 0:0:0",//开始时间
                "orderEndTime": "2019-1-1 0:0:0",//结束时间
                "sequence": "createTime",
                "personalId": wx.getStorageSync('UserId'),//个人id
                "order": "desc",
                "page": that.data.page,
                "size": that.data.size
              }
            }
          },
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data.responseBody.data);
            var dataArr = res.data.responseBody.data.content;

            for (var i = 0; i < dataArr.length; i++) {
              dataArr[i].mainImgs = dataArr[i].mainImgs.split(",");
              var arr = [];
              for (var j = 0; j < dataArr[i].mainImgs.length; j++) {
                if (dataArr[i].mainImgs[j] != "") {
                  arr.push(dataArr[i].mainImgs[j]);
                }
              }
              dataArr[i].mainImgs = arr;
            }
            that.data.OrderData = that.data.OrderData.concat(dataArr);
            that.setData({
              OrderData: that.data.OrderData
            })
            console.log(that.data.OrderData);
            // 隐藏加载框
            wx.hideLoading();
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
    //滑动切换
    swiperTab: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },
    //点击切换
    clickTab: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    }
})