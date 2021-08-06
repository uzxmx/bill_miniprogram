const app = getApp<IAppOption>()

import { get } from '../../request/index'

import UserManager from '../../user/manager'

Page({
  data: {
    authenticated: false,
    currentTab: 0,
    tabs: [
      {
        text: '货物',
        iconPath: "../../../assets/images/icon-goods.png",
        selectedIconPath: "../../../assets/images/icon-goods-active.png",
      },
      {
        text: "账目",
        iconPath: "../../../assets/images/icon-bill.png",
        selectedIconPath: "../../../assets/images/icon-bill-active.png",
      },
      {
        text: '我的',
        iconPath: "../../../assets/images/icon-profile.png",
        selectedIconPath: "../../../assets/images/icon-profile-active.png",
      }
    ]
  },

  onLoad() {
    if (!UserManager.isAuthenticated()) {
      wx.redirectTo({ url: '/pages/login/index' })
    } else {
      this.setData({ authenticated: true })

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

  onShow() {
    this.selectComponent("#cargo-list").onShow()
    this.selectComponent("#bill-list").onShow()
  },

  onTabChange(e: any) {
    this.setData({ currentTab: e.detail.index })
  }
})
