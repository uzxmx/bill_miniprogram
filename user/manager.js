"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserManager = (function () {
    function UserManager() {
    }
    UserManager.prototype.getUserId = function () {
        return wx.getStorageSync('user_id');
    };
    UserManager.prototype.getAccessToken = function () {
        return wx.getStorageSync('access_token');
    };
    UserManager.prototype.getRefreshToken = function () {
        return wx.getStorageSync('refresh_token');
    };
    UserManager.prototype.clearTokens = function () {
        wx.setStorageSync('user_id', null);
        wx.setStorageSync('access_token', null);
        wx.setStorageSync('refreshToken', null);
    };
    UserManager.prototype.setTokens = function (userId, accessToken, refreshToken) {
        wx.setStorageSync('user_id', userId);
        wx.setStorageSync('access_token', accessToken);
        wx.setStorageSync('refreshToken', refreshToken);
    };
    UserManager.prototype.isAuthenticated = function () {
        return !!(this.getUserId() && this.getAccessToken());
    };
    UserManager.prototype.checkUser = function (options) {
    };
    return UserManager;
}());
exports.default = new UserManager();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQTtJQUFBO0lBc0NBLENBQUM7SUFyQ0MsK0JBQVMsR0FBVDtRQUNFLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBRUQsb0NBQWMsR0FBZDtRQUNFLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBRUQscUNBQWUsR0FBZjtRQUNFLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBRUQsaUNBQVcsR0FBWDtRQUNFLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2xDLEVBQUUsQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3ZDLEVBQUUsQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3pDLENBQUM7SUFFRCwrQkFBUyxHQUFULFVBQVUsTUFBYyxFQUFFLFdBQW1CLEVBQUUsWUFBb0I7UUFDakUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDcEMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDOUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFDakQsQ0FBQztJQUVELHFDQUFlLEdBQWY7UUFDRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQTtJQUN0RCxDQUFDO0lBRUQsK0JBQVMsR0FBVCxVQUFVLE9BQXlCO0lBUW5DLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUF0Q0QsSUFzQ0M7QUFFRCxrQkFBZSxJQUFJLFdBQVcsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBDaGVja1VzZXJPcHRpb25zIHtcbiAgc3VjY2VzczogKCkgPT4gdm9pZCB8IFByb21pc2U8dm9pZD5cbn1cblxuY2xhc3MgVXNlck1hbmFnZXIge1xuICBnZXRVc2VySWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJfaWQnKVxuICB9XG5cbiAgZ2V0QWNjZXNzVG9rZW4oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gd3guZ2V0U3RvcmFnZVN5bmMoJ2FjY2Vzc190b2tlbicpXG4gIH1cblxuICBnZXRSZWZyZXNoVG9rZW4oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gd3guZ2V0U3RvcmFnZVN5bmMoJ3JlZnJlc2hfdG9rZW4nKVxuICB9XG5cbiAgY2xlYXJUb2tlbnMoKSB7XG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJfaWQnLCBudWxsKVxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdhY2Nlc3NfdG9rZW4nLCBudWxsKVxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdyZWZyZXNoVG9rZW4nLCBudWxsKVxuICB9XG5cbiAgc2V0VG9rZW5zKHVzZXJJZDogc3RyaW5nLCBhY2Nlc3NUb2tlbjogc3RyaW5nLCByZWZyZXNoVG9rZW46IHN0cmluZykge1xuICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd1c2VyX2lkJywgdXNlcklkKVxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdhY2Nlc3NfdG9rZW4nLCBhY2Nlc3NUb2tlbilcbiAgICB3eC5zZXRTdG9yYWdlU3luYygncmVmcmVzaFRva2VuJywgcmVmcmVzaFRva2VuKVxuICB9XG5cbiAgaXNBdXRoZW50aWNhdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhISh0aGlzLmdldFVzZXJJZCgpICYmIHRoaXMuZ2V0QWNjZXNzVG9rZW4oKSlcbiAgfVxuXG4gIGNoZWNrVXNlcihvcHRpb25zOiBDaGVja1VzZXJPcHRpb25zKSB7XG4gICAgLy8gaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAvLyAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuc3VjY2Vzcykge1xuICAgIC8vICAgICBvcHRpb25zLnN1Y2Nlc3MoKVxuICAgIC8vICAgfVxuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICB0aGlzLmxvZ2luKG9wdGlvbnMpXG4gICAgLy8gfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBVc2VyTWFuYWdlcigpXG4iXX0=