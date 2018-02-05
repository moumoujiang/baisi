//logs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    activeIndex:0,
    userList:[],
    id:null,
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "https://api.budejie.com/api/api_open.php?a=category&c=subscribe",
      success: function(res) {
        console.log(res.data);
        that.setData({
          list:res.data.list,
          id: res.data.list[0].id
        });
        that.myAjax(res.data.list[0].id,1);
      },
      fail: function(err) {
        console.log(err);
      },
      complete: function(res) {},
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
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
  tabChange:function(e){
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex:index,
      userList:[],
      id:id,
      page:1
    })
    this.myAjax(id,1);
  },
  myAjax:function(id,page){
    var that = this;
    wx.request({
      url: "https://api.budejie.com/api/api_open.php?a=list&c=subscribe&category_id="+id+"&page="+page,
      success: function (res) {   
        res.data.list = that.data.userList.concat(res.data.list);
        that.setData({
          userList:res.data.list
        })
        // console.log(that.data.userList);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  lower:function(e){
    var page = this.data.page + 1;
    var id = this.data.id;
    this.setData({
      page: page
    })
    this.myAjax(id, page);
  }
})
