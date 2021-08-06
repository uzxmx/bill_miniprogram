"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../request/index");
Component({
    data: {
        bills: []
    },
    lifetimes: {
        attached: function () {
            this.load();
        }
    },
    methods: {
        load: function () {
            var _this = this;
            index_1.get('/bills').then(function (res) {
                _this.setData({ bills: res.data });
            });
        },
        addBill: function () {
            wx.navigateTo({ url: '/pages/bill/form' });
        },
        onShow: function () {
            this.load();
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBeUM7QUFFekMsU0FBUyxDQUFDO0lBQ1IsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUVELFNBQVMsRUFBRTtRQUNULFFBQVE7WUFDTixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDYixDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxJQUFJO1lBQUosaUJBSUM7WUFIQyxXQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztnQkFDcEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNuQyxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFFRCxPQUFPO1lBQ0wsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUE7UUFDNUMsQ0FBQztRQUVELE1BQU07WUFDSixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDYixDQUFDO0tBQ0Y7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXQgfSBmcm9tICcuLi8uLi9yZXF1ZXN0L2luZGV4J1xuXG5Db21wb25lbnQoe1xuICBkYXRhOiB7XG4gICAgYmlsbHM6IFtdXG4gIH0sXG5cbiAgbGlmZXRpbWVzOiB7XG4gICAgYXR0YWNoZWQoKSB7XG4gICAgICB0aGlzLmxvYWQoKVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgbG9hZCgpIHtcbiAgICAgIGdldCgnL2JpbGxzJykudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnNldERhdGEoeyBiaWxsczogcmVzLmRhdGEgfSlcbiAgICAgIH0pXG4gICAgfSxcblxuICAgIGFkZEJpbGwoKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2JpbGwvZm9ybScgfSlcbiAgICB9LFxuXG4gICAgb25TaG93KCkge1xuICAgICAgdGhpcy5sb2FkKClcbiAgICB9XG4gIH1cbn0pXG4iXX0=