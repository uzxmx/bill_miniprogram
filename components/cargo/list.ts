import { get } from '../../request/index'

Component({
  data: {
    cargoes: []
  },

  lifetimes: {
    attached() {
      this.load()
    }
  },

  methods: {
    load() {
      get('/cargoes').then(res => {
        this.setData({ cargoes: res.data })
      })
    },

    addCargo() {
      wx.navigateTo({ url: '/pages/cargo/form' })
    },

    onShow() {
      this.load()
    }
  }
})
