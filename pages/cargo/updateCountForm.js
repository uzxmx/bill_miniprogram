"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../request/index");
Page({
    data: {
        categoryId: '',
        action: '',
        title: '',
        totalCount: 0,
        price: 0,
        createBill: true,
        formData: {
            delta: '',
            bill: {
                billed_at: ''
            }
        },
    },
    onLoad: function (options) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var title = options.action === 'incr' ? '入库' : '出库';
        wx.setNavigationBarTitle({ title: title });
        this.setData({
            categoryId: options.categoryId,
            action: options.action,
            title: title,
            totalCount: Number.parseInt(options.totalCount),
            price: Number.parseFloat(options.price),
        });
        var formData = this.data.formData;
        formData.bill.billed_at = year + "-" + month + "-" + day;
        this.setData({ formData: formData });
    },
    onCreateBillChanged: function (e) {
        this.setData({ createBill: e.detail.value });
    },
    formInputChange: function (e) {
        var _a;
        var field = e.currentTarget.dataset.field;
        if (field === 'delta') {
            var amount = e.detail.value * this.data.price;
            console.log(amount);
            var formData = this.data.formData;
            formData.bill.amount = amount;
            formData.bill.actual_amount = amount;
            this.setData({ formData: formData });
        }
        this.setData((_a = {},
            _a["formData." + field] = e.detail.value,
            _a));
    },
    showError: function (error) {
        this.setData({
            error: error
        });
    },
    submit: function () {
        var formData = this.data.formData;
        if (!formData.delta) {
            this.showError("\u8BF7\u8F93\u5165" + this.data.title + "\u6570\u91CF");
            return;
        }
        if (this.data.action === 'decr' && parseInt(formData.delta) > this.data.totalCount) {
            this.showError("\u6700\u5927\u6570\u91CF\u4E3A" + this.data.totalCount);
            return;
        }
        if (this.data.createBill) {
            formData.create_bill = true;
        }
        else {
            delete formData.create_bill;
        }
        formData.action_type = this.data.action;
        wx.showLoading({ title: '提交中' });
        index_1.post("/cargo_categories/" + this.data.categoryId + "/update_count", formData).then(function () {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlQ291bnRGb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXBkYXRlQ291bnRGb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQTBDO0FBRTFDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLFVBQVUsRUFBRSxFQUFFO1FBQ2QsTUFBTSxFQUFFLEVBQUU7UUFDVixLQUFLLEVBQUUsRUFBRTtRQUNULFVBQVUsRUFBRSxDQUFDO1FBQ2IsS0FBSyxFQUFFLENBQUM7UUFDUixVQUFVLEVBQUUsSUFBSTtRQUNoQixRQUFRLEVBQUU7WUFDUixLQUFLLEVBQUUsRUFBRTtZQUNULElBQUksRUFBRTtnQkFDSixTQUFTLEVBQUUsRUFBRTthQUNkO1NBQ0Y7S0FDRjtJQUVELE1BQU0sRUFBTixVQUFPLE9BQU87UUFDWixJQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO1FBQ3ZCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUMvQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ2pDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUMxQixJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7UUFDckQsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxDQUFBO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVU7WUFDOUIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ3RCLEtBQUssT0FBQTtZQUNMLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFXLENBQUM7WUFDaEQsS0FBSyxFQUFF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V0FBVyxFQUFFLENBQUE7WUFDaEIsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsWUFBWTtnQkFDbkIsSUFBSSxFQUFFLE1BQU07YUFDYixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwb3N0IH0gZnJvbSAnLi4vLi4vcmVxdWVzdC9pbmRleCdcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBjYXRlZ29yeUlkOiAnJyxcbiAgICBhY3Rpb246ICcnLFxuICAgIHRpdGxlOiAnJyxcbiAgICB0b3RhbENvdW50OiAwLFxuICAgIHByaWNlOiAwLFxuICAgIGNyZWF0ZUJpbGw6IHRydWUsXG4gICAgZm9ybURhdGE6IHtcbiAgICAgIGRlbHRhOiAnJyxcbiAgICAgIGJpbGw6IHtcbiAgICAgICAgYmlsbGVkX2F0OiAnJ1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG5cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDFcbiAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICAgIGNvbnN0IHRpdGxlID0gb3B0aW9ucy5hY3Rpb24gPT09ICdpbmNyJyA/ICflhaXlupMnIDogJ+WHuuW6kydcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoeyB0aXRsZSB9KVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBjYXRlZ29yeUlkOiBvcHRpb25zLmNhdGVnb3J5SWQsXG4gICAgICBhY3Rpb246IG9wdGlvbnMuYWN0aW9uLFxuICAgICAgdGl0bGUsXG4gICAgICB0b3RhbENvdW50OiBOdW1iZXIucGFyc2VJbnQob3B0aW9ucy50b3RhbENvdW50ISksXG4gICAgICBwcmljZTogTnVtYmVyLnBhcnNlRmxvYXQob3B0aW9ucy5wcmljZSEpLFxuICAgIH0pXG5cbiAgICBsZXQgZm9ybURhdGEgPSB0aGlzLmRhdGEuZm9ybURhdGFcbiAgICBmb3JtRGF0YS5iaWxsLmJpbGxlZF9hdCA9IGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWBcbiAgICB0aGlzLnNldERhdGEoeyBmb3JtRGF0YSB9KVxuICB9LFxuXG4gIG9uQ3JlYXRlQmlsbENoYW5nZWQoZTogYW55KSB7XG4gICAgdGhpcy5zZXREYXRhKHsgY3JlYXRlQmlsbDogZS5kZXRhaWwudmFsdWUgfSlcbiAgfSxcblxuICBmb3JtSW5wdXRDaGFuZ2UoZTogYW55KSB7XG4gICAgY29uc3QgeyBmaWVsZCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcbiAgICBpZiAoZmllbGQgPT09ICdkZWx0YScpIHtcbiAgICAgIGxldCBhbW91bnQgPSBlLmRldGFpbC52YWx1ZSAqIHRoaXMuZGF0YS5wcmljZVxuICAgICAgY29uc29sZS5sb2coYW1vdW50KVxuICAgICAgbGV0IGZvcm1EYXRhID0gdGhpcy5kYXRhLmZvcm1EYXRhXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBmb3JtRGF0YS5iaWxsLmFtb3VudCA9IGFtb3VudFxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgZm9ybURhdGEuYmlsbC5hY3R1YWxfYW1vdW50ID0gYW1vdW50XG4gICAgICB0aGlzLnNldERhdGEoeyBmb3JtRGF0YSB9KVxuICAgIH1cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgW2Bmb3JtRGF0YS4ke2ZpZWxkfWBdOiBlLmRldGFpbC52YWx1ZVxuICAgIH0pXG4gIH0sXG5cbiAgc2hvd0Vycm9yKGVycm9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZXJyb3JcbiAgICB9KVxuICB9LFxuXG4gIHN1Ym1pdCgpIHtcbiAgICBsZXQgZm9ybURhdGEgPSB0aGlzLmRhdGEuZm9ybURhdGFcbiAgICBpZiAoIWZvcm1EYXRhLmRlbHRhKSB7XG4gICAgICB0aGlzLnNob3dFcnJvcihg6K+36L6T5YWlJHt0aGlzLmRhdGEudGl0bGV95pWw6YePYClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICh0aGlzLmRhdGEuYWN0aW9uID09PSAnZGVjcicgJiYgcGFyc2VJbnQoZm9ybURhdGEuZGVsdGEpID4gdGhpcy5kYXRhLnRvdGFsQ291bnQpIHtcbiAgICAgIHRoaXMuc2hvd0Vycm9yKGDmnIDlpKfmlbDph4/kuLoke3RoaXMuZGF0YS50b3RhbENvdW50fWApXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5kYXRhLmNyZWF0ZUJpbGwpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGZvcm1EYXRhLmNyZWF0ZV9iaWxsID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBkZWxldGUgZm9ybURhdGEuY3JlYXRlX2JpbGxcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGZvcm1EYXRhLmFjdGlvbl90eXBlID0gdGhpcy5kYXRhLmFjdGlvblxuXG4gICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+aPkOS6pOS4rScgfSlcbiAgICBwb3N0KGAvY2FyZ29fY2F0ZWdvcmllcy8ke3RoaXMuZGF0YS5jYXRlZ29yeUlkfS91cGRhdGVfY291bnRgLCBmb3JtRGF0YSkudGhlbigoKSA9PiB7XG4gICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn6K+35rGC5aSx6LSl77yM6K+36YeN5paw5bCd6K+VJyxcbiAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn0pXG4iXX0=