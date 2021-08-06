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
                    index_1.get('/workspace_requests?as=applicant').then(function (res) {
                        if (res.data.length === 0) {
                            wx.redirectTo({ url: '/pages/workspace/guide' });
                        }
                    });
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
        if (manager_1.default.isAuthenticated()) {
            this.selectComponent("#cargo-list").onShow();
            this.selectComponent("#bill-list").onShow();
        }
    },
    onTabChange: function (e) {
        this.setData({ currentTab: e.detail.index });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBRWhDLDZDQUF5QztBQUV6Qyw4Q0FBNEM7QUFFNUMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osYUFBYSxFQUFFLEtBQUs7UUFDcEIsVUFBVSxFQUFFLENBQUM7UUFDYixJQUFJLEVBQUU7WUFDSjtnQkFDRSxJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsdUNBQXVDO2dCQUNqRCxnQkFBZ0IsRUFBRSw4Q0FBOEM7YUFDakU7WUFDRDtnQkFDRSxJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsc0NBQXNDO2dCQUNoRCxnQkFBZ0IsRUFBRSw2Q0FBNkM7YUFDaEU7WUFDRDtnQkFDRSxJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUseUNBQXlDO2dCQUNuRCxnQkFBZ0IsRUFBRSxnREFBZ0Q7YUFDbkU7U0FDRjtLQUNGO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxpQkFBVyxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ2xDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO1NBQzdDO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7WUFFckMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ2hDLFdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO2dCQUN6QixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ2hCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUN6QixXQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO3dCQUM5QyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs0QkFDekIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSx3QkFBd0IsRUFBRSxDQUFDLENBQUE7eUJBQ2pEO29CQUNILENBQUMsQ0FBQyxDQUFBO2lCQUNIO1lBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUNQLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtnQkFDaEIsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDWCxLQUFLLEVBQUUsWUFBWTtvQkFDbkIsSUFBSSxFQUFFLE1BQU07aUJBQ2IsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxpQkFBVyxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7WUFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtTQUM1QztJQUNILENBQUM7SUFFRCxXQUFXLEVBQVgsVUFBWSxDQUFNO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQzlDLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi8uLi9yZXF1ZXN0L2luZGV4J1xuXG5pbXBvcnQgVXNlck1hbmFnZXIgZnJvbSAnLi4vLi4vdXNlci9tYW5hZ2VyJ1xuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIGF1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxuICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgdGFiczogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAn6LSn54mpJyxcbiAgICAgICAgaWNvblBhdGg6IFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9pY29uLWdvb2RzLnBuZ1wiLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvaWNvbi1nb29kcy1hY3RpdmUucG5nXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIui0puebrlwiLFxuICAgICAgICBpY29uUGF0aDogXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2ljb24tYmlsbC5wbmdcIixcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2ljb24tYmlsbC1hY3RpdmUucG5nXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn5oiR55qEJyxcbiAgICAgICAgaWNvblBhdGg6IFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9pY29uLXByb2ZpbGUucG5nXCIsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6IFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9pY29uLXByb2ZpbGUtYWN0aXZlLnBuZ1wiLFxuICAgICAgfVxuICAgIF1cbiAgfSxcblxuICBvbkxvYWQoKSB7XG4gICAgaWYgKCFVc2VyTWFuYWdlci5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgd3gucmVkaXJlY3RUbyh7IHVybDogJy9wYWdlcy9sb2dpbi9pbmRleCcgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXREYXRhKHsgYXV0aGVudGljYXRlZDogdHJ1ZSB9KVxuXG4gICAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5Yqg6L295LitJyB9KVxuICAgICAgZ2V0KCcvd29ya3NwYWNlcycpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZ2V0KCcvd29ya3NwYWNlX3JlcXVlc3RzP2FzPWFwcGxpY2FudCcpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7IHVybDogJy9wYWdlcy93b3Jrc3BhY2UvZ3VpZGUnIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3lpLHotKXvvIzor7fph43mlrDlsJ3or5UnLFxuICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgb25TaG93KCkge1xuICAgIGlmIChVc2VyTWFuYWdlci5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjY2FyZ28tbGlzdFwiKS5vblNob3coKVxuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjYmlsbC1saXN0XCIpLm9uU2hvdygpXG4gICAgfVxuICB9LFxuXG4gIG9uVGFiQ2hhbmdlKGU6IGFueSkge1xuICAgIHRoaXMuc2V0RGF0YSh7IGN1cnJlbnRUYWI6IGUuZGV0YWlsLmluZGV4IH0pXG4gIH1cbn0pXG4iXX0=