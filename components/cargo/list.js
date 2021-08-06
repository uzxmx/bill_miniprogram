"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../request/index");
Component({
    data: {
        cargoes: []
    },
    lifetimes: {
        attached: function () {
            this.load();
        }
    },
    methods: {
        load: function () {
            var _this = this;
            index_1.get('/cargoes').then(function (res) {
                _this.setData({ cargoes: res.data });
            });
        },
        addCargo: function () {
            wx.navigateTo({ url: '/pages/cargo/form' });
        },
        onShow: function () {
            this.load();
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBeUM7QUFFekMsU0FBUyxDQUFDO0lBQ1IsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUVELFNBQVMsRUFBRTtRQUNULFFBQVE7WUFDTixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDYixDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxJQUFJO1lBQUosaUJBSUM7WUFIQyxXQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztnQkFDdEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFFRCxRQUFRO1lBQ04sRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUE7UUFDN0MsQ0FBQztRQUVELE1BQU07WUFDSixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDYixDQUFDO0tBQ0Y7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXQgfSBmcm9tICcuLi8uLi9yZXF1ZXN0L2luZGV4J1xuXG5Db21wb25lbnQoe1xuICBkYXRhOiB7XG4gICAgY2FyZ29lczogW11cbiAgfSxcblxuICBsaWZldGltZXM6IHtcbiAgICBhdHRhY2hlZCgpIHtcbiAgICAgIHRoaXMubG9hZCgpXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBsb2FkKCkge1xuICAgICAgZ2V0KCcvY2FyZ29lcycpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHsgY2FyZ29lczogcmVzLmRhdGEgfSlcbiAgICAgIH0pXG4gICAgfSxcblxuICAgIGFkZENhcmdvKCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9jYXJnby9mb3JtJyB9KVxuICAgIH0sXG5cbiAgICBvblNob3coKSB7XG4gICAgICB0aGlzLmxvYWQoKVxuICAgIH1cbiAgfVxufSlcbiJdfQ==