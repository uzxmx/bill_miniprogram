import { get, post, patch } from '../../request/index'

Page({
  data: {
    ready: false,
    cargo: null,
    formData: {
      name: '',
      note: '',
    },
  },

  onLoad(options) {
    if (options.id) {
      wx.setNavigationBarTitle({ title: '修改货物' })
      wx.showLoading({ title: '加载中' })
      get(`/cargoes/${options.id}`).then(res => {
        wx.hideLoading()
        const cargo = res.data
        const formData = cargo
        this.setData({ cargo, formData, ready: true })
      }).catch(() => {
        wx.hideLoading()
      })
    } else {
      wx.setNavigationBarTitle({ title: '添加货物' })
      this.setData({ ready: true })
    }
  },

  formInputChange(e: any) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  showError(error: string) {
    this.setData({
      error
    })
  },

  submit() {
    let formData = this.data.formData
    if (!formData.name) {
      this.showError('请输入货物名称')
      return
    }

    wx.showLoading({ title: '提交中' })
    let promise
    if (this.data.cargo) {
      // @ts-ignore
      promise = patch(`/cargoes/${this.data.cargo.id}`, formData)
    } else {
      promise = post('/cargoes', formData)
    }
    promise.then(res => {
      wx.hideLoading()
      if (this.data.cargo) {
        wx.navigateBack()
      } else {
        wx.redirectTo({ url: `/pages/cargo/details?id=${res.data.id}` })
      }
    }).catch(() => {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败，请重新尝试',
        icon: 'none'
      })
    })
  }
})
