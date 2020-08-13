// miniprogram/pages/transite/transite.js
const app = getApp()
const until = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    joinAllNumber:'****',// 参与人数
    btnType:'userinfo',//按钮状态，getUserInfo：获取个人昵称
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getUserInfo(e){//获取授权
    if(e.detail.errMsg.indexOf('fail')!=-1){
      console.log('拒绝了')
      until.showTip('您需要授权信息才能参与活动 ')
    }else{
      console.log('同意授权')
      let pamras= {
        session3rd: wx.getStorageSync('session3rd_0809'),
        encryptedData: e.detail.encryptedData,
        iv :e.detail.iv
      }
      app.wxRequsetAdd('POST', '/wxapi/SlotMachine/get_userinfo', pamras,res=>{
        if (res.state =='success'){
          wx.setStorageSync('schoolUser_0809', e.detail.userInfo)
          wx.setStorageSync('needPower_0809', 'phone')
          this.setData({
            btnType: "getPhoneNumber"
          })
        }else{
          until.showTip(res.msg)
        }
      })
    }
  },

  getPhoneNumber(e){//获取手机号
    if (e.detail.errMsg.indexOf('fail') != -1) {
      until.showTip('您需要授权手机号才能参与活动 ')
    } else {
      let pamras = {
        session3rd: wx.getStorageSync('session3rd_0809'),
        encryptedData: e.detail.encryptedData,
        iv : e.detail.iv
      }
      app.wxRequsetAdd('POST', '/wxapi/SlotMachine/number', pamras, res => {
        if (res.state == 'success') {
          this.setData({
            btnType: "allBtn"
          })
          this.nextAll()
        } else {
          until.showTip(res.msg)
        }
      })
    }
  },
  
  getUserId(sessions){ //获取用户ID
    let pamras= {
      session3rd: sessions|| wx.getStorageSync('session3rd_0809')
    }
    app.wxRequsetAdd('POST', '/wxapi/SlotMachine/get_user_id', pamras,res=>{
      if(res.state=='success'){
        wx.setStorageSync('masterId_0809',res.data.master_id)
      }else{
        until.showTip(res.msg)
      }
    })
  },
  nextAll(){//跳转时活动页
    wx.navigateTo({
      url: '/pages/first/first'
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
    this.getCodes()
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
  getJoinNumber(){ //获取活动参与人数
    app.wxRequset('post', '/wxapi/SlotMachine/join_count',{session3rd:wx.getStorageSync('session3rd_0809')},res=>{
      wx.hideLoading()
      if(res.state=='success'){
        this.setData({
          joinAllNumber:res.data.num
        })
      }else if(res.state=='error'){
        this.setData({
          joinAllNumber:res.data.num||'768'
        })
        until.showTip(res.msg)
      }
    })

  },
  getCodes(){ //获取session3rd
    let that = this
    wx.login({
      success: function (res) {
        app.wxRequset('post', '/wxapi/SlotMachine/code2login',{"code": res.code,"partId":""},res=>{
          if(res.state=='success'){
            wx.setStorageSync('session3rd_0809', res.data.session3rd);
            wx.setStorageSync('schoolUser_id_0809', res.data.user_id)
            wx.setStorageSync('needPower_0809',res.data.need_auth)
            let typeName = ''
            if(res.data.need_auth=='all'||res.data.need_auth=='userinfo'){
              typeName = 'userinfo' //获取昵称
            }else if(res.data.need_auth=='phone'){
              typeName = 'getPhoneNumber'//获取手机号
            }else {
              typeName = 'allBtn'//均已获取
            }
            that.setData({ 
              btnType: typeName
            })
            that.getJoinNumber()
            that.getUserId(res.data.session3rd)
          }else{
            console.log('options中login有误')
          }
        })
      }
    })
  }
})