import { get, post, patch, del } from '../../request/index'
import deepClone from '../../utils/deepClone'

Page({
  data: {
    ready: false,
    tagType: '',
    tag: null,
    formData: {
      name: '',
    },
    tagValues: [{ id: 0, value: '' }],
  },

  onLoad(options) {
    if (options.id) {
      wx.showLoading({ title: '加载中' })
      get(`/tags/${options.id}`).then(res => {
        wx.hideLoading()
        const tagValues = JSON.parse(res.data.value).map((e: any, i: any) => { return { id: i, value: e } })
        const formData = { name: res.data.name }
        this.setData({ tag: res.data, tagValues, formData, ready: true })
      }).catch(() => {
        wx.hideLoading()
      })
    } else if (options.tagType === 'bill') {
      wx.showLoading({ title: '加载中' })
      get(`/tags?tag_type=${options.tagType}`).then(res => {
        wx.hideLoading()
        let tag, tagValues
        if (res.data.length > 0) {
          tag = res.data[0]
          tagValues = JSON.parse(tag.value).map((e: any, i: any) => { return { id: i, value: e } })
        } else {
          tagValues = this.data.tagValues
        }
        this.setData({ tag, tagValues, tagType: options.tagType, ready: true })
      }).catch(() => {
        wx.hideLoading()
      })
    } else {
      this.setData({ ready: true })
    }
  },

  addTagValue() {
    const tagValues = this.data.tagValues
    tagValues.push({ id: tagValues.length, value: '' })
    this.setData({ tagValues })
  },

  deleteTagValue(e: any) {
    const { id } = e.currentTarget.dataset
    const tagValues = this.data.tagValues

    if (tagValues[id].value) {
      wx.showModal({
        content: '是否确认删除该标签?',
        success: res => {
          if (res.confirm) {
            tagValues.splice(id, 1)
            this.setData({ tagValues })
          }
        }
      })
    } else {
      tagValues.splice(id, 1)
      this.setData({ tagValues })
    }
  },

  onTagValueChange(e: any) {
    const { id } = e.currentTarget.dataset
    const tagValues = this.data.tagValues
    tagValues[id].value = e.detail.value
    this.setData({ tagValues });
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
    const formData = this.data.formData

    if (this.data.tagType !== 'bill' && !formData.name) {
      this.showError('请输入标签名称')
      return
    }

    const tagValues = this.data.tagValues
    if (tagValues.length === 0) {
      this.showError('至少需要设置一个标签值')
      return
    }
    for (const v of tagValues) {
      if (!v.value) {
        this.showError('请输入标签值')
        return
      }
    }

    let data = deepClone(formData)
    data.tag_type = this.data.tagType || 'cargo_category'
    data.value = JSON.stringify(tagValues.map(e => e.value))

    wx.showLoading({ title: '提交中' })
    let promise
    if (this.data.tag) {
      // @ts-ignore
      promise = patch(`/tags/${this.data.tag.id}`, data)
    } else {
      promise = post('/tags', data)
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

  deleteTag() {
    wx.showModal({
      content: '是否确认删除该标签?',
      success: res => {
        if (res.confirm) {
          wx.showLoading({ title: '删除中' })
          // @ts-ignore
          del(`/tags/${this.data.tag.id}`).then(() => {
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
