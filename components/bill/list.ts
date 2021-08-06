import { get } from '../../request/index'

Component({
  data: {
    bills: []
  },

  lifetimes: {
    attached() {
      this.load()
    }
  },

  methods: {
    load() {
      get('/bills').then(res => {
        this.setData({ bills: res.data })
      })
    },

    addBill() {
      wx.navigateTo({ url: '/pages/bill/form' })
    },

    onShow() {
      this.load()
    }
  }
})
