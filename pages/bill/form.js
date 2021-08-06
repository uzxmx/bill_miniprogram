"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../request/index");
Page({
    data: {
        actualAmountUpdated: false,
        billTypes: [
            { name: '收入', value: 'income', checked: true },
            { name: '支出', value: 'spend' }
        ],
        formData: {
            name: '',
            bill_type: 'income',
            amount: null,
            billed_at: '',
            count: 1
        },
    },
    onLoad: function () {
        var _a;
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        this.setData((_a = {}, _a['formData.billed_at'] = year + "-" + month + "-" + day, _a));
    },
    onBillTypeChanged: function (e) {
        var _a;
        var billTypes = this.data.billTypes;
        billTypes.forEach(function (billType) {
            billType.checked = billType.value === e.detail.value;
        });
        this.setData((_a = {
                billTypes: billTypes
            },
            _a['formData.bill_type'] = e.detail.value,
            _a));
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
        console.log(formData.amount);
        if (!formData.amount) {
            this.showError('请输入总金额');
            return;
        }
        wx.showLoading({ title: '提交中' });
        index_1.post('/bills', formData).then(function (res) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBMEM7QUFFMUMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osbUJBQW1CLEVBQUUsS0FBSztRQUMxQixTQUFTLEVBQUU7WUFDVCxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzlDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO1NBQy9CO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUUsUUFBUTtZQUNuQixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLENBQUM7U0FDVDtLQUNGO0lBRUQsTUFBTTs7UUFDSixJQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO1FBQ3ZCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUMvQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ2pDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUMxQixJQUFJLENBQUMsT0FBTyxXQUFHLEdBQUMsb0JBQW9CLElBQU0sSUFBSSxTQUFJLEtBQUssU0FBSSxHQUFLLE1BQUcsQ0FBQTtJQUNyRSxDQUFDO0lBRUQsaUJBQWlCLEVBQWpCLFVBQWtCLENBQU07O1FBQ3RCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFBO1FBQ3JDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFhO1lBQzlCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQTtRQUN0RCxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxPQUFPO2dCQUNWLFNBQVMsV0FBQTs7WUFDVCxHQUFDLG9CQUFvQixJQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDdEMsQ0FBQztJQUNMLENBQUM7SUFFRCxlQUFlLEVBQWYsVUFBZ0IsQ0FBTTs7UUFDWixJQUFBLEtBQUssR0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sTUFBNUIsQ0FBNEI7UUFFekMsSUFBSSxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUN4RCxJQUFJLENBQUMsT0FBTztnQkFDVixHQUFDLHdCQUF3QixJQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztvQkFDMUMsQ0FBQTtTQUNIO1FBRUQsSUFBSSxLQUFLLEtBQUssZUFBZSxFQUFFO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1NBQzVDO1FBRUQsSUFBSSxDQUFDLE9BQU87WUFDVixHQUFDLGNBQVksS0FBTyxJQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDckMsQ0FBQTtJQUNKLENBQUM7SUFFRCxTQUFTLEVBQVQsVUFBVSxLQUFhO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxLQUFLLE9BQUE7U0FDTixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDdkIsT0FBTTtTQUNQO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUN4QixPQUFNO1NBQ1A7UUFFRCxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDaEMsWUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQy9CLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNoQixFQUFFLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDbkIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ1AsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQ2hCLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLElBQUksRUFBRSxNQUFNO2FBQ2IsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcG9zdCB9IGZyb20gJy4uLy4uL3JlcXVlc3QvaW5kZXgnXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgYWN0dWFsQW1vdW50VXBkYXRlZDogZmFsc2UsXG4gICAgYmlsbFR5cGVzOiBbXG4gICAgICB7IG5hbWU6ICfmlLblhaUnLCB2YWx1ZTogJ2luY29tZScsIGNoZWNrZWQ6IHRydWUgfSxcbiAgICAgIHsgbmFtZTogJ+aUr+WHuicsIHZhbHVlOiAnc3BlbmQnIH1cbiAgICBdLFxuICAgIGZvcm1EYXRhOiB7XG4gICAgICBuYW1lOiAnJyxcbiAgICAgIGJpbGxfdHlwZTogJ2luY29tZScsXG4gICAgICBhbW91bnQ6IG51bGwsXG4gICAgICBiaWxsZWRfYXQ6ICcnLFxuICAgICAgY291bnQ6IDFcbiAgICB9LFxuICB9LFxuXG4gIG9uTG9hZCgpIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDFcbiAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICAgIHRoaXMuc2V0RGF0YSh7IFsnZm9ybURhdGEuYmlsbGVkX2F0J106IGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWAgfSlcbiAgfSxcblxuICBvbkJpbGxUeXBlQ2hhbmdlZChlOiBhbnkpIHtcbiAgICBjb25zdCBiaWxsVHlwZXMgPSB0aGlzLmRhdGEuYmlsbFR5cGVzXG4gICAgYmlsbFR5cGVzLmZvckVhY2goKGJpbGxUeXBlOiBhbnkpID0+IHtcbiAgICAgIGJpbGxUeXBlLmNoZWNrZWQgPSBiaWxsVHlwZS52YWx1ZSA9PT0gZS5kZXRhaWwudmFsdWVcbiAgICB9KVxuXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGJpbGxUeXBlcyxcbiAgICAgIFsnZm9ybURhdGEuYmlsbF90eXBlJ106IGUuZGV0YWlsLnZhbHVlXG4gICAgfSk7XG4gIH0sXG5cbiAgZm9ybUlucHV0Q2hhbmdlKGU6IGFueSkge1xuICAgIGNvbnN0IHsgZmllbGQgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0XG5cbiAgICBpZiAoZmllbGQgPT09ICdhbW91bnQnICYmICF0aGlzLmRhdGEuYWN0dWFsQW1vdW50VXBkYXRlZCkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgWydmb3JtRGF0YS5hY3R1YWxfYW1vdW50J106IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChmaWVsZCA9PT0gJ2FjdHVhbF9hbW91bnQnKSB7XG4gICAgICB0aGlzLnNldERhdGEoeyBhY3R1YWxBbW91bnRVcGRhdGVkOiB0cnVlIH0pXG4gICAgfVxuXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIFtgZm9ybURhdGEuJHtmaWVsZH1gXTogZS5kZXRhaWwudmFsdWVcbiAgICB9KVxuICB9LFxuXG4gIHNob3dFcnJvcihlcnJvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGVycm9yXG4gICAgfSlcbiAgfSxcblxuICBzdWJtaXQoKSB7XG4gICAgbGV0IGZvcm1EYXRhID0gdGhpcy5kYXRhLmZvcm1EYXRhXG4gICAgaWYgKCFmb3JtRGF0YS5uYW1lKSB7XG4gICAgICB0aGlzLnNob3dFcnJvcign6K+36L6T5YWl5ZCN56ewJylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGZvcm1EYXRhLmFtb3VudClcbiAgICBpZiAoIWZvcm1EYXRhLmFtb3VudCkge1xuICAgICAgdGhpcy5zaG93RXJyb3IoJ+ivt+i+k+WFpeaAu+mHkeminScpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5o+Q5Lqk5LitJyB9KVxuICAgIHBvc3QoJy9iaWxscycsIGZvcm1EYXRhKS50aGVuKHJlcyA9PiB7XG4gICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn6K+35rGC5aSx6LSl77yM6K+36YeN5paw5bCd6K+VJyxcbiAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn0pXG4iXX0=