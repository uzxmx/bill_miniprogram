import UserManager from '../user/manager'

// const baseURL = "https://bill.kuaigonglian.com/api"
const baseURL = "http://localhost:3000/api"

function addAuthenticationHeaders(options: any) {
  if (!options.header) {
    options.header = {}
  }
  options.header['X-User-Id'] = UserManager.getUserId()
  options.header['X-User-Access-Token'] = UserManager.getAccessToken()
}

export function get(url: string, options: any = {}): Promise<any> {
  options.url = baseURL + url
  options.method = 'GET'
  addAuthenticationHeaders(options)
  return request(options)
}

export function post(url: string, data: any = null, options: any = {}): Promise<any> {
  options.url = baseURL + url
  options.method = 'POST'
  addAuthenticationHeaders(options)
  options.data = data
  return request(options)
}

export function patch(url: string, data: any = null, options: any = {}): Promise<any> {
  options.url = baseURL + url
  options.method = 'PUT'
  addAuthenticationHeaders(options)
  options.data = data
  return request(options)
}

export function del(url: string, options: any = {}): Promise<any> {
  options.url = baseURL + url
  options.method = 'DELETE'
  addAuthenticationHeaders(options)
  return request(options)
}

export function request(options: any): Promise<any> {
  return new Promise((resolve, reject) => {
    options.success = (res: any) => {
      if (res.statusCode >= 200 && res.statusCode < 400 && !res.data.err) {
        resolve(res)
      } else {
        if (res.statusCode === 401) {
          UserManager.clearTokens()
          wx.redirectTo({ url: '/pages/login/index' })
        }
        reject(res)
      }
    }
    options.fail = (err: any) => {
      reject(err)
    }
    wx.request(options)
  })
}
