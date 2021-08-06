import { get, del } from '../../request/index'
import UploadManager from '../../upload/manager'

Page({
  data: {
    id: '',
    cargo: {}
  },

  onLoad(options) {
    this.setData({ id: options.id })
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    wx.showLoading({ title: '加载中' })
    get(`/cargoes/${this.data.id}`).then(res => {
      wx.hideLoading()
      res.data.categories.forEach((e: any) => {
        if (e.photo) {
          e.photo_url = UploadManager.getUrl(e.photo)
        } else {
          e.photo_url = '../../assets/images/icon-package.png'
        }
      })
      this.setData({ cargo: res.data })
    }).catch(() => {
      wx.hideLoading()
    })
  },

  updateCategory(e: any) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/cargo/categoryForm?id=${id}` })
  },

  updateCount(e: any) {
    const { id, action } = e.currentTarget.dataset
    // @ts-ignore
    let category = this.data.cargo.categories.find((c: any) => c.id === id)
    wx.navigateTo({ url: `/pages/cargo/updateCountForm?categoryId=${id}&action=${action}&totalCount=${category.count}&price=${category.price}` })
  },

  addSubCategory(e: any) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/cargo/categoryForm?cargoId=${this.data.id}&parentId=${id}` })
  },

  deleteCategory(e: any) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      content: '是否确认删除该分类?',
      success: res => {
        if (res.confirm) {
          wx.showLoading({ title: '删除中' })
          del(`/cargo_categories/${id}`).then(() => {
            wx.hideLoading()
            this.loadData()
          }).catch(() => {
            wx.hideLoading()
          })
        }
      }
    })
  }
})
