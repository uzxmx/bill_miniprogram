"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
var index_1 = require("../../request/index");
var manager_1 = require("../../user/manager");
Page({
    data: {
        list: [
            {
                "text": "对话",
            },
            {
                text: 'test'
            }
        ]
    },
    onLoad: function () {
        if (!manager_1.default.isAuthenticated()) {
            wx.redirectTo({ url: '/pages/login/index' });
        }
        else {
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
    tabChange: function (e) {
        console.log('tabChange', e);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBRWhDLDZDQUF5QztBQUV6Qyw4Q0FBNEM7QUFFNUMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFO1lBQ0o7Z0JBQ00sTUFBTSxFQUFFLElBQUk7YUFJakI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0Y7S0FDRjtJQU9ELE1BQU07UUFDSixJQUFJLENBQUMsaUJBQVcsQ0FBQyxlQUFlLEVBQUUsRUFBRTtZQUNsQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtTQUM3QzthQUFNO1lBQ0wsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ2hDLFdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO2dCQUN6QixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ2hCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUN6QixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLHdCQUF3QixFQUFFLENBQUMsQ0FBQTtpQkFDakQ7WUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ1AsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO2dCQUNoQixFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNYLEtBQUssRUFBRSxZQUFZO29CQUNuQixJQUFJLEVBQUUsTUFBTTtpQkFDYixDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUVELFNBQVMsRUFBVCxVQUFVLENBQU07UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUM3QixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcblxuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vLi4vcmVxdWVzdC9pbmRleCdcblxuaW1wb3J0IFVzZXJNYW5hZ2VyIGZyb20gJy4uLy4uL3VzZXIvbWFuYWdlcidcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBsaXN0OiBbXG4gICAgICB7XG4gICAgICAgICAgICBcInRleHRcIjogXCLlr7nor51cIixcbiAgICAgICAgICAvLyAgIFwiaWNvblBhdGhcIjogXCIuLi8uLi9pbWFnZXMvdGFiYmFyX2ljb25fY2hhdF9kZWZhdWx0LnBuZ1wiLFxuICAgICAgICAgIC8vIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcIi4uLy4uL2ltYWdlcy90YWJiYXJfaWNvbl9jaGF0X2FjdGl2ZS5wbmdcIixcbiAgICAgICAgICAgIC8vIGRvdDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ3Rlc3QnXG4gICAgICB9XG4gICAgXVxuICB9LFxuICAvLyDkuovku7blpITnkIblh73mlbBcbiAgLy8gYmluZFZpZXdUYXAoKSB7XG4gIC8vICAgd3gubmF2aWdhdGVUbyh7XG4gIC8vICAgICB1cmw6ICcuLi9sb2dzL2xvZ3MnLFxuICAvLyAgIH0pXG4gIC8vIH0sXG4gIG9uTG9hZCgpIHtcbiAgICBpZiAoIVVzZXJNYW5hZ2VyLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICB3eC5yZWRpcmVjdFRvKHsgdXJsOiAnL3BhZ2VzL2xvZ2luL2luZGV4JyB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5Yqg6L295LitJyB9KVxuICAgICAgZ2V0KCcvd29ya3NwYWNlcycpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgd3gucmVkaXJlY3RUbyh7IHVybDogJy9wYWdlcy93b3Jrc3BhY2UvZ3VpZGUnIH0pXG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295aSx6LSl77yM6K+36YeN5paw5bCd6K+VJyxcbiAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIHRhYkNoYW5nZShlOiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZygndGFiQ2hhbmdlJywgZSlcbiAgfVxufSlcbiJdfQ==