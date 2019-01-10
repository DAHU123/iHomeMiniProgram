//sureOrder.js
var app = getApp() ;
Page({
    data: {
        message: 'This is message',
        goBack: '../../utils/img/back.png',
        goTo: '../../utils/img/back.png',
        threeInfo: '../../utils/img/three.png',
        userLogo: 'http://ihome-img-dev.oss-cn-beijing.aliyuncs.com/saturn/CjrSFfyMkW.jpg',
        userNickName: '用户昵称',
        hiddenBlack: true,
        hiddenMask: true,
        car: app.globalData.car,
        people: app.globalData.people,
        userPhone: '15993342869',
        goodsList: [
            {
                img:'http://ihome-img-dev.oss-cn-beijing.aliyuncs.com/saturn/CjrSFfyMkW.jpg'
            }
        ],

    },
    onLoad: function () {

    },

})