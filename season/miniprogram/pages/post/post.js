// miniprogram/pages/post/post.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow: false,//授权弹框
    imagePath:'../../images/post-bg.jpg',//图片src
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu()
  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function () {
    let that  = this
    if(wx.getStorageSync('session3rd_0809')){
      this.getImg()
    }else{
       app.getCodeLogin().then(()=>{
         that.getImg()
       })
    }
    
  },
  getImg(){//获取海报
    let pamras= {
      session3rd: wx.getStorageSync('session3rd_0809'),
      master_id : wx.getStorageSync('masterId_0809'),
    }
    app.wxRequsetAdd('POST', '/wxapi/SlotMachine/get_poster_info', pamras,res=>{
     
     this.setData({
      imagePath:res.data.poster
     })
    })
  },
  savaImage(){//保存图片
    var that = this;
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
      wx.getImageInfo({
        src: that.data.imagePath,
        success: function (res) {
          let tmpPath = res.path
          wx.getSetting({
            success(res) {
            console.log(res)
              if (!res.authSetting['scope.writePhotosAlbum']) { //未允许使用相册
                wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success:function(){
                    wx.hideLoading()
                    wx.saveImageToPhotosAlbum({
                      filePath: tmpPath,
                      success:function(res){
                        wx.showModal({
                          content: '图片已保存到相册，赶紧晒一下吧~',
                          showCancel: false,
                          confirmText: '好的',
                          confirmColor: '#333',
                          success: function (res) {
                            console.log('保存成功')
                            wx.redirectTo({
                              url: '/pages/first/first',
                            })
                            // that.closePoste();
                          }
                        })
                      },
                      fail:function(res){
                        wx.hideLoading()
                        wx.showToast({
                          title: '保存失败',
                          icon: 'none',
                          duration: 2400
                        })
                      }
                    })
                  },
                  fail(res){
                    wx.hideLoading()
                    that.setData({
                      modalShow: true
                    })
                  }
                })
              }else{  //已允许使用相册
                wx.saveImageToPhotosAlbum({
                  filePath: tmpPath,
                  success(result){
                    wx.hideLoading()
                    wx.showModal({
                      content: '图片已保存到相册，赶紧晒一下吧~',
                      showCancel: false,
                      confirmText: '好的',
                      confirmColor: '#333',
                      success: function (res) {
                        wx.redirectTo({
                          url: '/pages/first/first',
                        })
                        // that.closePoste();
                      }
                    })
                  },
                  fail:function(res){
                    wx.hideLoading()
                    wx.showToast({
                      title: '保存失败',
                      icon: 'none',
                      duration: 2400
                    })
                  }
                })
              }
            }
          })
        }
      })
  },
  closePower(){//关闭弹框
    this.setData({
      modalShow: false
    })
  },
})