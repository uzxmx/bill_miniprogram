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
    onLoad: function (options) {
        this.setData({ action: options.action });
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
                    wx.redirectTo({ url: '/pages/index/index' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJndWlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBRWhDLDZDQUEwQztBQUUxQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsRUFBRTtRQUNWLGNBQWMsRUFBRSxJQUFJO1FBQ3BCLElBQUksRUFBRSxFQUFFO1FBQ1IsdUJBQXVCLEVBQUUsSUFBSTtLQUM5QjtJQUNELE1BQU0sWUFBQyxPQUFPO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBRUQsT0FBTyxFQUFQLFVBQVEsQ0FBTTtRQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFFRCxpQkFBaUI7UUFBakIsaUJBZ0RDO1FBL0NDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxXQUFXO2dCQUNsQixJQUFJLEVBQUUsTUFBTTthQUNiLENBQUMsQ0FBQTtZQUNGLE9BQU07U0FDUDtRQUVELElBQUksR0FBRyxHQUFHLGFBQWEsQ0FBQTtRQUN2QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUMvQixHQUFHLElBQUksT0FBTyxDQUFBO1NBQ2Y7UUFDRCxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDaEMsWUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQzFCLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNoQixJQUFJLE9BQU8sQ0FBQTtZQUNYLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUNqQyxPQUFPLEdBQUcsTUFBTSxDQUFBO2FBQ2pCO2lCQUFNO2dCQUNMLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQTthQUM3QjtZQUNELEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFO29CQUNSLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO2dCQUM5QyxDQUFDO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztZQUNWLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNoQixJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUE7WUFDMUIsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDbkMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQzNCLEtBQUssb0JBQW9CO3dCQUN2QixPQUFPLEdBQUcscUJBQXFCLENBQUE7d0JBQy9CLE1BQUs7b0JBQ1AsS0FBSyxlQUFlO3dCQUNsQixPQUFPLEdBQUcsVUFBVSxDQUFBO3dCQUNwQixNQUFLO2lCQUNSO2FBQ0Y7WUFDRCxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxPQUFPO2dCQUNkLElBQUksRUFBRSxNQUFNO2FBQ2IsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDN0IsSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3ZCLE1BQU0sR0FBRyxNQUFNLENBQUE7U0FDaEI7YUFBTTtZQUNMLE1BQU0sR0FBRyxRQUFRLENBQUE7U0FDbEI7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxDQUFBO0lBQzFCLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuXG5pbXBvcnQgeyBwb3N0IH0gZnJvbSAnLi4vLi4vcmVxdWVzdC9pbmRleCdcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBhY3Rpb246ICcnLFxuICAgIGZpcnN0V29ya3NwYWNlOiB0cnVlLFxuICAgIG5hbWU6ICcnLFxuICAgIGNyZWF0ZU9ySm9pbkJ0bkRpc2FibGVkOiB0cnVlLFxuICB9LFxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIHRoaXMuc2V0RGF0YSh7IGFjdGlvbjogb3B0aW9ucy5hY3Rpb24gfSlcbiAgfSxcblxuICBvbklucHV0KGU6IGFueSkge1xuICAgIHRoaXMuc2V0RGF0YSh7IG5hbWU6IGUuZGV0YWlsLnZhbHVlIH0pXG4gIH0sXG5cbiAgb25DcmVhdGVUYXAoKSB7XG4gICAgdGhpcy5zZXREYXRhKHsgYWN0aW9uOiAnY3JlYXRlJyB9KVxuICB9LFxuXG4gIG9uSm9pblRhcCgpIHtcbiAgICB0aGlzLnNldERhdGEoeyBhY3Rpb246ICdqb2luJyB9KVxuICB9LFxuXG4gIG9uQ3JlYXRlT3JKb2luVGFwKCkge1xuICAgIGxldCBuYW1lID0gdGhpcy5kYXRhLm5hbWVcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5bel5L2c56m66Ze05ZCN56ewJyxcbiAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IHVybCA9ICcvd29ya3NwYWNlcydcbiAgICBpZiAodGhpcy5kYXRhLmFjdGlvbiA9PT0gJ2pvaW4nKSB7XG4gICAgICB1cmwgKz0gJy9qb2luJ1xuICAgIH1cbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5aSE55CG5LitJyB9KVxuICAgIHBvc3QodXJsLCB7IG5hbWUgfSkudGhlbihyZXMgPT4ge1xuICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgbGV0IG1lc3NhZ2VcbiAgICAgIGlmICh0aGlzLmRhdGEuYWN0aW9uID09PSAnY3JlYXRlJykge1xuICAgICAgICBtZXNzYWdlID0gJ+WIm+W7uuaIkOWKnydcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSAn5bey5o+Q5Lqk5Yqg5YWl55Sz6K+377yM6K+3562J5b6F566h55CG5ZGY5a6h5qC4J1xuICAgICAgfVxuICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6IG1lc3NhZ2UsXG4gICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICB3eC5yZWRpcmVjdFRvKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICBsZXQgbWVzc2FnZSA9ICfor7fmsYLlpLHotKXvvIzor7fph43mlrDlsJ3or5UnXG4gICAgICBpZiAoZXJyICYmIGVyci5kYXRhICYmIGVyci5kYXRhLmVycikge1xuICAgICAgICBzd2l0Y2ggKGVyci5kYXRhLmVyci5yZWFzb24pIHtcbiAgICAgICAgICBjYXNlICdlcnJfYWxyZWFkeV9leGlzdHMnOlxuICAgICAgICAgICAgbWVzc2FnZSA9ICfor6Xlt6XkvZznqbrpl7TlkI3np7Dlt7Looqvkvb/nlKjvvIzor7fkvb/nlKjlhbbku5blkI3np7AnXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ2Vycl9ub3RfZXhpc3QnOlxuICAgICAgICAgICAgbWVzc2FnZSA9ICfor6Xlt6XkvZznqbrpl7TkuI3lrZjlnKgnXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogbWVzc2FnZSxcbiAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG5cbiAgb25Td2l0Y2hBY3Rpb25UYXAoKSB7XG4gICAgbGV0IGFjdGlvbiA9IHRoaXMuZGF0YS5hY3Rpb25cbiAgICBpZiAoYWN0aW9uID09PSAnY3JlYXRlJykge1xuICAgICAgYWN0aW9uID0gJ2pvaW4nXG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGlvbiA9ICdjcmVhdGUnXG4gICAgfVxuICAgIHRoaXMuc2V0RGF0YSh7IGFjdGlvbiB9KVxuICB9LFxufSlcbiJdfQ==