// pages/concerm/concerm.js
var app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userInfo.username == ""){
      wx.navigateTo({
        url: '../login/login',
        success: function (res) {
          that.setData({
            user:true
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      that.setData({
        user: false
      })
    }
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
  primary: function (e) {
    wx.navigateTo({
      url: '../login/login',
      success: function (res) {
        console.log("login");
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
  
})