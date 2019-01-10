//sureOrder.js
//获取应用实例
const app = getApp()

Page({
    data: {
        text: 'init data',
        message: 'This is message',
        num: 0,
        array: [{text: 'init data'}],
        myArray: [1,2,3,4,5,6],
        view: 'WEBVIEW',
        object: {
            text: 'init data'
        },
        staffA: {firstName: 'Hulk', lastName: 'Hu'},
        staffB: {firstName: 'Shang', lastName: 'You'},
        staffC: {firstName: 'Gideon', lastName: 'Lin'}

    },
    changeText: function() {
        // this.data.text = 'changed data'  // bad, it can not work
        this.setData({
            text: 'changed data'
        })
    },
    changeNum: function() {
        this.data.num = 1
        this.setData({
            num: this.data.num
        })
    },
    changeItemInArray: function() {
        // you can use this way to modify a danamic data path
        this.setData({
            'array[0].text':'changed data'
        })
    },
    changeItemInObject: function(){
        this.setData({
            'object.text': 'changed data'
        });
    },
    addNewField: function() {
        this.setData({
            'newField.text': 'new data'
        })
    },
    clickBtn: function (event) {
        console.log('这是一个按钮点击事件');
        console.log(event);
    },
    bindViewTap:function(event){
        event.currentTarget.dataset.betaAlpha === 1 // - 会转为驼峰写法
        event.currentTarget.dataset.myName === 2 // 大写会转为小写
        console.log(event);
    }
})