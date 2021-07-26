import { post } from '../../request/index'
import UserManager from '../../user/manager'

Page({
  login() {
    // @ts-ignore
    if (wx.getUserProfile) {
      wx.getUserProfile({
        desc: '用户登录',
        success: res => {
          wx.login({
            success: r => this.doLogin(r.code, res)
          })
        }
      })
    } else {
      wx.login({
        success: res => {
          let code = res.code
          wx.getUserInfo({
            withCredentials: true,
            success: res => this.doLogin(code, res)
          })
        }
      })
    }
  },

  doLogin(code: string, res: any) {
    wx.showLoading({ title: '登录中' })
    post('/users/sign_in', {
      code,
      user_info: res.userInfo,
      raw_data: res.rawData,
      signature: res.signature,
      encrypted_data: res.encryptedData,
      iv: res.iv
    }).then(res => {
      wx.hideLoading()
      let data = res.data
      UserManager.setTokens(data.user_id, data.access_token, data.refresh_token)

      wx.redirectTo({ url: '/pages/index/index' })
    }).catch(() => {
      wx.hideLoading()
      wx.showToast({
        title: '登录失败，请重新尝试',
        icon: 'none'
      })
    })
  }
})
