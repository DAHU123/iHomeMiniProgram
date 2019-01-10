//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        shopInfo:{},
        oneCList:[],
        twoCList:[],
        one_class:null,
        two_class:null,
        twoWidth:'500rpx',
        sequence:'cProductName',
        order:'asc',
        cClassifyId:'',
        twoClassifyId:'',
        goodsList:[],
        isDefault:1,
        isHidden:true,
    },
    onLoad: function () {

        this.oneClassifyLsit();
        this.twoClassifyLsit('');
        this.shopMessage();
        this.getProdList('');

        // var m = this.data.isDefault && this.data.isSort;
        // console.log(m);
        // this.setData({isSort:m});

    },

    shopMessage:function(){
        var that = this;
        wx.request({
            url: app.globalData.httpUrl + '/wshop/get',
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
                // console.log(res);
                that.setData({
                    shopInfo: res.data.responseBody.data.content
                });
            }
        })
    },

    // 获取一级分类
    oneClassifyLsit:function(){
        var that = this;
        wx.request({
            url: app.globalData.httpUrl + '/productClassify/list',
            data: {
                "requestHead": {
                    "uuid": wx.getStorageSync("openid")
                },
                "requestBody": {
                    "productClassifyModel": {
                        "nShopId": wx.getStorageSync('ShopId'),
                    }
                }
            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                let data = res.data.responseBody.data;
                // console.log(data);
                that.setData({
                    oneCList: data.content
                });
            }
        })
    },

    // 获取二级分类
    twoClassifyLsit:function(nParentId){
        var _this = this;
        wx.request({
            url: app.globalData.httpUrl + '/productClassify/listChildren',
            data: {
                "requestHead": {
                    "uuid": wx.getStorageSync("openid")
                },
                "requestBody": {
                    "productClassifyModel": {
                        "nParentId": nParentId,
                        "nShopId": wx.getStorageSync('ShopId'),
                    }
                }
            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                let data = res.data.responseBody.data;
                // console.log(data);
                _this.setData({
                    twoCList: data.content
                });

                // 计算宽
                // console.log(_this.data.twoCList.length);
                if(data.content.length > 0){
                    let a = 300*data.content.length + 'rpx';
                    // _this.data.twoWidth = 20*data.content.length;
                    _this.setData({
                        twoWidth: a
                    });

                }else{
                    _this.setData({
                        twoWidth: '500rpx'
                    });
                };

            }
        })
    },

    // 切换一级分类
    oneClassClick: function (e) {
        // console.log(e.currentTarget);
        var pId = e.currentTarget.dataset.one_class;

        this.setData({one_class:pId});
        // console.log(pId);
        var cId ;
        if(pId == null){
            this.twoClassifyLsit('');
            this.data.cClassifyId = "" ;
            // this.setData({cClassifyId:"priceSupply"});
            cId = "";
        }else{
            this.twoClassifyLsit(pId.id);
            this.data.cClassifyId = pId.id ;
            cId = pId.id;
        };
        this.setData({two_class:null});

        this.getProdList(cId);


    },

    // 切换2级分类
    twoClassClick: function (e) {
        // console.log(e.currentTarget);
        var pId = e.currentTarget.dataset.two_class;

        this.setData({two_class:pId});
        var cId ;

        if(pId == null){
            // this.twoClassifyLsit('');
            this.data.twoClassifyId = "" ;
            cId = this.data.cClassifyId;
            // this.setData({cClassifyId:"priceSupply"});

        }else{
            // this.twoClassifyLsit(pId.id);
            this.data.twoClassifyId = pId.id ;
            cId = pId.id;

        };

        this.getProdList(cId);


    },

    // 获取店铺产品列表
    getProdList: function (cClassifyId) {
        var that = this;
        wx.request({
            url: app.globalData.httpUrl + '/wshop/listPrdsByShopId',
            data: {
                "requestHead": {
                    "uuid": wx.getStorageSync("openid")
                },
                "requestBody": {
                    "shopModel": {
                        "nShopId": wx.getStorageSync('ShopId'),
                        "cProductName": '',
                        "cClassifyId": cClassifyId,
                        "sequence": that.data.sequence,
                        "order": that.data.order,
                    }
                }
            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                let data = res.data.responseBody.data;

                console.log('商品列表',data);
                that.setData({
                    goodsList: data
                });
                if(data.length == 0){
                    that.setData({
                        isHidden: false
                    });
                }else{
                    that.setData({
                        isHidden: true
                    });
                };
            }
        })

    },

    // 按照销量排序
    sortBySale: function () {
        console.log('暂时不做');
    },

    // 按照价格排序
    sortByPrice: function () {
        if(this.data.isDefault == 1){
            this.setData({isDefault:2});
            this.data.order = "desc" ;
            this.setData({order:"desc"});

        }else{
            if(this.data.isDefault == 2){
                this.setData({isDefault:3});
                this.data.order = "asc" ;
                this.setData({order:"asc"});
                console.log(2);
            }else{
                this.setData({isDefault:2});
                this.data.order = "desc" ;
                this.setData({order:"desc"});
                console.log(3);

            };
        };
        // sequence:'cProductName',
        this.data.sequence = "priceSupply" ;
        this.setData({sequence:"priceSupply"});
        this.getProdList();

    },


    // shopInfo(e){
    //     let str = JSON.stringify(e.currentTarget.dataset.shop);
    //     wx.navigateTo({
    //         url: "../shopMsg/shopMsg?jsonstr="+str
    //     })
    // },

})
