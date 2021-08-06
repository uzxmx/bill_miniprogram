import { post } from '../../request/index'

Page({
  data: {
    categoryId: '',
    action: '',
    title: '',
    totalCount: 0,
    price: 0,
    createBill: true,
    formData: {
      delta: '',
      bill: {
        billed_at: ''
      }
    },
  },

  onLoad(options) {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    this.setData({
      categoryId: options.categoryId,
      action: options.action,
      title: options.action === 'incr' ? '入库' : '出库',
      totalCount: Number.parseInt(options.totalCount!),
      price: Number.parseFloat(options.price!),
    })

    let formData = this.data.formData
    formData.bill.billed_at = `${year}-${month}-${day}`
    this.setData({ formData })
  },

  onCreateBillChanged(e: any) {
    this.setData({ createBill: e.detail.value })
  },

  formInputChange(e: any) {
    const { field } = e.currentTarget.dataset
    if (field === 'delta') {
      let amount = e.detail.value * this.data.price
      console.log(amount)
      let formData = this.data.formData
      // @ts-ignore
      formData.bill.amount = amount
      // @ts-ignore
      formData.bill.actual_amount = amount
      this.setData({ formData })
    }
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
    if (!formData.delta) {
      this.showError(`请输入${this.data.title}数量`)
      return
    }

    if (this.data.createBill) {
      // @ts-ignore
      formData.create_bill = true
    } else {
      // @ts-ignore
      delete formData.create_bill
    }
    // @ts-ignore
    formData.action_type = this.data.action

    wx.showLoading({ title: '提交中' })
    post(`/cargo_categories/${this.data.categoryId}/update_count`, formData).then(() => {
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
})
