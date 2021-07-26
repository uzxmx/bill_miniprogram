"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../request/index");
var manager_1 = require("../../user/manager");
Page({
    login: function () {
        var _this = this;
        if (wx.getUserProfile) {
            wx.getUserProfile({
                desc: '用户登录',
                success: function (res) {
                    wx.login({
                        success: function (r) { return _this.doLogin(r.code, res); }
                    });
                }
            });
        }
        else {
            wx.login({
                success: function (res) {
                    var code = res.code;
                    wx.getUserInfo({
                        withCredentials: true,
                        success: function (res) { return _this.doLogin(code, res); }
                    });
                }
            });
        }
    },
    doLogin: function (code, res) {
        wx.showLoading({ title: '登录中' });
        index_1.post('/users/sign_in', {
            code: code,
            user_info: res.userInfo,
            raw_data: res.rawData,
            signature: res.signature,
            encrypted_data: res.encryptedData,
            iv: res.iv
        }).then(function (res) {
            wx.hideLoading();
            var data = res.data;
            manager_1.default.setTokens(data.user_id, data.access_token, data.refresh_token);
            wx.redirectTo({ url: '/pages/index/index' });
        }).catch(function () {
            wx.hideLoading();
            wx.showToast({
                title: '登录失败，请重新尝试',
                icon: 'none'
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUEwQztBQUMxQyw4Q0FBNEM7QUFFNUMsSUFBSSxDQUFDO0lBQ0gsS0FBSztRQUFMLGlCQXNCQztRQXBCQyxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUU7WUFDckIsRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDaEIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLFVBQUEsR0FBRztvQkFDVixFQUFFLENBQUMsS0FBSyxDQUFDO3dCQUNQLE9BQU8sRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBekIsQ0FBeUI7cUJBQ3hDLENBQUMsQ0FBQTtnQkFDSixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1NBQ0g7YUFBTTtZQUNMLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLFVBQUEsR0FBRztvQkFDVixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO29CQUNuQixFQUFFLENBQUMsV0FBVyxDQUFDO3dCQUNiLGVBQWUsRUFBRSxJQUFJO3dCQUNyQixPQUFPLEVBQUUsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBdkIsQ0FBdUI7cUJBQ3hDLENBQUMsQ0FBQTtnQkFDSixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0lBRUQsT0FBTyxFQUFQLFVBQVEsSUFBWSxFQUFFLEdBQVE7UUFDNUIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2hDLFlBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUNyQixJQUFJLE1BQUE7WUFDSixTQUFTLEVBQUUsR0FBRyxDQUFDLFFBQVE7WUFDdkIsUUFBUSxFQUFFLEdBQUcsQ0FBQyxPQUFPO1lBQ3JCLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUztZQUN4QixjQUFjLEVBQUUsR0FBRyxDQUFDLGFBQWE7WUFDakMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1NBQ1gsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDVCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDaEIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtZQUNuQixpQkFBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBRTFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO1FBQzlDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNQLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNoQixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxZQUFZO2dCQUNuQixJQUFJLEVBQUUsTUFBTTthQUNiLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBvc3QgfSBmcm9tICcuLi8uLi9yZXF1ZXN0L2luZGV4J1xuaW1wb3J0IFVzZXJNYW5hZ2VyIGZyb20gJy4uLy4uL3VzZXIvbWFuYWdlcidcblxuUGFnZSh7XG4gIGxvZ2luKCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAod3guZ2V0VXNlclByb2ZpbGUpIHtcbiAgICAgIHd4LmdldFVzZXJQcm9maWxlKHtcbiAgICAgICAgZGVzYzogJ+eUqOaIt+eZu+W9lScsXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgd3gubG9naW4oe1xuICAgICAgICAgICAgc3VjY2VzczogciA9PiB0aGlzLmRvTG9naW4oci5jb2RlLCByZXMpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3gubG9naW4oe1xuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIGxldCBjb2RlID0gcmVzLmNvZGVcbiAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4gdGhpcy5kb0xvZ2luKGNvZGUsIHJlcylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICBkb0xvZ2luKGNvZGU6IHN0cmluZywgcmVzOiBhbnkpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn55m75b2V5LitJyB9KVxuICAgIHBvc3QoJy91c2Vycy9zaWduX2luJywge1xuICAgICAgY29kZSxcbiAgICAgIHVzZXJfaW5mbzogcmVzLnVzZXJJbmZvLFxuICAgICAgcmF3X2RhdGE6IHJlcy5yYXdEYXRhLFxuICAgICAgc2lnbmF0dXJlOiByZXMuc2lnbmF0dXJlLFxuICAgICAgZW5jcnlwdGVkX2RhdGE6IHJlcy5lbmNyeXB0ZWREYXRhLFxuICAgICAgaXY6IHJlcy5pdlxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcbiAgICAgIFVzZXJNYW5hZ2VyLnNldFRva2VucyhkYXRhLnVzZXJfaWQsIGRhdGEuYWNjZXNzX3Rva2VuLCBkYXRhLnJlZnJlc2hfdG9rZW4pXG5cbiAgICAgIHd4LnJlZGlyZWN0VG8oeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6ICfnmbvlvZXlpLHotKXvvIzor7fph43mlrDlsJ3or5UnLFxuICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufSlcbiJdfQ==