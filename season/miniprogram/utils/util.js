const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const showTip = tip=>{
  wx.showToast({
    title: tip,
    mask:true,
    icon: 'none',
    duration: 2000
  })
}

//验证手机号
const isPhone = phone=>{
  let reg = /^1[3456789]\d{9}$/
  return reg.test(phone)
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  showTip: showTip,
  isPhone:isPhone//手机号验证
}
