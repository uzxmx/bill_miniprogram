"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../request/index");
Page({
    data: {
        as: '',
        requests: [],
    },
    onLoad: function (options) {
        var as = options.as;
        wx.setNavigationBarTitle({ title: as === 'applicant' ? '我的申请' : '我的消息' });
        this.setData({ as: as });
    },
    onShow: function () {
        this.loadData(this.data.as);
    },
    loadData: function (as) {
        var _this = this;
        wx.showLoading({ title: '加载中' });
        index_1.get("/workspace_requests?as=" + as).then(function (res) {
            wx.hideLoading();
            res.data.forEach(function (e) {
                var statusDesc;
                switch (e.status) {
                    case 'allowed':
                        statusDesc = '已通过';
                        break;
                    case 'rejected':
                        statusDesc = '被拒绝';
                        break;
                    default:
                        statusDesc = '等待处理';
                        break;
                }
                e.statusDesc = statusDesc;
            });
            _this.setData({ requests: res.data });
        }).catch(function () {
            wx.hideLoading();
        });
    },
    updateStatus: function (e) {
        var _this = this;
        var _a = e.currentTarget.dataset, id = _a.id, status = _a.status;
        wx.showLoading({ title: '提交中' });
        index_1.patch("/workspace_requests/" + id, { status: status }).then(function () {
            wx.hideLoading();
            _this.loadData(_this.data.as);
        }).catch(function () {
            wx.hideLoading();
            wx.showToast({
                title: '请求失败，请重新尝试',
                icon: 'none'
            });
        });
    },
    joinWorkspace: function () {
        wx.navigateTo({ url: '/pages/workspace/guide?action=join' });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXF1ZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUFnRDtBQUVoRCxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixFQUFFLEVBQUUsRUFBRTtRQUNOLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFFRCxNQUFNLFlBQUMsT0FBTztRQUNaLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUE7UUFDbkIsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUN6RSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFBLEVBQUUsQ0FBQyxDQUFBO0lBQ3RCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzdCLENBQUM7SUFFRCxRQUFRLEVBQVIsVUFBUyxFQUFPO1FBQWhCLGlCQXdCQztRQXZCQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDaEMsV0FBRyxDQUFDLDRCQUEwQixFQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQzFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQU07Z0JBQ3RCLElBQUksVUFBVSxDQUFBO2dCQUNkLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDaEIsS0FBSyxTQUFTO3dCQUNaLFVBQVUsR0FBRyxLQUFLLENBQUE7d0JBQ2xCLE1BQUs7b0JBQ1AsS0FBSyxVQUFVO3dCQUNiLFVBQVUsR0FBRyxLQUFLLENBQUE7d0JBQ2xCLE1BQUs7b0JBQ1A7d0JBQ0UsVUFBVSxHQUFHLE1BQU0sQ0FBQTt3QkFDbkIsTUFBSztpQkFDUjtnQkFDRCxDQUFDLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtZQUMzQixDQUFDLENBQUMsQ0FBQTtZQUVGLEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7UUFDdEMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ1AsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFlBQVksRUFBWixVQUFhLENBQU07UUFBbkIsaUJBY0M7UUFiTyxJQUFBLEtBQWlCLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUF0QyxFQUFFLFFBQUEsRUFBRSxNQUFNLFlBQTRCLENBQUE7UUFFOUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2hDLGFBQUssQ0FBQyx5QkFBdUIsRUFBSSxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNsRCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDaEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzdCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNQLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNoQixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxZQUFZO2dCQUNuQixJQUFJLEVBQUUsTUFBTTthQUNiLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGFBQWE7UUFDWCxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9DQUFvQyxFQUFFLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0LCBwYXRjaCB9IGZyb20gJy4uLy4uL3JlcXVlc3QvaW5kZXgnXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgYXM6ICcnLFxuICAgIHJlcXVlc3RzOiBbXSxcbiAgfSxcblxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIGxldCBhcyA9IG9wdGlvbnMuYXNcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoeyB0aXRsZTogYXMgPT09ICdhcHBsaWNhbnQnID8gJ+aIkeeahOeUs+ivtycgOiAn5oiR55qE5raI5oGvJyB9KVxuICAgIHRoaXMuc2V0RGF0YSh7IGFzIH0pXG4gIH0sXG5cbiAgb25TaG93KCkge1xuICAgIHRoaXMubG9hZERhdGEodGhpcy5kYXRhLmFzKVxuICB9LFxuXG4gIGxvYWREYXRhKGFzOiBhbnkpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5Yqg6L295LitJyB9KVxuICAgIGdldChgL3dvcmtzcGFjZV9yZXF1ZXN0cz9hcz0ke2FzfWApLnRoZW4ocmVzID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHJlcy5kYXRhLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzRGVzY1xuICAgICAgICBzd2l0Y2ggKGUuc3RhdHVzKSB7XG4gICAgICAgICAgY2FzZSAnYWxsb3dlZCc6XG4gICAgICAgICAgICBzdGF0dXNEZXNjID0gJ+W3sumAmui/hydcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAncmVqZWN0ZWQnOlxuICAgICAgICAgICAgc3RhdHVzRGVzYyA9ICfooqvmi5Lnu50nXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzdGF0dXNEZXNjID0gJ+etieW+heWkhOeQhidcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgZS5zdGF0dXNEZXNjID0gc3RhdHVzRGVzY1xuICAgICAgfSlcblxuICAgICAgdGhpcy5zZXREYXRhKHsgcmVxdWVzdHM6IHJlcy5kYXRhIH0pXG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgIH0pXG4gIH0sXG5cbiAgdXBkYXRlU3RhdHVzKGU6IGFueSkge1xuICAgIGNvbnN0IHsgaWQsIHN0YXR1cyB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcblxuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfmj5DkuqTkuK0nIH0pXG4gICAgcGF0Y2goYC93b3Jrc3BhY2VfcmVxdWVzdHMvJHtpZH1gLCB7IHN0YXR1cyB9KS50aGVuKCgpID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHRoaXMubG9hZERhdGEodGhpcy5kYXRhLmFzKVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn6K+35rGC5aSx6LSl77yM6K+36YeN5paw5bCd6K+VJyxcbiAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG5cbiAgam9pbldvcmtzcGFjZSgpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL3dvcmtzcGFjZS9ndWlkZT9hY3Rpb249am9pbicgfSlcbiAgfVxufSlcbiJdfQ==