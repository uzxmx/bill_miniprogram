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

  updateCargo() {
    wx.navigateTo({ url: `/pages/cargo/form?id=${this.data.id}` })
  },

  deleteCargo() {
    wx.showModal({
      content: '是否确认删除该货物?',
      success: res => {
        if (res.confirm) {
          wx.showLoading({ title: '删除中' })
          // @ts-ignore
          del(`/cargoes/${this.data.cargo.id}`).then(() => {
            wx.hideLoading()
            wx.navigateBack()
          }).catch(() => {
            wx.hideLoading()
            wx.showToast({
              title: '请求失败，请重新尝试',
              icon: 'none'
            })
          })
        }
      }
    })
  },

  updateCategory(e: any) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/cargo/categoryForm?id=${id}` })
  },

  updateCount(e: any) {
    let { id, action, parentId } = e.currentTarget.dataset
    if (!parentId) {
      parentId = id
    }
    // @ts-ignore
    let category = this.data.cargo.categories.find((c: any) => c.id === parentId)
    let price = category.price
    let count
    if (parentId !== id) {
      count = category.children.find((c: any) => c.id === id).count
    } else {
      count = category.count
    }
    wx.navigateTo({ url: `/pages/cargo/updateCountForm?categoryId=${id}&action=${action}&totalCount=${count}&price=${price}` })
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
