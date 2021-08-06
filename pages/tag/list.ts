import { get } from '../../request/index'

Page({
  data: {
    tags: []
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    wx.showLoading({ title: '加载中' })
    get('/tags?tag_type=cargo_category').then(res => {
      wx.hideLoading()
      res.data.forEach((e: any) => {
        e.value = JSON.parse(e.value)
        e.valueStr = e.value.join(' / ')
      })
      this.setData({ tags: res.data })
    }).catch(() => {
      wx.hideLoading()
    })
  },

  onItemTap(e: any) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/tag/form?id=${id}` })
  },

  addTag() {
    wx.navigateTo({ url: '/pages/tag/form' })
  }
})
