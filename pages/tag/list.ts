import { get } from '../../request/index'

Page({
  data: {
    tags: []
  },

  onLoad() {
    this.loadData()
  },

  loadData() {
    get('/tags?tag_type=cargo_category').then(res => {
      res.data.forEach((e: any) => {
        e.value = JSON.parse(e.value)
        e.valueStr = e.value.join(' / ')
      })
      this.setData({ tags: res.data })
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
