"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../request/index");
var manager_1 = require("../../upload/manager");
var deepClone_1 = require("../../utils/deepClone");
Page({
    data: {
        ready: false,
        category: null,
        cargoId: '',
        parent: null,
        formData: {
            name: '',
            price: '',
            count: null,
            note: '',
        },
        photo: null,
        files: [],
        tag_selection: '_input',
        tag_selections: [],
        tag: null,
        tags: [],
    },
    onLoad: function (options) {
        var _this = this;
        if (options.id) {
            wx.setNavigationBarTitle({ title: '修改货物分类' });
            wx.showLoading({ title: '加载中' });
            index_1.get("/cargo_categories/" + options.id).then(function (res) {
                wx.hideLoading();
                var category = res.data;
                var name = category.name, price = category.price, count = category.count, note = category.note, photo = category.photo;
                var formData = { name: name, price: price, count: count, note: note };
                var files = [];
                if (category.photo) {
                    files = [{ url: manager_1.default.getUrl(photo), loading: false }];
                }
                _this.setData({ category: category, formData: formData, photo: photo, files: files, ready: true });
                _this.loadTags(category.parent_id);
            }).catch(function () {
                wx.hideLoading();
            });
        }
        else {
            wx.setNavigationBarTitle({ title: '添加货物分类' });
            this.loadTags(options.parentId);
            this.setData({ cargoId: options.cargoId, ready: true });
        }
    },
    loadTags: function (parentId) {
        var _this = this;
        if (parentId) {
            index_1.get("/cargo_categories/" + parentId).then(function (res) {
                _this.setData({ parent: res.data });
                _this.doLoadTags();
            });
        }
        else {
            this.doLoadTags();
        }
    },
    doLoadTags: function () {
        var _this = this;
        index_1.get('/tags?tag_type=cargo_category').then(function (res) {
            var tag_selections = [];
            res.data.forEach(function (e) {
                if (!_this.data.parent || _this.data.parent.tag_id !== e.id) {
                    tag_selections.push({ name: e.name, value: e.name });
                }
            });
            tag_selections.push({ name: '手动输入分类名称', value: '_input' });
            _this.setData({ tag_selections: tag_selections });
            res.data.forEach(function (e) {
                e.value = JSON.parse(e.value).map(function (v) {
                    return { name: v, value: v };
                });
            });
            _this.setData({ tags: res.data });
            if (_this.data.category && _this.data.category.tag_id) {
                var tag = res.data.find(function (e) { return e.id === _this.data.category.tag_id; });
                if (tag) {
                    _this.setData({ tag_selection: tag.name, tag: _this.data.category.name });
                }
            }
        });
    },
    onTagSelectionChange: function (e) {
        this.setData({ tag_selection: e.detail.value });
    },
    onTagChange: function (e) {
        this.setData({ tag: e.detail.value });
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
    onUploadError: function () {
        wx.showToast({
            title: '图片上传失败',
            icon: 'none'
        });
    },
    onSelectFile: function (e) {
        var _this = this;
        manager_1.default.upload(e.detail.tempFilePaths[0]).then(function (res) {
            var files = [{ url: manager_1.default.getUrl(res.data.key), loading: false }];
            _this.setData({ files: files, photo: res.data.key });
        });
    },
    submit: function () {
        var _this = this;
        var formData = this.data.formData;
        if (this.data.tag_selection === '_input') {
            if (!formData.name) {
                this.showError('请输入名称');
                return;
            }
        }
        else {
            if (!this.data.tag) {
                this.showError("\u8BF7\u9009\u62E9" + this.data.tag_selection);
                return;
            }
        }
        if (!this.data.parent && !formData.price) {
            this.showError('请输入价格');
            return;
        }
        var data = deepClone_1.default(formData);
        data.photo = this.data.photo;
        if (this.data.tag_selection !== '_input') {
            data.tag_id = this.data.tags.find(function (e) { return e.name === _this.data.tag_selection; }).id;
            data.name = this.data.tag;
        }
        if (this.data.parent) {
            data.parent_id = this.data.parent.id;
        }
        wx.showLoading({ title: '提交中' });
        var promise;
        if (this.data.category) {
            promise = index_1.patch("/cargo_categories/" + this.data.category.id, data);
        }
        else {
            promise = index_1.post("/cargo_categories?cargo_id=" + this.data.cargoId, data);
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
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnlGb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2F0ZWdvcnlGb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQXNEO0FBQ3RELGdEQUFnRDtBQUNoRCxtREFBNkM7QUFFN0MsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLEtBQUs7UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxFQUFFO1FBQ1gsTUFBTSxFQUFFLElBQUk7UUFDWixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsRUFBRTtTQUNUO1FBQ0QsS0FBSyxFQUFFLElBQUk7UUFDWCxLQUFLLEVBQUUsRUFBRTtRQUNULGFBQWEsRUFBRSxRQUFRO1FBQ3ZCLGNBQWMsRUFBRSxFQUFFO1FBQ2xCLEdBQUcsRUFBRSxJQUFJO1FBQ1QsSUFBSSxFQUFFLEVBQUU7S0FDVDtJQUVELE1BQU0sWUFBQyxPQUFPO1FBQWQsaUJBMkJDO1FBMUJDLElBQUksT0FBTyxDQUFDLEVBQUUsRUFBRTtZQUNkLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO1lBQzdDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNoQyxXQUFHLENBQUMsdUJBQXFCLE9BQU8sQ0FBQyxFQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO2dCQUM3QyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ2hCLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7Z0JBQ2pCLElBQUEsSUFBSSxHQUFnQyxRQUFRLEtBQXhDLEVBQUUsS0FBSyxHQUF5QixRQUFRLE1BQWpDLEVBQUUsS0FBSyxHQUFrQixRQUFRLE1BQTFC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QUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDcEU7YUFBTTtZQUNMLE9BQU8sR0FBRyxZQUFJLENBQUMsZ0NBQThCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQ3hFO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNYLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNoQixFQUFFLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDbkIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ1AsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQ2hCLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLElBQUksRUFBRSxNQUFNO2FBQ2IsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0LCBwb3N0LCBwYXRjaCB9IGZyb20gJy4uLy4uL3JlcXVlc3QvaW5kZXgnXG5pbXBvcnQgVXBsb2FkTWFuYWdlciBmcm9tICcuLi8uLi91cGxvYWQvbWFuYWdlcidcbmltcG9ydCBkZWVwQ2xvbmUgZnJvbSAnLi4vLi4vdXRpbHMvZGVlcENsb25lJ1xuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIHJlYWR5OiBmYWxzZSxcbiAgICBjYXRlZ29yeTogbnVsbCxcbiAgICBjYXJnb0lkOiAnJyxcbiAgICBwYXJlbnQ6IG51bGwsXG4gICAgZm9ybURhdGE6IHtcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgcHJpY2U6ICcnLFxuICAgICAgY291bnQ6IG51bGwsXG4gICAgICBub3RlOiAnJyxcbiAgICB9LFxuICAgIHBob3RvOiBudWxsLFxuICAgIGZpbGVzOiBbXSxcbiAgICB0YWdfc2VsZWN0aW9uOiAnX2lucHV0JyxcbiAgICB0YWdfc2VsZWN0aW9uczogW10sXG4gICAgdGFnOiBudWxsLFxuICAgIHRhZ3M6IFtdLFxuICB9LFxuXG4gIG9uTG9hZChvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuaWQpIHtcbiAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7IHRpdGxlOiAn5L+u5pS56LSn54mp5YiG57G7JyB9KVxuICAgICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+WKoOi9veS4rScgfSlcbiAgICAgIGdldChgL2NhcmdvX2NhdGVnb3JpZXMvJHtvcHRpb25zLmlkfWApLnRoZW4ocmVzID0+IHtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICBjb25zdCBjYXRlZ29yeSA9IHJlcy5kYXRhXG4gICAgICAgIGNvbnN0IHsgbmFtZSwgcHJpY2UsIGNvdW50LCBub3RlLCBwaG90byB9ID0gY2F0ZWdvcnlcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSB7IG5hbWUsIHByaWNlLCBjb3VudCwgbm90ZSB9XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBsZXQgZmlsZXMgPSBbXVxuICAgICAgICBpZiAoY2F0ZWdvcnkucGhvdG8pIHtcbiAgICAgICAgICBmaWxlcyA9IFt7IHVybDogVXBsb2FkTWFuYWdlci5nZXRVcmwocGhvdG8pLCBsb2FkaW5nOiBmYWxzZSB9XVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNldERhdGEoeyBjYXRlZ29yeSwgZm9ybURhdGEsIHBob3RvLCBmaWxlcywgcmVhZHk6IHRydWUgfSlcbiAgICAgICAgdGhpcy5sb2FkVGFncyhjYXRlZ29yeS5wYXJlbnRfaWQpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7IHRpdGxlOiAn5re75Yqg6LSn54mp5YiG57G7JyB9KVxuICAgICAgdGhpcy5sb2FkVGFncyhvcHRpb25zLnBhcmVudElkKVxuICAgICAgdGhpcy5zZXREYXRhKHsgY2FyZ29JZDogb3B0aW9ucy5jYXJnb0lkLCByZWFkeTogdHJ1ZSB9KVxuICAgIH1cbiAgfSxcblxuICBsb2FkVGFncyhwYXJlbnRJZDogYW55KSB7XG4gICAgaWYgKHBhcmVudElkKSB7XG4gICAgICBnZXQoYC9jYXJnb19jYXRlZ29yaWVzLyR7cGFyZW50SWR9YCkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnNldERhdGEoeyBwYXJlbnQ6IHJlcy5kYXRhIH0pXG4gICAgICAgIHRoaXMuZG9Mb2FkVGFncygpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvTG9hZFRhZ3MoKVxuICAgIH1cbiAgfSxcblxuICBkb0xvYWRUYWdzKCkge1xuICAgIGdldCgnL3RhZ3M/dGFnX3R5cGU9Y2FyZ29fY2F0ZWdvcnknKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdGFnX3NlbGVjdGlvbnMgPSBbXVxuICAgICAgcmVzLmRhdGEuZm9yRWFjaCgoZTogYW55KSA9PiB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEucGFyZW50IHx8IHRoaXMuZGF0YS5wYXJlbnQudGFnX2lkICE9PSBlLmlkKSB7XG4gICAgICAgICAgdGFnX3NlbGVjdGlvbnMucHVzaCh7IG5hbWU6IGUubmFtZSwgdmFsdWU6IGUubmFtZSB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGFnX3NlbGVjdGlvbnMucHVzaCh7IG5hbWU6ICfmiYvliqjovpPlhaXliIbnsbvlkI3np7AnLCB2YWx1ZTogJ19pbnB1dCcgfSlcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRoaXMuc2V0RGF0YSh7IHRhZ19zZWxlY3Rpb25zIH0pXG5cbiAgICAgIHJlcy5kYXRhLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgICBlLnZhbHVlID0gSlNPTi5wYXJzZShlLnZhbHVlKS5tYXAoKHY6IHN0cmluZykgPT4ge1xuICAgICAgICAgIHJldHVybiB7IG5hbWU6IHYsIHZhbHVlOiB2IH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICB0aGlzLnNldERhdGEoeyB0YWdzOiByZXMuZGF0YSB9KVxuXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBpZiAodGhpcy5kYXRhLmNhdGVnb3J5ICYmIHRoaXMuZGF0YS5jYXRlZ29yeS50YWdfaWQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBsZXQgdGFnID0gcmVzLmRhdGEuZmluZCgoZTogYW55KSA9PiBlLmlkID09PSB0aGlzLmRhdGEuY2F0ZWdvcnkudGFnX2lkKVxuICAgICAgICBpZiAodGFnKSB7XG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7IHRhZ19zZWxlY3Rpb246IHRhZy5uYW1lLCB0YWc6IHRoaXMuZGF0YS5jYXRlZ29yeS5uYW1lIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIG9uVGFnU2VsZWN0aW9uQ2hhbmdlKGU6IGFueSkge1xuICAgIHRoaXMuc2V0RGF0YSh7IHRhZ19zZWxlY3Rpb246IGUuZGV0YWlsLnZhbHVlIH0pO1xuICB9LFxuXG4gIG9uVGFnQ2hhbmdlKGU6IGFueSkge1xuICAgIHRoaXMuc2V0RGF0YSh7IHRhZzogZS5kZXRhaWwudmFsdWUgfSk7XG4gIH0sXG5cbiAgZm9ybUlucHV0Q2hhbmdlKGU6IGFueSkge1xuICAgIGNvbnN0IHsgZmllbGQgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIFtgZm9ybURhdGEuJHtmaWVsZH1gXTogZS5kZXRhaWwudmFsdWVcbiAgICB9KVxuICB9LFxuXG4gIHNob3dFcnJvcihlcnJvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGVycm9yXG4gICAgfSlcbiAgfSxcblxuICBvblVwbG9hZEVycm9yKCkge1xuICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICB0aXRsZTogJ+WbvueJh+S4iuS8oOWksei0pScsXG4gICAgICBpY29uOiAnbm9uZSdcbiAgICB9KVxuICB9LFxuXG4gIG9uU2VsZWN0RmlsZShlOiBhbnkpIHtcbiAgICBVcGxvYWRNYW5hZ2VyLnVwbG9hZChlLmRldGFpbC50ZW1wRmlsZVBhdGhzWzBdKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgZmlsZXMgPSBbeyB1cmw6IFVwbG9hZE1hbmFnZXIuZ2V0VXJsKHJlcy5kYXRhLmtleSksIGxvYWRpbmc6IGZhbHNlIH1dXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLnNldERhdGEoeyBmaWxlcywgcGhvdG86IHJlcy5kYXRhLmtleSB9KVxuICAgIH0pXG4gIH0sXG5cbiAgc3VibWl0KCkge1xuICAgIGxldCBmb3JtRGF0YSA9IHRoaXMuZGF0YS5mb3JtRGF0YVxuICAgIGlmICh0aGlzLmRhdGEudGFnX3NlbGVjdGlvbiA9PT0gJ19pbnB1dCcpIHtcbiAgICAgIGlmICghZm9ybURhdGEubmFtZSkge1xuICAgICAgICB0aGlzLnNob3dFcnJvcign6K+36L6T5YWl5ZCN56ewJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5kYXRhLnRhZykge1xuICAgICAgICB0aGlzLnNob3dFcnJvcihg6K+36YCJ5oupJHt0aGlzLmRhdGEudGFnX3NlbGVjdGlvbn1gKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZGF0YS5wYXJlbnQgJiYgIWZvcm1EYXRhLnByaWNlKSB7XG4gICAgICB0aGlzLnNob3dFcnJvcign6K+36L6T5YWl5Lu35qC8JylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBkYXRhID0gZGVlcENsb25lKGZvcm1EYXRhKVxuICAgIGRhdGEucGhvdG8gPSB0aGlzLmRhdGEucGhvdG9cbiAgICBpZiAodGhpcy5kYXRhLnRhZ19zZWxlY3Rpb24gIT09ICdfaW5wdXQnKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBkYXRhLnRhZ19pZCA9IHRoaXMuZGF0YS50YWdzLmZpbmQoKGU6IGFueSkgPT4gZS5uYW1lID09PSB0aGlzLmRhdGEudGFnX3NlbGVjdGlvbikuaWRcbiAgICAgIGRhdGEubmFtZSA9IHRoaXMuZGF0YS50YWdcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YS5wYXJlbnQpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGRhdGEucGFyZW50X2lkID0gdGhpcy5kYXRhLnBhcmVudC5pZFxuICAgIH1cblxuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfmj5DkuqTkuK0nIH0pXG4gICAgbGV0IHByb21pc2VcbiAgICBpZiAodGhpcy5kYXRhLmNhdGVnb3J5KSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBwcm9taXNlID0gcGF0Y2goYC9jYXJnb19jYXRlZ29yaWVzLyR7dGhpcy5kYXRhLmNhdGVnb3J5LmlkfWAsIGRhdGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UgPSBwb3N0KGAvY2FyZ29fY2F0ZWdvcmllcz9jYXJnb19pZD0ke3RoaXMuZGF0YS5jYXJnb0lkfWAsIGRhdGEpXG4gICAgfVxuICAgIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn6K+35rGC5aSx6LSl77yM6K+36YeN5paw5bCd6K+VJyxcbiAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn0pXG4iXX0=