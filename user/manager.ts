export interface CheckUserOptions {
  success: () => void | Promise<void>
}

class UserManager {
  getUserId(): string {
    return wx.getStorageSync('user_id')
  }

  getAccessToken(): string {
    return wx.getStorageSync('access_token')
  }

  getRefreshToken(): string {
    return wx.getStorageSync('refresh_token')
  }

  setTokens(userId: string, accessToken: string, refreshToken: string) {
    wx.setStorageSync('user_id', userId)
    wx.setStorageSync('access_token', accessToken)
    wx.setStorageSync('refreshToken', refreshToken)
  }

  isAuthenticated(): boolean {
    return !!(this.getUserId() && this.getAccessToken())
  }

  checkUser(options: CheckUserOptions) {
    // if (this.isAuthenticated()) {
    //   if (options && options.success) {
    //     options.success()
    //   }
    // } else {
    //   this.login(options)
    // }
  }
}

export default new UserManager()
