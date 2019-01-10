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
  goBack: function () {
    wx.navigateBack({
      delta: 1
    });
  },

})