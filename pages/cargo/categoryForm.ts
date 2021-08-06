import { get, post, patch } from '../../request/index'
import UploadManager from '../../upload/manager'
import deepClone from '../../utils/deepClone'

Page({
  data: {
    category: null,
    cargoId: '',
    parent: null,
    formData: {
      name: '',
      price: '',
      count: null,
      note: '',
    },
    photo: null,
    files: [],
    tag_selection: '_input',
    tag_selections: [],
    tag: null,
    tags: [],
  },

  onLoad(options) {
    if (options.id) {
      get(`/cargo_categories/${options.id}`).then(res => {
        const category = res.data
        const { name, price, count, note, photo } = category
        const formData = { name, price, count, note }

        // @ts-ignore
        let files = []
        if (category.photo) {
          files = [{ url: UploadManager.getUrl(photo), loading: false }]
        }

        // @ts-ignore
        this.setData({ category, formData, photo, files })
        this.loadTags(category.parent_id)
      })
      return
    }

    this.loadTags(options.parentId)

    this.setData({ cargoId: options.cargoId })
  },

  loadTags(parentId: any) {
    if (parentId) {
      get(`/cargo_categories/${parentId}`).then(res => {
        this.setData({ parent: res.data })
        this.doLoadTags()
      })
    } else {
      this.doLoadTags()
    }
  },

  doLoadTags() {
    get('/tags?tag_type=cargo_category').then(res => {
      let tag_selections = []
      res.data.forEach((e: any) => {
        // @ts-ignore
        if (!this.data.parent || this.data.parent.tag_id !== e.id) {
          tag_selections.push({ name: e.name, value: e.name })
        }
      })
      tag_selections.push({ name: '手动输入分类名称', value: '_input' })
      // @ts-ignore
      this.setData({ tag_selections })

      res.data.forEach((e: any) => {
        e.value = JSON.parse(e.value).map((v: string) => {
          return { name: v, value: v }
        })
      })
      this.setData({ tags: res.data })

      // @ts-ignore
      if (this.data.category && this.data.category.tag_id) {
        // @ts-ignore
        let tag = res.data.find((e: any) => e.id === this.data.category.tag_id)
        if (tag) {
          // @ts-ignore
          this.setData({ tag_selection: tag.name, tag: this.data.category.name })
        }
      }
    })
  },

  onTagSelectionChange(e: any) {
    this.setData({ tag_selection: e.detail.value });
  },

  onTagChange(e: any) {
    this.setData({ tag: e.detail.value });
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

  onUploadError() {
    wx.showToast({
      title: '图片上传失败',
      icon: 'none'
    })
  },

  uploadFile() {
    console.log(this.data.files)
    wx.showToast({
      title: 'uploadFile',
      icon: 'none'
    })
  },

  onSelectFile(e: any) {
    UploadManager.upload(e.detail.tempFilePaths[0]).then(res => {
      let files = [{ url: UploadManager.getUrl(res.data.key), loading: false }]
      // @ts-ignore
      this.setData({ files, photo: res.data.key })
    })
  },

  submit() {
    let formData = this.data.formData
    if (this.data.tag_selection === '_input') {
      if (!formData.name) {
        this.showError('请输入名称')
        return
      }
    } else {
      if (!this.data.tag) {
        this.showError(`请选择${this.data.tag_selection}`)
        return
      }
    }

    if (!formData.price) {
      this.showError('请输入价格')
      return
    }

    let data = deepClone(formData)
    data.photo = this.data.photo
    if (this.data.tag_selection !== '_input') {
      // @ts-ignore
      data.tag_id = this.data.tags.find((e: any) => e.name === this.data.tag_selection).id
      data.name = this.data.tag
    }
    if (this.data.parent) {
      // @ts-ignore
      data.parent_id = this.data.parent.id
    }

    wx.showLoading({ title: '提交中' })
    let promise
    if (this.data.category) {
      // @ts-ignore
      promise = patch(`/cargo_categories/${this.data.category.id}`, data)
    } else {
      promise = post(`/cargo_categories?cargo_id=${this.data.cargoId}`, data)
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
  }
})
