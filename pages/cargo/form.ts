import { post } from '../../request/index'

Page({
  data: {
    formData: {
      name: '',
      note: '',
    },
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
    post('/cargoes', formData).then(res => {
      wx.hideLoading()
      wx.redirectTo({ url: `/pages/cargo/details?id=${res.data.id}` })
    }).catch(() => {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败，请重新尝试',
        icon: 'none'
      })
    })
  }
})
