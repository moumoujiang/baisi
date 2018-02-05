//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sel:["全部","视频","图片","段子","声音"],
    selIndex: ["all", "video", "pic", "text", "voice"],
    changeIndex:[1,41,10,29,31],
    id:0,
    all:[],
    video:[],
    pic:[],
    text:[],
    voice:[],
    allmaxtime:null,
    videomaxtime: null,
    picmaxtime: null,
    textmaxtime: null,
    voicemaxtime: null,
    clientHeight:0,
    current:0 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //加载每个部分初始化内容
    var len = this.data.sel.length;
    for(var i=0;i<len;i++){
      var index = this.data.changeIndex[i];
      var str = this.data.selIndex[i];
      this.myAjax(index, str);
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            clientHeight: res.windowHeight

          });
        }
      });
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
    //获取当前索引值对应的type值
    var index = this.data.changeIndex[this.data.current];
    var str = this.data.selIndex[this.data.current];
    this.myAjax(index,str); 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  sel:function(e){
    //获取当前顶部导航的索引值
    var index = e.currentTarget.dataset.index;
    this.setData({
      current:index
    });
  },
  swiperChange:function(e){
    //获取当前滑块的索引值
    var current = e.detail.current;
    this.setData({
      current: current
    });
  },
  // 获取数据函数
  myAjax:function(typeIndex,str){//要获取的资源类型
    var that = this;
    // var maxtime = str+'maxtime';
    if(str == "all"){
      var maxtime = that.data.allmaxtime;
    } else if (str == "video"){
      var maxtime = that.data.videomaxtime;
    }else if (str == "pic") {
      var maxtime = that.data.picmaxtime;
    } else if (str == "text") {
      var maxtime = that.data.textmaxtime;
    } else if (str == "voice") {
      var maxtime = that.data.voicemaxtime;
    }
    wx.request({
      url: "https://api.budejie.com/api/api_open.php?a=list&c=data&type="+typeIndex+"&maxtime="+maxtime,
      success: function (res) {
       
        if(str=='all'){
          res.data.list = that.data.all.concat(res.data.list);
          that.setData({
            all: res.data.list,
            allmaxtime: res.data.info.maxtime
          })
        } else if (str == 'video'){
          res.data.list = that.data.video.concat(res.data.list);
          that.setData({
            video: res.data.list,
            videomaxtime: res.data.info.maxtime
          })
        }else if (str == 'pic') {
          res.data.list = that.data.pic.concat(res.data.list);
          that.setData({
            pic: res.data.list,
            picmaxtime: res.data.info.maxtime
          })
        } else if (str == 'text') {
          res.data.list = that.data.text.concat(res.data.list);
          that.setData({
            text: res.data.list,
            textmaxtime: res.data.info.maxtime
          })
        }else if(str == 'voice'){
          res.data.list = that.data.voice.concat(res.data.list);
          that.setData({
            voice: res.data.list,
            voicemaxtime: res.data.info.maxtime
          })
        }
        //弹出吐司
        wx.showToast({
          title: '内容加载完成',
          duration: 2000
        })
        // console.log(res.data);
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: '网络开小差了',
          icon:loading,
          duration: 2000
        })
      },
      complete: function (res) {
        // console.log("complete");
      },
    })
  },
  detail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
  },
  lookImg:function(e){
    var url = e.currentTarget.dataset.url;
    var w = e.currentTarget.dataset.width;
    var h = e.currentTarget.dataset.height;
    wx.navigateTo({
      url: '../img/img?url=' + url+"&width="+w+"&height="+h,
    })
  }
})