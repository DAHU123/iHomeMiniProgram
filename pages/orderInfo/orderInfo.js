//sureOrder.js
var app = getApp() ;

Page({
    data: {
        goBack: '../../utils/img/back.png',
        goTo: '../../utils/img/centerRight.png',
        threeInfo: '../../utils/img/three.png',
        checkAll: '../../utils/img/checkAll.svg',
        infoAdd: '../../utils/img/infoAdd.png',
        hiddenBlack: true,
        hiddenMask: true,
        car: app.globalData.car,
        people: app.globalData.people,
        userLogo: 'http://ihome-img-dev.oss-cn-beijing.aliyuncs.com/saturn/CjrSFfyMkW.jpg',
        expressNum: '1234&nbsp;0000&nbsp;1234',
        address: '北京市朝阳区北京市朝阳区北京市朝阳区北京市朝阳区兆维工业园区民谐路6号',
        userNickName: '韩梅梅',
        userPhone: '15993342869'
    },
    goBack: function () {
        wx.navigateBack({
            delta: 1
        });
    },
    tabMMMM: function () {

        console.log(1111);
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