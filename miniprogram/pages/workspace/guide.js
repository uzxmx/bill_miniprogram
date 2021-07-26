"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
var index_1 = require("../../request/index");
Page({
    data: {
        action: '',
        firstWorkspace: true,
        name: '',
        createOrJoinBtnDisabled: true,
    },
    onLoad: function () {
    },
    onInput: function (e) {
        this.setData({ name: e.detail.value });
    },
    onCreateTap: function () {
        this.setData({ action: 'create' });
    },
    onJoinTap: function () {
        this.setData({ action: 'join' });
    },
    onCreateOrJoinTap: function () {
        var _this = this;
        var name = this.data.name;
        if (!name) {
            wx.showToast({
                title: '请输入工作空间名称',
                icon: 'none'
            });
            return;
        }
        var url = '/workspaces';
        if (this.data.action === 'join') {
            url += '/join';
        }
        wx.showLoading({ title: '处理中' });
        index_1.post(url, { name: name }).then(function (res) {
            wx.hideLoading();
            var message;
            if (_this.data.action === 'create') {
                message = '创建成功';
            }
            else {
                message = '已提交加入申请，请等待管理员审核';
            }
            wx.showToast({
                title: message,
                icon: 'none',
                complete: function () {
                    if (_this.data.action === 'create') {
                        wx.redirectTo({ url: '/pages/index/index' });
                    }
                }
            });
        }).catch(function (err) {
            wx.hideLoading();
            var message = '请求失败，请重新尝试';
            if (err && err.data && err.data.err) {
                switch (err.data.err.reason) {
                    case 'err_already_exists':
                        message = '该工作空间名称已被使用，请使用其他名称';
                        break;
                    case 'err_not_exist':
                        message = '该工作空间不存在';
                        break;
                }
            }
            wx.showToast({
                title: message,
                icon: 'none'
            });
        });
    },
    onSwitchActionTap: function () {
        var action = this.data.action;
        if (action === 'create') {
            action = 'join';
        }
        else {
            action = 'create';
        }
        this.setData({ action: action });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJndWlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBRWhDLDZDQUEwQztBQUUxQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsRUFBRTtRQUNWLGNBQWMsRUFBRSxJQUFJO1FBQ3BCLElBQUksRUFBRSxFQUFFO1FBQ1IsdUJBQXVCLEVBQUUsSUFBSTtLQUM5QjtJQUNELE1BQU07SUFDTixDQUFDO0lBRUQsT0FBTyxFQUFQLFVBQVEsQ0FBTTtRQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFFRCxpQkFBaUI7UUFBakIsaUJBa0RDO1FBakRDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxXQUFXO2dCQUNsQixJQUFJLEVBQUUsTUFBTTthQUNiLENBQUMsQ0FBQTtZQUNGLE9BQU07U0FDUDtRQUVELElBQUksR0FBRyxHQUFHLGFBQWEsQ0FBQTtRQUN2QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUMvQixHQUFHLElBQUksT0FBTyxDQUFBO1NBQ2Y7UUFDRCxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDaEMsWUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQzFCLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNoQixJQUFJLE9BQU8sQ0FBQTtZQUNYLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUNqQyxPQUFPLEdBQUcsTUFBTSxDQUFBO2FBQ2pCO2lCQUFNO2dCQUNMLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQTthQUM3QjtZQUNELEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFO29CQUNSLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO3dCQUNqQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtxQkFDN0M7Z0JBQ0gsQ0FBQzthQUNGLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEdBQUc7WUFDVixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDaEIsSUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFBO1lBQzFCLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ25DLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUMzQixLQUFLLG9CQUFvQjt3QkFDdkIsT0FBTyxHQUFHLHFCQUFxQixDQUFBO3dCQUMvQixNQUFLO29CQUNQLEtBQUssZUFBZTt3QkFDbEIsT0FBTyxHQUFHLFVBQVUsQ0FBQTt3QkFDcEIsTUFBSztpQkFDUjthQUNGO1lBQ0QsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsT0FBTztnQkFDZCxJQUFJLEVBQUUsTUFBTTthQUNiLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBQzdCLElBQUksTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUN2QixNQUFNLEdBQUcsTUFBTSxDQUFBO1NBQ2hCO2FBQU07WUFDTCxNQUFNLEdBQUcsUUFBUSxDQUFBO1NBQ2xCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsQ0FBQTtJQUMxQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcblxuaW1wb3J0IHsgcG9zdCB9IGZyb20gJy4uLy4uL3JlcXVlc3QvaW5kZXgnXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgYWN0aW9uOiAnJyxcbiAgICBmaXJzdFdvcmtzcGFjZTogdHJ1ZSxcbiAgICBuYW1lOiAnJyxcbiAgICBjcmVhdGVPckpvaW5CdG5EaXNhYmxlZDogdHJ1ZSxcbiAgfSxcbiAgb25Mb2FkKCkge1xuICB9LFxuXG4gIG9uSW5wdXQoZTogYW55KSB7XG4gICAgdGhpcy5zZXREYXRhKHsgbmFtZTogZS5kZXRhaWwudmFsdWUgfSlcbiAgfSxcblxuICBvbkNyZWF0ZVRhcCgpIHtcbiAgICB0aGlzLnNldERhdGEoeyBhY3Rpb246ICdjcmVhdGUnIH0pXG4gIH0sXG5cbiAgb25Kb2luVGFwKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7IGFjdGlvbjogJ2pvaW4nIH0pXG4gIH0sXG5cbiAgb25DcmVhdGVPckpvaW5UYXAoKSB7XG4gICAgbGV0IG5hbWUgPSB0aGlzLmRhdGEubmFtZVxuICAgIGlmICghbmFtZSkge1xuICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6ICfor7fovpPlhaXlt6XkvZznqbrpl7TlkI3np7AnLFxuICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgIH0pXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgdXJsID0gJy93b3Jrc3BhY2VzJ1xuICAgIGlmICh0aGlzLmRhdGEuYWN0aW9uID09PSAnam9pbicpIHtcbiAgICAgIHVybCArPSAnL2pvaW4nXG4gICAgfVxuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICflpITnkIbkuK0nIH0pXG4gICAgcG9zdCh1cmwsIHsgbmFtZSB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICBsZXQgbWVzc2FnZVxuICAgICAgaWYgKHRoaXMuZGF0YS5hY3Rpb24gPT09ICdjcmVhdGUnKSB7XG4gICAgICAgIG1lc3NhZ2UgPSAn5Yib5bu65oiQ5YqfJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9ICflt7Lmj5DkuqTliqDlhaXnlLPor7fvvIzor7fnrYnlvoXnrqHnkIblkZjlrqHmoLgnXG4gICAgICB9XG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogbWVzc2FnZSxcbiAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmRhdGEuYWN0aW9uID09PSAnY3JlYXRlJykge1xuICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIGxldCBtZXNzYWdlID0gJ+ivt+axguWksei0pe+8jOivt+mHjeaWsOWwneivlSdcbiAgICAgIGlmIChlcnIgJiYgZXJyLmRhdGEgJiYgZXJyLmRhdGEuZXJyKSB7XG4gICAgICAgIHN3aXRjaCAoZXJyLmRhdGEuZXJyLnJlYXNvbikge1xuICAgICAgICAgIGNhc2UgJ2Vycl9hbHJlYWR5X2V4aXN0cyc6XG4gICAgICAgICAgICBtZXNzYWdlID0gJ+ivpeW3peS9nOepuumXtOWQjeensOW3suiiq+S9v+eUqO+8jOivt+S9v+eUqOWFtuS7luWQjeensCdcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnZXJyX25vdF9leGlzdCc6XG4gICAgICAgICAgICBtZXNzYWdlID0gJ+ivpeW3peS9nOepuumXtOS4jeWtmOWcqCdcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiBtZXNzYWdlLFxuICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBvblN3aXRjaEFjdGlvblRhcCgpIHtcbiAgICBsZXQgYWN0aW9uID0gdGhpcy5kYXRhLmFjdGlvblxuICAgIGlmIChhY3Rpb24gPT09ICdjcmVhdGUnKSB7XG4gICAgICBhY3Rpb24gPSAnam9pbidcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aW9uID0gJ2NyZWF0ZSdcbiAgICB9XG4gICAgdGhpcy5zZXREYXRhKHsgYWN0aW9uIH0pXG4gIH0sXG59KVxuIl19