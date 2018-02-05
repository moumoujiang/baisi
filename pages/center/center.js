var app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:null,
    username:'登录/注册',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userInfo.username != ""){
      this.setData({
        username: app.globalData.userInfo.username
      });
    }
    var userPhoto = app.globalData.userInfo.userPhoto;
    this.setData({
      src: userPhoto
    });
    wx.request({
      url: "https://api.budejie.com/api/api_open.php?a=square&c=topic",
      success: function(res) {
        console.log(res.data);
        that.setData({
          list:res.data.square_list
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  sign:function(e){
    wx.navigateTo({
      url: '../login/login',
      success: function (res) {
        console.log("login");
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  change_pic:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: [],
      sourceType: [],
      success: function(res) {
        // console.log(res);
        app.globalData.userInfo.userPhoto = res.tempFilePaths[0];
        var userPhoto = app.globalData.userInfo.userPhoto;
        that.setData({
          src: userPhoto
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})