import { get, patch } from '../../request/index'

Page({
  data: {
    as: '',
    requests: [],
  },

  onLoad(options) {
    this.loadData(options.as)
  },

  loadData(as: any) {
    wx.showLoading({ title: '加载中' })
    get(`/workspace_requests?as=${as}`).then(res => {
      wx.hideLoading()
      res.data.forEach((e: any) => {
        let statusDesc
        switch (e.status) {
          case 'allowed':
            statusDesc = '已通过'
            break
          case 'rejected':
            statusDesc = '被拒绝'
            break
          default:
            statusDesc = '等待处理'
            break
        }
        e.statusDesc = statusDesc
      })

      this.setData({ as, requests: res.data })
    }).catch(() => {
      wx.hideLoading()
    })
  },

  updateStatus(e: any) {
    const { id, status } = e.currentTarget.dataset

    wx.showLoading({ title: '提交中' })
    patch(`/workspace_requests/${id}`, { status }).then(() => {
      wx.hideLoading()
      this.loadData(this.data.as)
    }).catch(() => {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败，请重新尝试',
        icon: 'none'
      })
    })
  }
})
