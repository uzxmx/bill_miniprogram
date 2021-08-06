"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../request/index");
Page({
    data: {
        as: '',
        requests: [],
    },
    onLoad: function (options) {
        this.loadData(options.as);
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
            _this.setData({ as: as, requests: res.data });
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
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXF1ZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUFnRDtBQUVoRCxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixFQUFFLEVBQUUsRUFBRTtRQUNOLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFFRCxNQUFNLFlBQUMsT0FBTztRQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFFRCxRQUFRLEVBQVIsVUFBUyxFQUFPO1FBQWhCLGlCQXdCQztRQXZCQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDaEMsV0FBRyxDQUFDLDRCQUEwQixFQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQzFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQU07Z0JBQ3RCLElBQUksVUFBVSxDQUFBO2dCQUNkLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDaEIsS0FBSyxTQUFTO3dCQUNaLFVBQVUsR0FBRyxLQUFLLENBQUE7d0JBQ2xCLE1BQUs7b0JBQ1AsS0FBSyxVQUFVO3dCQUNiLFVBQVUsR0FBRyxLQUFLLENBQUE7d0JBQ2xCLE1BQUs7b0JBQ1A7d0JBQ0UsVUFBVSxHQUFHLE1BQU0sQ0FBQTt3QkFDbkIsTUFBSztpQkFDUjtnQkFDRCxDQUFDLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtZQUMzQixDQUFDLENBQUMsQ0FBQTtZQUVGLEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUEsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7UUFDMUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ1AsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFlBQVksRUFBWixVQUFhLENBQU07UUFBbkIsaUJBY0M7UUFiTyxJQUFBLEtBQWlCLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUF0QyxFQUFFLFFBQUEsRUFBRSxNQUFNLFlBQTRCLENBQUE7UUFFOUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2hDLGFBQUssQ0FBQyx5QkFBdUIsRUFBSSxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNsRCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDaEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzdCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNQLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNoQixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxZQUFZO2dCQUNuQixJQUFJLEVBQUUsTUFBTTthQUNiLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldCwgcGF0Y2ggfSBmcm9tICcuLi8uLi9yZXF1ZXN0L2luZGV4J1xuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIGFzOiAnJyxcbiAgICByZXF1ZXN0czogW10sXG4gIH0sXG5cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLmxvYWREYXRhKG9wdGlvbnMuYXMpXG4gIH0sXG5cbiAgbG9hZERhdGEoYXM6IGFueSkge1xuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfliqDovb3kuK0nIH0pXG4gICAgZ2V0KGAvd29ya3NwYWNlX3JlcXVlc3RzP2FzPSR7YXN9YCkudGhlbihyZXMgPT4ge1xuICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgcmVzLmRhdGEuZm9yRWFjaCgoZTogYW55KSA9PiB7XG4gICAgICAgIGxldCBzdGF0dXNEZXNjXG4gICAgICAgIHN3aXRjaCAoZS5zdGF0dXMpIHtcbiAgICAgICAgICBjYXNlICdhbGxvd2VkJzpcbiAgICAgICAgICAgIHN0YXR1c0Rlc2MgPSAn5bey6YCa6L+HJ1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdyZWplY3RlZCc6XG4gICAgICAgICAgICBzdGF0dXNEZXNjID0gJ+iiq+aLkue7nSdcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHN0YXR1c0Rlc2MgPSAn562J5b6F5aSE55CGJ1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBlLnN0YXR1c0Rlc2MgPSBzdGF0dXNEZXNjXG4gICAgICB9KVxuXG4gICAgICB0aGlzLnNldERhdGEoeyBhcywgcmVxdWVzdHM6IHJlcy5kYXRhIH0pXG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgIH0pXG4gIH0sXG5cbiAgdXBkYXRlU3RhdHVzKGU6IGFueSkge1xuICAgIGNvbnN0IHsgaWQsIHN0YXR1cyB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcblxuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfmj5DkuqTkuK0nIH0pXG4gICAgcGF0Y2goYC93b3Jrc3BhY2VfcmVxdWVzdHMvJHtpZH1gLCB7IHN0YXR1cyB9KS50aGVuKCgpID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHRoaXMubG9hZERhdGEodGhpcy5kYXRhLmFzKVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn6K+35rGC5aSx6LSl77yM6K+36YeN5paw5bCd6K+VJyxcbiAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn0pXG4iXX0=