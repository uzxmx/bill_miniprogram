import { post } from '../request/index'

class UploadManager {
  upload(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      post('/upload_tokens').then(res => {
        wx.uploadFile({
          url: 'https://upload.qiniup.com',
          filePath: path,
          name: 'file',
          formData: {
            token: res.data.token,
            key: res.data.key,
          },
          success: res => {
            res.data = JSON.parse(res.data)
            resolve(res)
          },
          fail: err => {
            reject(err)
          },
          complete: () => {
          }
        })
      }).catch(err => {
        reject(err)
      })
    });
  }

  getUrl(key: string): string {
    return `https://img.kangyu.co/${key}`
  }
}

export default new UploadManager()
