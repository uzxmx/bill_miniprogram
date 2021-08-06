import { get, post, patch, del } from '../../request/index'
import deepClone from '../../utils/deepClone'

Page({
  data: {
    ready: false,
    bill: null,
    actualAmountUpdated: false,
    billTypes: [
      { name: '收入', value: 'income' },
      { name: '支出', value: 'spend' }
    ],
    formData: {
      name: '',
      bill_type: 'income',
      amount: null,
      billed_at: '',
      count: 1
    },
    selectedTag: '',
    tags: []
  },

  onLoad(options) {
    if (options.id) {
      wx.showLoading({ title: '加载中' })
      get(`/bills/${options.id}`).then(res => {
        wx.hideLoading()
        const bill = res.data
        const selectedTag = bill.tag
        const formData = bill
        this.setData({ bill, ready: true, selectedTag, formData })
      }).catch(() => {
        wx.hideLoading()
      })
    } else {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      this.setData({ ['formData.billed_at']: `${year}-${month}-${day}`, ready: true })
    }

    get('/tags?tag_type=bill').then(res => {
      if (res.data.length > 0) {
        const tags = JSON.parse(res.data[0].value)
        this.setData({ tags })
      }
    })
  },

  onBillTypeChanged(e: any) {
    this.setData({
      ['formData.bill_type']: e.detail.value
    });
  },

  onTagChanged(e: any) {
    this.setData({ selectedTag: e.detail.value })
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

    if (!formData.amount) {
      this.showError('请输入总金额')
      return
    }

    let data = deepClone(formData)
    data.tag = this.data.selectedTag

    wx.showLoading({ title: '提交中' })
    let promise
    if (this.data.bill) {
      // @ts-ignore
      promise = patch(`/bills/${this.data.bill.id}`, data)
    } else {
      promise = post('/bills', data)
    }
    promise.then(() => {
      wx.hideLoading()
      wx.navigateBack()
    }).catch(() => {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败，请重新尝试',
        icon: 'none'
      })
    })
  },

  deleteBill() {
    wx.showModal({
      content: '是否确认删除?',
      success: res => {
        if (res.confirm) {
          wx.showLoading({ title: '删除中' })
          // @ts-ignore
          del(`/bills/${this.data.bill.id}`).then(() => {
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
  }
})
