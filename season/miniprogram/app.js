//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.globalData = {
      URL:'https://wwwdemo.zbgedu.com'
    }
    this.getCodeLogin()
    
  },
  /**
   * 封装wx.request请求方式
   * url:请求地址，data：需要传递的参数，callback:请求成功回调函数，errFun:请求失败回调函数，
   * */
  wxRequset(method, url, data, callback, errFun) {
    wx.request({
      url: this.globalData.URL + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json;charset=UTF-8;text/html;text/json;text/javascript;text/plain;application/octet-stream;multipart/form-data'
      },
      dataType: 'json',
      success: function (res) {
        callback(res.data)
      },
      fail: function (err) {
        wx.hideLoading()
        wx.showModal({
          title: '抱歉',
          content: '请求失败了呢！再试一下',
          showCancel: false,
          success(res) {

          }
        })
      }
    })
  },
  /**
   * 添加加载中状态
   * */
  wxRequsetAdd(method, url, data, callback, errFun) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: this.globalData.URL + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json;charset=UTF-8;text/html;text/json;text/javascript;text/plain;application/octet-stream;multipart/form-data'
      },
      dataType: 'json',
      success: function (res) {
        wx.hideLoading()
        callback(res.data)
      },
      fail: function (err) {
        wx.hideLoading()  
        wx.showModal({
          title: '抱歉',
          content: '请求失败了呢！再试一下',
          showCancel: false,
          success(res) {
          }
        })
      }
    })
  },
  // code登录
  getCodeLogin() {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: that.globalData.URL + '/wxapi/SlotMachine/code2login',
              data: { "code": res.code,"partId":wx.getStorageSync('partId_0225')||""},
              method: 'POST',
              header: {
                'Content-type': 'application/json'
              },
              success: function (res) {
                if(res.data.state=='success'){
                  wx.setStorageSync('session3rd_0809', res.data.data.session3rd);
                  const tn = res.data.data.session3rd
                  var res = {
                    status: 200,
                    data: res.data.session3rd
                  }
                  that.getUserId(tn)
                  resolve(res);
                  
                }else{
                  wx.showToast({
                    title: res.data.msg,
                    mask:true,
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            });
          } else {
            wx.hideLoading()
            console.log('获取用户登录态失败！' + res.errMsg)
            reject('error');
          }
        }
      })
    })
  },
  getUserId(sessions){ //获取用户ID
    let pamras= {
      session3rd: sessions|| wx.getStorageSync('session3rd_0809')
    }
    this.wxRequsetAdd('POST', '/wxapi/SlotMachine/get_user_id', pamras,res=>{
      if(res.state=='success'){
        wx.setStorageSync('masterId_0809',res.data.master_id)
      }
    })
  },

})
