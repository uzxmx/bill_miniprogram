const app = getApp<IAppOption>()

import { get } from '../../request/index'

import UserManager from '../../user/manager'

Page({
  data: {
    list: [
      {
            "text": "对话",
          //   "iconPath": "../../images/tabbar_icon_chat_default.png",
          // "selectedIconPath": "../../images/tabbar_icon_chat_active.png",
            // dot: true
      },
      {
        text: 'test'
      }
    ]
  },
  // 事件处理函数
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs',
  //   })
  // },
  onLoad() {
    if (!UserManager.isAuthenticated()) {
      wx.redirectTo({ url: '/pages/login/index' })
    } else {
      wx.showLoading({ title: '加载中' })
      get('/workspaces').then(res => {
        wx.hideLoading()
        if (res.data.length === 0) {
          wx.redirectTo({ url: '/pages/workspace/guide' })
        }
      }).catch(() => {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败，请重新尝试',
          icon: 'none'
        })
      })
    }
  },

  tabChange(e: any) {
    console.log('tabChange', e)
  }
})
