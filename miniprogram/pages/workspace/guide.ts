const app = getApp<IAppOption>()

import { post } from '../../request/index'

Page({
  data: {
    action: '',
    firstWorkspace: true,
    name: '',
    createOrJoinBtnDisabled: true,
  },
  onLoad() {
  },

  onInput(e: any) {
    this.setData({ name: e.detail.value })
  },

  onCreateTap() {
    this.setData({ action: 'create' })
  },

  onJoinTap() {
    this.setData({ action: 'join' })
  },

  onCreateOrJoinTap() {
    let name = this.data.name
    if (!name) {
      wx.showToast({
        title: '请输入工作空间名称',
        icon: 'none'
      })
      return
    }

    let url = '/workspaces'
    if (this.data.action === 'join') {
      url += '/join'
    }
    wx.showLoading({ title: '处理中' })
    post(url, { name }).then(res => {
      wx.hideLoading()
      let message
      if (this.data.action === 'create') {
        message = '创建成功'
      } else {
        message = '已提交加入申请，请等待管理员审核'
      }
      wx.showToast({
        title: message,
        icon: 'none',
        complete: () => {
          if (this.data.action === 'create') {
            wx.redirectTo({ url: '/pages/index/index' })
          }
        }
      })
    }).catch(err => {
      wx.hideLoading()
      let message = '请求失败，请重新尝试'
      if (err && err.data && err.data.err) {
        switch (err.data.err.reason) {
          case 'err_already_exists':
            message = '该工作空间名称已被使用，请使用其他名称'
            break
          case 'err_not_exist':
            message = '该工作空间不存在'
            break
        }
      }
      wx.showToast({
        title: message,
        icon: 'none'
      })
    })
  },

  onSwitchActionTap() {
    let action = this.data.action
    if (action === 'create') {
      action = 'join'
    } else {
      action = 'create'
    }
    this.setData({ action })
  },
})
