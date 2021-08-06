"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../request/index");
var deepClone_1 = require("../../utils/deepClone");
Page({
    data: {
        ready: false,
        bill: null,
        actualAmountUpdated: false,
        billTypes: [
            { name: '收入', value: 'income' },
            { name: '支出', value: 'spend' }
        ],
        formData: {
            name: '',
            bill_type: 'income',
            amount: null,
            billed_at: '',
            count: 1
        },
        selectedTag: '',
        tags: []
    },
    onLoad: function (options) {
        var _a;
        var _this = this;
        if (options.id) {
            wx.showLoading({ title: '加载中' });
            index_1.get("/bills/" + options.id).then(function (res) {
                wx.hideLoading();
                var bill = res.data;
                var selectedTag = bill.tag;
                var formData = bill;
                _this.setData({ bill: bill, ready: true, selectedTag: selectedTag, formData: formData });
            }).catch(function () {
                wx.hideLoading();
            });
        }
        else {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            this.setData((_a = {}, _a['formData.billed_at'] = year + "-" + month + "-" + day, _a.ready = true, _a));
        }
        index_1.get('/tags?tag_type=bill').then(function (res) {
            if (res.data.length > 0) {
                var tags = JSON.parse(res.data[0].value);
                _this.setData({ tags: tags });
            }
        });
    },
    onBillTypeChanged: function (e) {
        var _a;
        this.setData((_a = {},
            _a['formData.bill_type'] = e.detail.value,
            _a));
    },
    onTagChanged: function (e) {
        this.setData({ selectedTag: e.detail.value });
    },
    formInputChange: function (e) {
        var _a, _b;
        var field = e.currentTarget.dataset.field;
        if (field === 'amount' && !this.data.actualAmountUpdated) {
            this.setData((_a = {},
                _a['formData.actual_amount'] = e.detail.value,
                _a));
        }
        if (field === 'actual_amount') {
            this.setData({ actualAmountUpdated: true });
        }
        this.setData((_b = {},
            _b["formData." + field] = e.detail.value,
            _b));
    },
    showError: function (error) {
        this.setData({
            error: error
        });
    },
    submit: function () {
        var formData = this.data.formData;
        if (!formData.name) {
            this.showError('请输入名称');
            return;
        }
        if (!formData.amount) {
            this.showError('请输入总金额');
            return;
        }
        var data = deepClone_1.default(formData);
        data.tag = this.data.selectedTag;
        wx.showLoading({ title: '提交中' });
        var promise;
        if (this.data.bill) {
            promise = index_1.patch("/bills/" + this.data.bill.id, data);
        }
        else {
            promise = index_1.post('/bills', data);
        }
        promise.then(function () {
            wx.hideLoading();
            wx.navigateBack();
        }).catch(function () {
            wx.hideLoading();
            wx.showToast({
                title: '请求失败，请重新尝试',
                icon: 'none'
            });
        });
    },
    deleteBill: function () {
        var _this = this;
        wx.showModal({
            content: '是否确认删除?',
            success: function (res) {
                if (res.confirm) {
                    wx.showLoading({ title: '删除中' });
                    index_1.del("/bills/" + _this.data.bill.id).then(function () {
                        wx.hideLoading();
                        wx.navigateBack();
                    }).catch(function () {
                        wx.hideLoading();
                        wx.showToast({
                            title: '请求失败，请重新尝试',
                            icon: 'none'
                        });
                    });
                }
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBMkQ7QUFDM0QsbURBQTZDO0FBRTdDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFLElBQUk7UUFDVixtQkFBbUIsRUFBRSxLQUFLO1FBQzFCLFNBQVMsRUFBRTtZQUNULEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO1lBQy9CLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO1NBQy9CO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUUsUUFBUTtZQUNuQixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNELFdBQVcsRUFBRSxFQUFFO1FBQ2YsSUFBSSxFQUFFLEVBQUU7S0FDVDtJQUVELE1BQU0sWUFBQyxPQUFPOztRQUFkLGlCQTBCQztRQXpCQyxJQUFJLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDZCxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDaEMsV0FBRyxDQUFDLFlBQVUsT0FBTyxDQUFDLEVBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7Z0JBQ2xDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtnQkFDaEIsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtnQkFDckIsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtnQkFDNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFBO2dCQUNyQixLQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxNQUFBLEVBQUUsS0FBSyxFQUFFLElBQUks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QyxDQUFDLEtBQUssQ0FBQzt3QkFDUCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7d0JBQ2hCLEVBQUUsQ0FBQyxTQUFTLENBQUM7NEJBQ1gsS0FBSyxFQUFFLFlBQVk7NEJBQ25CLElBQUksRUFBRSxNQUFNO3lCQUNiLENBQUMsQ0FBQTtvQkFDSixDQUFDLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0LCBwb3N0LCBwYXRjaCwgZGVsIH0gZnJvbSAnLi4vLi4vcmVxdWVzdC9pbmRleCdcbmltcG9ydCBkZWVwQ2xvbmUgZnJvbSAnLi4vLi4vdXRpbHMvZGVlcENsb25lJ1xuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIHJlYWR5OiBmYWxzZSxcbiAgICBiaWxsOiBudWxsLFxuICAgIGFjdHVhbEFtb3VudFVwZGF0ZWQ6IGZhbHNlLFxuICAgIGJpbGxUeXBlczogW1xuICAgICAgeyBuYW1lOiAn5pS25YWlJywgdmFsdWU6ICdpbmNvbWUnIH0sXG4gICAgICB7IG5hbWU6ICfmlK/lh7onLCB2YWx1ZTogJ3NwZW5kJyB9XG4gICAgXSxcbiAgICBmb3JtRGF0YToge1xuICAgICAgbmFtZTogJycsXG4gICAgICBiaWxsX3R5cGU6ICdpbmNvbWUnLFxuICAgICAgYW1vdW50OiBudWxsLFxuICAgICAgYmlsbGVkX2F0OiAnJyxcbiAgICAgIGNvdW50OiAxXG4gICAgfSxcbiAgICBzZWxlY3RlZFRhZzogJycsXG4gICAgdGFnczogW11cbiAgfSxcblxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmlkKSB7XG4gICAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5Yqg6L295LitJyB9KVxuICAgICAgZ2V0KGAvYmlsbHMvJHtvcHRpb25zLmlkfWApLnRoZW4ocmVzID0+IHtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICBjb25zdCBiaWxsID0gcmVzLmRhdGFcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUYWcgPSBiaWxsLnRhZ1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IGJpbGxcbiAgICAgICAgdGhpcy5zZXREYXRhKHsgYmlsbCwgcmVhZHk6IHRydWUsIHNlbGVjdGVkVGFnLCBmb3JtRGF0YSB9KVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxXG4gICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICAgICAgdGhpcy5zZXREYXRhKHsgWydmb3JtRGF0YS5iaWxsZWRfYXQnXTogYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YCwgcmVhZHk6IHRydWUgfSlcbiAgICB9XG5cbiAgICBnZXQoJy90YWdzP3RhZ190eXBlPWJpbGwnKS50aGVuKHJlcyA9PiB7XG4gICAgICBpZiAocmVzLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB0YWdzID0gSlNPTi5wYXJzZShyZXMuZGF0YVswXS52YWx1ZSlcbiAgICAgICAgdGhpcy5zZXREYXRhKHsgdGFncyB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgb25CaWxsVHlwZUNoYW5nZWQoZTogYW55KSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIFsnZm9ybURhdGEuYmlsbF90eXBlJ106IGUuZGV0YWlsLnZhbHVlXG4gICAgfSk7XG4gIH0sXG5cbiAgb25UYWdDaGFuZ2VkKGU6IGFueSkge1xuICAgIHRoaXMuc2V0RGF0YSh7IHNlbGVjdGVkVGFnOiBlLmRldGFpbC52YWx1ZSB9KVxuICB9LFxuXG4gIGZvcm1JbnB1dENoYW5nZShlOiBhbnkpIHtcbiAgICBjb25zdCB7IGZpZWxkIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldFxuXG4gICAgaWYgKGZpZWxkID09PSAnYW1vdW50JyAmJiAhdGhpcy5kYXRhLmFjdHVhbEFtb3VudFVwZGF0ZWQpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIFsnZm9ybURhdGEuYWN0dWFsX2Ftb3VudCddOiBlLmRldGFpbC52YWx1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoZmllbGQgPT09ICdhY3R1YWxfYW1vdW50Jykge1xuICAgICAgdGhpcy5zZXREYXRhKHsgYWN0dWFsQW1vdW50VXBkYXRlZDogdHJ1ZSB9KVxuICAgIH1cblxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBbYGZvcm1EYXRhLiR7ZmllbGR9YF06IGUuZGV0YWlsLnZhbHVlXG4gICAgfSlcbiAgfSxcblxuICBzaG93RXJyb3IoZXJyb3I6IHN0cmluZykge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBlcnJvclxuICAgIH0pXG4gIH0sXG5cbiAgc3VibWl0KCkge1xuICAgIGxldCBmb3JtRGF0YSA9IHRoaXMuZGF0YS5mb3JtRGF0YVxuICAgIGlmICghZm9ybURhdGEubmFtZSkge1xuICAgICAgdGhpcy5zaG93RXJyb3IoJ+ivt+i+k+WFpeWQjeensCcpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoIWZvcm1EYXRhLmFtb3VudCkge1xuICAgICAgdGhpcy5zaG93RXJyb3IoJ+ivt+i+k+WFpeaAu+mHkeminScpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IGRlZXBDbG9uZShmb3JtRGF0YSlcbiAgICBkYXRhLnRhZyA9IHRoaXMuZGF0YS5zZWxlY3RlZFRhZ1xuXG4gICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+aPkOS6pOS4rScgfSlcbiAgICBsZXQgcHJvbWlzZVxuICAgIGlmICh0aGlzLmRhdGEuYmlsbCkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgcHJvbWlzZSA9IHBhdGNoKGAvYmlsbHMvJHt0aGlzLmRhdGEuYmlsbC5pZH1gLCBkYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlID0gcG9zdCgnL2JpbGxzJywgZGF0YSlcbiAgICB9XG4gICAgcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6ICfor7fmsYLlpLHotKXvvIzor7fph43mlrDlsJ3or5UnLFxuICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBkZWxldGVCaWxsKCkge1xuICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICBjb250ZW50OiAn5piv5ZCm56Gu6K6k5Yig6ZmkPycsXG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5Yig6Zmk5LitJyB9KVxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBkZWwoYC9iaWxscy8ke3RoaXMuZGF0YS5iaWxsLmlkfWApLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcbiAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+ivt+axguWksei0pe+8jOivt+mHjeaWsOWwneivlScsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxufSlcbiJdfQ==