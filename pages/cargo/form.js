"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../request/index");
Page({
    data: {
        formData: {
            name: '',
            note: '',
        },
    },
    formInputChange: function (e) {
        var _a;
        var field = e.currentTarget.dataset.field;
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
        if (!formData.name) {
            this.showError('请输入货物名称');
            return;
        }
        wx.showLoading({ title: '提交中' });
        index_1.post('/cargoes', formData).then(function (res) {
            wx.hideLoading();
            wx.redirectTo({ url: "/pages/cargo/details?id=" + res.data.id });
        }).catch(function () {
            wx.hideLoading();
            wx.showToast({
                title: '请求失败，请重新尝试',
                icon: 'none'
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBMEM7QUFFMUMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtTQUNUO0tBQ0Y7SUFFRCxlQUFlLEVBQWYsVUFBZ0IsQ0FBTTs7UUFDWixJQUFBLEtBQUssR0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sTUFBNUIsQ0FBNEI7UUFDekMsSUFBSSxDQUFDLE9BQU87WUFDVixHQUFDLGNBQVksS0FBTyxJQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDckMsQ0FBQTtJQUNKLENBQUM7SUFFRCxTQUFTLEVBQVQsVUFBVSxLQUFhO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxLQUFLLE9BQUE7U0FDTixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDekIsT0FBTTtTQUNQO1FBRUQsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2hDLFlBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNqQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDaEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSw2QkFBMkIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQ2xFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNQLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNoQixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxZQUFZO2dCQUNuQixJQUFJLEVBQUUsTUFBTTthQUNiLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBvc3QgfSBmcm9tICcuLi8uLi9yZXF1ZXN0L2luZGV4J1xuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIGZvcm1EYXRhOiB7XG4gICAgICBuYW1lOiAnJyxcbiAgICAgIG5vdGU6ICcnLFxuICAgIH0sXG4gIH0sXG5cbiAgZm9ybUlucHV0Q2hhbmdlKGU6IGFueSkge1xuICAgIGNvbnN0IHsgZmllbGQgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIFtgZm9ybURhdGEuJHtmaWVsZH1gXTogZS5kZXRhaWwudmFsdWVcbiAgICB9KVxuICB9LFxuXG4gIHNob3dFcnJvcihlcnJvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGVycm9yXG4gICAgfSlcbiAgfSxcblxuICBzdWJtaXQoKSB7XG4gICAgbGV0IGZvcm1EYXRhID0gdGhpcy5kYXRhLmZvcm1EYXRhXG4gICAgaWYgKCFmb3JtRGF0YS5uYW1lKSB7XG4gICAgICB0aGlzLnNob3dFcnJvcign6K+36L6T5YWl6LSn54mp5ZCN56ewJylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfmj5DkuqTkuK0nIH0pXG4gICAgcG9zdCgnL2NhcmdvZXMnLCBmb3JtRGF0YSkudGhlbihyZXMgPT4ge1xuICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgd3gucmVkaXJlY3RUbyh7IHVybDogYC9wYWdlcy9jYXJnby9kZXRhaWxzP2lkPSR7cmVzLmRhdGEuaWR9YCB9KVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn6K+35rGC5aSx6LSl77yM6K+36YeN5paw5bCd6K+VJyxcbiAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn0pXG4iXX0=