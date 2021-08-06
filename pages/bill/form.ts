import { post } from '../../request/index'

Page({
  data: {
    actualAmountUpdated: false,
    billTypes: [
      { name: '收入', value: 'income', checked: true },
      { name: '支出', value: 'spend' }
    ],
    formData: {
      name: '',
      bill_type: 'income',
      amount: null,
      billed_at: '',
      count: 1
    },
  },

  onLoad() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    this.setData({ ['formData.billed_at']: `${year}-${month}-${day}` })
  },

  onBillTypeChanged(e: any) {
    const billTypes = this.data.billTypes
    billTypes.forEach((billType: any) => {
      billType.checked = billType.value === e.detail.value
    })

    this.setData({
      billTypes,
      ['formData.bill_type']: e.detail.value
    });
  },

  formInputChange(e: any) {
    const { field } = e.currentTarget.dataset

    if (field === 'amount' && !this.data.actualAmountUpdated) {
      this.setData({
        ['formData.actual_amount']: e.detail.value
      })
    }

    if (field === 'actual_amount') {
      this.setData({ actualAmountUpdated: true })
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
    if (!formData.name) {
      this.showError('请输入名称')
      return
    }

    console.log(formData.amount)
    if (!formData.amount) {
      this.showError('请输入总金额')
      return
    }

    wx.showLoading({ title: '提交中' })
    post('/bills', formData).then(res => {
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
