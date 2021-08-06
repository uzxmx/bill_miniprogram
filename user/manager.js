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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQTtJQUFBO0lBZ0NBLENBQUM7SUEvQkMsK0JBQVMsR0FBVDtRQUNFLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBRUQsb0NBQWMsR0FBZDtRQUNFLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBRUQscUNBQWUsR0FBZjtRQUNFLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBRUQsK0JBQVMsR0FBVCxVQUFVLE1BQWMsRUFBRSxXQUFtQixFQUFFLFlBQW9CO1FBQ2pFLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3BDLEVBQUUsQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQzlDLEVBQUUsQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFFRCxxQ0FBZSxHQUFmO1FBQ0UsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUE7SUFDdEQsQ0FBQztJQUVELCtCQUFTLEdBQVQsVUFBVSxPQUF5QjtJQVFuQyxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBaENELElBZ0NDO0FBRUQsa0JBQWUsSUFBSSxXQUFXLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgQ2hlY2tVc2VyT3B0aW9ucyB7XG4gIHN1Y2Nlc3M6ICgpID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+XG59XG5cbmNsYXNzIFVzZXJNYW5hZ2VyIHtcbiAgZ2V0VXNlcklkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VyX2lkJylcbiAgfVxuXG4gIGdldEFjY2Vzc1Rva2VuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHd4LmdldFN0b3JhZ2VTeW5jKCdhY2Nlc3NfdG9rZW4nKVxuICB9XG5cbiAgZ2V0UmVmcmVzaFRva2VuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHd4LmdldFN0b3JhZ2VTeW5jKCdyZWZyZXNoX3Rva2VuJylcbiAgfVxuXG4gIHNldFRva2Vucyh1c2VySWQ6IHN0cmluZywgYWNjZXNzVG9rZW46IHN0cmluZywgcmVmcmVzaFRva2VuOiBzdHJpbmcpIHtcbiAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlcl9pZCcsIHVzZXJJZClcbiAgICB3eC5zZXRTdG9yYWdlU3luYygnYWNjZXNzX3Rva2VuJywgYWNjZXNzVG9rZW4pXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ3JlZnJlc2hUb2tlbicsIHJlZnJlc2hUb2tlbilcbiAgfVxuXG4gIGlzQXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISEodGhpcy5nZXRVc2VySWQoKSAmJiB0aGlzLmdldEFjY2Vzc1Rva2VuKCkpXG4gIH1cblxuICBjaGVja1VzZXIob3B0aW9uczogQ2hlY2tVc2VyT3B0aW9ucykge1xuICAgIC8vIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgLy8gICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnN1Y2Nlc3MpIHtcbiAgICAvLyAgICAgb3B0aW9ucy5zdWNjZXNzKClcbiAgICAvLyAgIH1cbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgdGhpcy5sb2dpbihvcHRpb25zKVxuICAgIC8vIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgVXNlck1hbmFnZXIoKVxuIl19