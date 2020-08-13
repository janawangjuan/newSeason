// miniprogram/pages/first/first.js
const app = getApp()
const until = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reciveState:'state',//弹框状态，state: 领取状态，ruler: 活动规则，main: 我的奖品及排行榜，help ：助力页显示， 中奖提示:prizeTips
    formState:'form', // success: 表单领取成功， fail: 表单领取失败 , form: 领取表单
    modalFlag:false, //是否显示遮罩层
    btnType:'userinfo',//按钮状态，getUserInfo：获取个人昵称
    mainTab:1,//2：贡献榜， 1：我的奖品
    hlepState:'help', //助力页状态，help:立即帮助， join:我也要参与
    play:false,//抽检按钮是否可点击
    startImg: "start",//开始抽奖图片
    prizeTime:'*',//抽奖次数
    animationData: {},//分享弹框动画
    nowPrize:{//当前获得奖品
      img:1, //奖品id
      imgUrl:'../../images/prize-img1.png', //奖品图片
      txt:'您已领取100元课程优惠券，\n请登录中博教育， 在【会员中心】查看使用'
    },
    redEnvelopeList0: [ //奖品列表
      {
        img:1, //奖品id
        imgUrl:'../../images/prize-img1.png', //奖品图片
        name:'100元课程优惠券',
        txt:'您已领取100元课程优惠券，\n请登录中博教育， 在【会员中心】查看使用',
        abbreviation:'课程优惠券'
      },
      {
        img:2,
        imgUrl:'../../images/prize-img2.png', //奖品图片
        name:'10元全国话费',
        txt:'您已领取10元全国通用话费，\n 请留意充值短信提醒，工作日24小时内充值 到账，节假日顺延',
        abbreviation:'全国话费'
      }, 
      {
        img:3,
        imgUrl:'../../images/prize-img3.png', //奖品图片
        name:'军训晒不黑（安耐晒）',
        txt:'您已领取军训晒不黑（安耐晒）1份，礼品将在活动结束后20个工作日内寄出，请耐心 等待，客服咨询请添加微信“Joyce-mmd”',
        abbreviation:'安耐晒'
      }, 
      {
        img:4,
        imgUrl:'../../images/prize-img4.png', //奖品图片
        name:'中博定制帆布袋',
        txt:'您已领取中博定制帆布袋1份，礼品将在活动 结束后20个工作日内寄出，请耐心等待， 客服咨询请添加微信“Joyce-mmd”',
        abbreviation:'定制帆布袋'
      }, {
        img:5,
        imgUrl:'../../images/prize-img5.png', //奖品图片
        name:'食堂补贴（美团或饿了么红包券）',
        txt:'您已获得食堂补贴券1张\n 请登录【美团】或【饿了么】查看使用',
        abbreviation:'食堂补贴'
      }, {
        img:6,
        imgUrl:'../../images/prize-img6.png', //奖品图片
        name:'大学英语四级通关课程',
        txt:'您已领取该课，请领取后兑换激活学习',
        abbreviation:'通关课程'
      }, {
        img:7,
        imgUrl:'../../images/prize-img7.png', //奖品图片
        name:'三只松鼠零食大礼包',
        txt:'您已领取三只松鼠零食大礼包1份，礼品将在 活动结束后20个工作日内寄出，请耐心等待， 客服咨询请添加微信“Joyce-mmd”',
        abbreviation:'零食大礼包'
      }, {
        img:8,
        imgUrl:'../../images/prize-img8.png', //奖品图片
        name:'kindel电子书',
        txt:'您已领取kindle电子书1份，礼品将在活动 结束后20个工作日内寄出，请耐心等待， 客服咨询请添加微信“Joyce-mmd”',
        abbreviation:'kindel'
      }
    ],
   
    animation0: 0,//第一列滚动
    animation1:-45,//第二列滚动
    animation2:-90,//第三列滚动
    listPrize1:1,
    listPrize2:2,
    listPrize3:3,
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    show: true,
    flashing: true,
    tipArr:[ ],
  
    rulerArr:[
      {
        txt:'邀请好友抽奖，被邀请好友需为中博新用户方可 解锁参与；'
      },
      {
        txt:'抽奖小程序会自动统计并开启抽奖功能，每邀请 3位新用户，抽奖功能自动开启； '
      },
      {
        txt:'不满足抽奖条件，抽奖功能不开启；'
      },
      {
        txt:'退出小程序后再次扫码进入或在小程序列表中进 入，可查看活动参与情况及抽奖情况； '
      },
      {
        txt:'兑奖时请如实填写有效个人信息，方便奖品及时 兑换到个人账户； '
      },
      {
        txt:'多次获得同一奖项的只发放一次此奖励；'
      },
      {
        txt:'实物奖品将在活动结束后20个工作日之内联系兑 换，请耐心等候； '
      },
      {
        txt:'发现恶意参与者中博教育有权取消其参与资格； '
      },
      {
        txt:'本活动最终活动解释权在法律允许的范围内归中 博教育所有；'
      }
    ],
    mainPrize:[ //我的奖品
    ],
    rankObj:{}, //排行榜数组
  },
  showSucModal(event){//已领取过，点击展示
    let that = this
    const prizeNowDetail = event.currentTarget.dataset.items
    if(event.currentTarget.dataset.state==1){
      this.setData({
        nowPrize:prizeNowDetail,
        reciveState:'state',//弹框状态，state: 领取状态，ruler: 活动规则，main: 我的奖品及排行榜，help ：助力页显示， 中奖提示:prizeTips
        formState:'success', // success: 表单领取成功， fail: 表单领取失败 , form: 领取表单
        modalFlag:true, //是否显示遮罩层
      },() => {
        that.isEnglish()
      })
    }
  },
  copyMain(e){ //拷贝文本
    let txtLink = ''
    let that  = this
    if(e.target.dataset.tab=='mei'){
      txtLink = "https://www.zbgedu.com/E/2020meituan"
    }else{
      txtLink = "https://www.zbgedu.com/E/2020eleme"
    }
    wx.setClipboardData({
      data: txtLink,
      success(res){
        wx.showModal({
          title: '恭喜',
          content:'链接已复制，请到浏览器内打开'
        });
        if (res.confirm) {
          that.setData({
            modalFlag:false
          })
        }
      }
    })
  },
  onLoad: function (options) {//生命周期函数--监听页面加载
    if(options&&options.masterId){
      console.log('分享参数====='+options.masterId)
      wx.setStorageSync('linkMasterID_id0809',options.masterId)
      this.setData({
        modalFlag:true,
        reciveState:'help'
      })
    }
    if(options&&options.scene){
      console.log('分享参数二维码====='+options.scene)
      wx.setStorageSync('linkMasterID_id0809',options.masterId)
      this.setData({
        modalFlag:true,
        reciveState:'help'
      })
    }
  },
  onShareAppMessage: function () {//用户点击右上角分享
    return{
      title: '开学啦开学啦！',
      path: '/pages/first/first?masterId='+wx.getStorageSync('masterId_0809'),
      imageUrl:'../../images/share-img.jpg'
    }
  },
  joinTab(){//我也要参与
    console.log('我也要参与')
    this.setData({
      modalFlag:false
    })
    this.surpluSum() //抽奖次数
    this.drawList()//中奖滚动信息
    this.myDraw()//我的奖品
    this.helpRanking()//贡献榜
  },
  madePost(){//跳转到海报页
    wx.navigateTo({
      url: '/pages/post/post',
    })
  },
  helpOther(){//助力接口
    let pamras= {
      session3rd: wx.getStorageSync('session3rd_0809'),
      master_id : wx.getStorageSync('linkMasterID_id0809'),
      is_new: wx.getStorageSync('isnew_0809')
    }
    console.log('助力接口参数')
    console.log(pamras)
    app.wxRequsetAdd('POST', '/wxapi/SlotMachine/draw_help', pamras,res=>{
      if(res.state=='success'){
        this.setData({
          hlepState:'join',
          reciveState:'help'
        })
      }else{
        until.showTip(res.msg)
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/transite/transite',
          })
        }, 2500);
      }
    })
  },
  toWeb(){//跳转到webview
    wx.navigateTo({
      url: '/pages/moreAction/moreAction?link="https://wwww.zbgedu.com"',
    })
  },
  onReady: function () {//初次渲染
    this.lamp()
  },
  getCodes(){ //获取session3rd
    let that = this
    wx.login({
      success: function (res) {
        app.wxRequset('post', '/wxapi/SlotMachine/code2login',{"code": res.code,"partId":""},res=>{
          if(res.state=='success'){
            wx.setStorageSync('session3rd_0809', res.data.session3rd)
            wx.setStorageSync('isnew_0809', res.data.is_new)
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

          }else{
            console.log('options中login有误')
          }
        })
      }
    })
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
  showForm(event){//我的奖品--领取事件
    let that = this
    const prizeNowDetail = event.currentTarget.dataset.items
    const lotteryIds = event.currentTarget.dataset.lottery
    
    if(event.currentTarget.dataset.state==0){//未领取，显示表单
      wx.setStorageSync('lottery_id0809',lotteryIds)
      this.setData({
        nowPrize:prizeNowDetail
      },() => {
        that.getPrizeBtn()
      })
    }else if(event.currentTarget.dataset.state==1){//已领取
      that.setData({
        nowPrize:prizeNowDetail,
        reciveState:'state',//弹框状态，state: 领取状态，ruler: 活动规则，main: 我的奖品及排行榜，help ：助力页显示， 中奖提示:prizeTips
        formState:'success', // success: 表单领取成功， fail: 表单领取失败 , form: 领取表单
        modalFlag:true, //是否显示遮罩层
      },()=>{
        that.isEnglish()
      })
    }else{//已领完
      until.showTip('亲，该奖品已被领完啦！')
    }
  },
  isEnglish(){//是否为英语课程
    if(this.data.nowPrize.img==6){
      wx.setClipboardData({
        data: 'https://shop44276467.youzan.com/v2/ump/promocard/fetch?alias=4y5kgfhy',
        success(res){
          wx.showModal({
            title: '恭喜',
            content:'课程连接已复制，请到浏览器内打开'
          });
          if (res.confirm) {
            that.setData({
              modalFlag:false
            })
          }
        }
      })
    }else{
      console.log('非英语课')
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.reciveState=='help'){ //他人助力页面
      this.getCodes()
    }else{ //
      this.surpluSum() //抽奖次数
      this.drawList()//中奖滚动信息
      this.myDraw()//我的奖品
      this.helpRanking()//贡献榜
    }
  },


  getPrizeBtn(){//点击立即领取
    let pamras= {
      session3rd: wx.getStorageSync('session3rd_0809')
    }
    app.wxRequsetAdd('POST', '/wxapi/SlotMachine/is_receive', pamras,res=>{
      if (res.state =='success'){
        if(res.code==1){ //需要添加信息
          this.setData({
            modalFlag:true,
            reciveState:'state',
            formState:'form'
          })
        }else{ //不需要添加信息
          this.isEnglish()
          let pamrasU= {
            session3rd: wx.getStorageSync('session3rd_0809'),
            lottery_id:  wx.getStorageSync('lottery_id0809')
          }
          app.wxRequsetAdd('POST', '/wxapi/SlotMachine/give_prize', pamrasU,res=>{
            if (res.state =='success'){
               this.setData({
                modalFlag:true,
                reciveState:'state',
                formState:'success',
              })
              this.isEnglish()
            }else{
              this.setData({
                modalFlag:true,
                reciveState:'state',
                formState:'fail',
              })
            }
          })
        }
      }else{
        until.showTip(res.msg)
      }
    })
  },
  
  receivePrize(event){//领奖信息补充接口(填写表单)
    let {username, phone,adress} = event.detail.value
    username = username.replace(/\s+/g, '')
    phone = phone.replace(/\s+/g, '')
    adress = adress.replace(/\s+/g, '')
    if(username&&phone&&adress){
      if(until.isPhone(phone)){
        let pamras= {
          session3rd: wx.getStorageSync('session3rd_0809'),
          name:username,
          mobile:phone,
          address:adress
        }
        app.wxRequset('POST', '/wxapi/SlotMachine/receive_prize', pamras,res=>{
          console.log(res)
          if (res.state =='success'){
            this.setData({
              reciveState:'state',
              formState:'form',
            })
          }else{
            this.setData({
              reciveState:'state',
              formState:'fail',
            })
          }
        })
      }else{
        until.showTip('手机号不正确')
      }
    }else{
      until.showTip('必填项不能为空')
    }
    
    
  },
  myDraw(){ //我的中奖信息
    let pamras= {
      session3rd: wx.getStorageSync('session3rd_0809')
    }
    app.wxRequset('POST', '/wxapi/SlotMachine/my_draw', pamras,res=>{
      this.setData({
        mainPrize:res.data
      })
      if (res.state =='success'){
      }else{
        until.showTip(res.msg)
      }
    })
  },
  helpRanking(){//贡献排行榜
    let pamras= {
      session3rd: wx.getStorageSync('session3rd_0809')
    }
    app.wxRequset('POST', '/wxapi/SlotMachine/help_ranking', pamras,res=>{
      if (res.state =='success'){
        this.setData({
          rankObj:res.data
        })
      }else{
        until.showTip(res.msg)
      }
    })
  },
  /**
   * @params lamp 跑马灯封装
   */
  lamp() {
    let flashing = !this.data.flashing;
    this.setData({
      flashing: flashing
    }, () => {
      setTimeout(() => {
        this.lamp();
      }, 500);
    });
  },
  start() {//抽奖动画及接口调用
    const that = this;
    //切换按钮，模拟按钮
    this.setData({
      play: false,
      startImg:'start-gray'
    })
    setTimeout(() => {
      this.setData({
        startImg:'start'
      })
    }, 200);
    setTimeout(() => {
      this.setData({
        play:true
      })
    }, 3000);

    // const numArrs = 6
    // const one = numArrs - this.data.listPrize1
    // const two =  numArrs - this.data.listPrize2
    // const three =  numArrs - this.data.listPrize3
    // that.setData({
    //   animation0: this.data.animation0 + one*-45 -720,
    //   animation1:this.data.animation1 + two*-45-720,
    //   animation2:this.data.animation2 + three*-45-720,
    //   nowPrize:this.data.redEnvelopeList0[numArrs-1],//当前获得奖品
    //   listPrize1:numArrs,
    //   listPrize2:numArrs,
    //   listPrize3:numArrs,
    // })
    // setTimeout(() => {
    //   that.setData({
    //     reciveState:'prizeTips',
    //     modalFlag:true
    //   })
    // }, 3000);
    // return false;



    //  重置数组顺序后转动两圈
    this.setData({
    }, () => {
      let pamras= {
        session3rd: wx.getStorageSync('session3rd_0809')
      }
      app.wxRequset('POST', '/wxapi/SlotMachine/draw_join', pamras,res=>{//抽奖滚动接口
        if (res.state =='success'){
          const numArrs = res.data.prize_id
          
          // 每个奖品 45deg  滚动多少次
          const one = numArrs - this.data.listPrize1
          const two =  numArrs - this.data.listPrize2
          const three =  numArrs - this.data.listPrize3
          that.setData({
            animation0: this.data.animation0 + one*-45 -720,
            animation1:this.data.animation1 + two*-45-720,
            animation2:this.data.animation2 + three*-45-720,
            nowPrize:this.data.redEnvelopeList0[numArrs-1],//当前获得奖品
            listPrize1:numArrs,
            listPrize2:numArrs,
            listPrize3:numArrs,
          })
          wx.setStorageSync('lottery_id0809',res.data.lottery_id)
          
          //三秒后弹框中奖状况
          setTimeout(() => {
            that.setData({
              reciveState:'prizeTips',
              modalFlag:true
            })
          }, 3000);
        }else{
          until.showTip(res.msg)
        }
      })


      
    })
  },
  drawList(){//抽奖滚动列表
    let pamras= {
      session3rd: wx.getStorageSync('session3rd_0809')
    }
    app.wxRequset('POST', '/wxapi/SlotMachine/draw_list', pamras,res=>{
      if (res.state =='success'){
        this.setData({
          tipArr:res.data
        })
      }else{
        until.showTip(res.msg)
      }
    })
  },
  showRuler(event){//点击显示规则
    if(event.currentTarget.dataset.types=='main'){
      this.myDraw()
    }
    this.setData({
      modalFlag:true,
      reciveState:event.currentTarget.dataset.types
    })
    
  },
  closeModal(){ //关闭弹框
    this.setData({
      modalFlag:false
    })
  },
  changeTab(event){//切换奖品及贡献
    this.setData({
      mainTab:event.target.dataset.idx
    })
  },
  showModal() { // 显示遮罩层
    var that = this;
    that.setData({
      "hideModal": false,
      "tipFlag": false,
      "modalText":''
    })
    var animation = wx.createAnimation({
      duration: 300,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn();//调用显示动画
    }, 20)
  },
  // 隐藏遮罩层
  hideModalTap() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 300,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 320)//先执行下滑动画，再隐藏模块

  },
  surpluSum(){//抽奖次数显示
    let that = this
      let pamras= {
        session3rd: wx.getStorageSync('session3rd_0809')
      }
      app.wxRequsetAdd('POST', '/wxapi/SlotMachine/surplus_num', pamras,res=>{
        if (res.state =='success'){
          if(res.data.num>0){
            this.setData({
              play:true
            })
          }else{
            this.setData({
              play:false
            })
          }
          this.setData({
            prizeTime:res.data.num
          })
        }else{
          until.showTip(res.msg)
        }
        if(res.code==100){
          app.getCodeLogin()
          until.showTip('服务翘班啦，请刷新一次')
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/transite/transite',
            })
          }, 1000);
        }
      })
     
  },
  showTips(){ //提示无抽奖机会
    until.showTip('老铁，您的抽奖次数已用完！')
  },
  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
})