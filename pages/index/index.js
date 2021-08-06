"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
var index_1 = require("../../request/index");
var manager_1 = require("../../user/manager");
Page({
    data: {
        authenticated: false,
        currentTab: 0,
        tabs: [
            {
                text: '货物',
                iconPath: "../../../assets/images/icon-goods.png",
                selectedIconPath: "../../../assets/images/icon-goods-active.png",
            },
            {
                text: "账目",
                iconPath: "../../../assets/images/icon-bill.png",
                selectedIconPath: "../../../assets/images/icon-bill-active.png",
            },
            {
                text: '我的',
                iconPath: "../../../assets/images/icon-profile.png",
                selectedIconPath: "../../../assets/images/icon-profile-active.png",
            }
        ]
    },
    onLoad: function () {
        if (!manager_1.default.isAuthenticated()) {
            wx.redirectTo({ url: '/pages/login/index' });
        }
        else {
            this.setData({ authenticated: true });
            wx.showLoading({ title: '加载中' });
            index_1.get('/workspaces').then(function (res) {
                wx.hideLoading();
                if (res.data.length === 0) {
                    wx.redirectTo({ url: '/pages/workspace/guide' });
                }
            }).catch(function () {
                wx.hideLoading();
                wx.showToast({
                    title: '加载失败，请重新尝试',
                    icon: 'none'
                });
            });
        }
    },
    onShow: function () {
        this.selectComponent("#cargo-list").onShow();
        this.selectComponent("#bill-list").onShow();
    },
    onTabChange: function (e) {
        this.setData({ currentTab: e.detail.index });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBRWhDLDZDQUF5QztBQUV6Qyw4Q0FBNEM7QUFFNUMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osYUFBYSxFQUFFLEtBQUs7UUFDcEIsVUFBVSxFQUFFLENBQUM7UUFDYixJQUFJLEVBQUU7WUFDSjtnQkFDRSxJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsdUNBQXVDO2dCQUNqRCxnQkFBZ0IsRUFBRSw4Q0FBOEM7YUFDakU7WUFDRDtnQkFDRSxJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsc0NBQXNDO2dCQUNoRCxnQkFBZ0IsRUFBRSw2Q0FBNkM7YUFDaEU7WUFDRDtnQkFDRSxJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUseUNBQXlDO2dCQUNuRCxnQkFBZ0IsRUFBRSxnREFBZ0Q7YUFDbkU7U0FDRjtLQUNGO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxpQkFBVyxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ2xDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO1NBQzdDO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7WUFFckMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ2hDLFdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO2dCQUN6QixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ2hCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUN6QixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLHdCQUF3QixFQUFFLENBQUMsQ0FBQTtpQkFDakQ7WUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ1AsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO2dCQUNoQixFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNYLEtBQUssRUFBRSxZQUFZO29CQUNuQixJQUFJLEVBQUUsTUFBTTtpQkFDYixDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDN0MsQ0FBQztJQUVELFdBQVcsRUFBWCxVQUFZLENBQU07UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDOUMsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXG5cbmltcG9ydCB7IGdldCB9IGZyb20gJy4uLy4uL3JlcXVlc3QvaW5kZXgnXG5cbmltcG9ydCBVc2VyTWFuYWdlciBmcm9tICcuLi8uLi91c2VyL21hbmFnZXInXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgYXV0aGVudGljYXRlZDogZmFsc2UsXG4gICAgY3VycmVudFRhYjogMCxcbiAgICB0YWJzOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICfotKfniaknLFxuICAgICAgICBpY29uUGF0aDogXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2ljb24tZ29vZHMucG5nXCIsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6IFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9pY29uLWdvb2RzLWFjdGl2ZS5wbmdcIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwi6LSm55uuXCIsXG4gICAgICAgIGljb25QYXRoOiBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvaWNvbi1iaWxsLnBuZ1wiLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvaWNvbi1iaWxsLWFjdGl2ZS5wbmdcIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICfmiJHnmoQnLFxuICAgICAgICBpY29uUGF0aDogXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2ljb24tcHJvZmlsZS5wbmdcIixcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2ljb24tcHJvZmlsZS1hY3RpdmUucG5nXCIsXG4gICAgICB9XG4gICAgXVxuICB9LFxuXG4gIG9uTG9hZCgpIHtcbiAgICBpZiAoIVVzZXJNYW5hZ2VyLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICB3eC5yZWRpcmVjdFRvKHsgdXJsOiAnL3BhZ2VzL2xvZ2luL2luZGV4JyB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldERhdGEoeyBhdXRoZW50aWNhdGVkOiB0cnVlIH0pXG5cbiAgICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfliqDovb3kuK0nIH0pXG4gICAgICBnZXQoJy93b3Jrc3BhY2VzJykudGhlbihyZXMgPT4ge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB3eC5yZWRpcmVjdFRvKHsgdXJsOiAnL3BhZ2VzL3dvcmtzcGFjZS9ndWlkZScgfSlcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3lpLHotKXvvIzor7fph43mlrDlsJ3or5UnLFxuICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgb25TaG93KCkge1xuICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50KFwiI2NhcmdvLWxpc3RcIikub25TaG93KClcbiAgICB0aGlzLnNlbGVjdENvbXBvbmVudChcIiNiaWxsLWxpc3RcIikub25TaG93KClcbiAgfSxcblxuICBvblRhYkNoYW5nZShlOiBhbnkpIHtcbiAgICB0aGlzLnNldERhdGEoeyBjdXJyZW50VGFiOiBlLmRldGFpbC5pbmRleCB9KVxuICB9XG59KVxuIl19