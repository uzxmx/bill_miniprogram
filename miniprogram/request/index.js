"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.post = exports.get = void 0;
var manager_1 = require("../user/manager");
var baseURL = "https://bill.kuaigonglian.com/api";
function addAuthenticationHeaders(options) {
    if (!options.header) {
        options.header = {};
    }
    options.header['X-User-Id'] = manager_1.default.getUserId();
    options.header['X-User-Access-Token'] = manager_1.default.getAccessToken();
}
function get(url, options) {
    if (options === void 0) { options = {}; }
    options.url = baseURL + url;
    options.method = 'GET';
    addAuthenticationHeaders(options);
    return request(options);
}
exports.get = get;
function post(url, data, options) {
    if (options === void 0) { options = {}; }
    options.url = baseURL + url;
    options.method = 'POST';
    addAuthenticationHeaders(options);
    options.data = data;
    return request(options);
}
exports.post = post;
function request(options) {
    return new Promise(function (resolve, reject) {
        options.success = function (res) {
            if (res.statusCode >= 200 && res.statusCode < 400 && !res.data.err) {
                resolve(res);
            }
            else {
                reject(res);
            }
        };
        options.fail = function (err) {
            reject(err);
        };
        wx.request(options);
    });
}
exports.request = request;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBeUM7QUFFekMsSUFBTSxPQUFPLEdBQUcsbUNBQW1DLENBQUE7QUFFbkQsU0FBUyx3QkFBd0IsQ0FBQyxPQUFZO0lBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ25CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO0tBQ3BCO0lBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxpQkFBVyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ3JELE9BQU8sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxpQkFBVyxDQUFDLGNBQWMsRUFBRSxDQUFBO0FBQ3RFLENBQUM7QUFFRCxTQUFnQixHQUFHLENBQUMsR0FBVyxFQUFFLE9BQWlCO0lBQWpCLHdCQUFBLEVBQUEsWUFBaUI7SUFDaEQsT0FBTyxDQUFDLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFBO0lBQzNCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQ3RCLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2pDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3pCLENBQUM7QUFMRCxrQkFLQztBQUVELFNBQWdCLElBQUksQ0FBQyxHQUFXLEVBQUUsSUFBUyxFQUFFLE9BQWlCO0lBQWpCLHdCQUFBLEVBQUEsWUFBaUI7SUFDNUQsT0FBTyxDQUFDLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFBO0lBQzNCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3ZCLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2pDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBQ25CLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3pCLENBQUM7QUFORCxvQkFNQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxPQUFZO0lBQ2xDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUNqQyxPQUFPLENBQUMsT0FBTyxHQUFHLFVBQUMsR0FBUTtZQUN6QixJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNiO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNaO1FBQ0gsQ0FBQyxDQUFBO1FBQ0QsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFDLEdBQVE7WUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2IsQ0FBQyxDQUFBO1FBQ0QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNyQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFkRCwwQkFjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVc2VyTWFuYWdlciBmcm9tICcuLi91c2VyL21hbmFnZXInXG5cbmNvbnN0IGJhc2VVUkwgPSBcImh0dHBzOi8vYmlsbC5rdWFpZ29uZ2xpYW4uY29tL2FwaVwiXG5cbmZ1bmN0aW9uIGFkZEF1dGhlbnRpY2F0aW9uSGVhZGVycyhvcHRpb25zOiBhbnkpIHtcbiAgaWYgKCFvcHRpb25zLmhlYWRlcikge1xuICAgIG9wdGlvbnMuaGVhZGVyID0ge31cbiAgfVxuICBvcHRpb25zLmhlYWRlclsnWC1Vc2VyLUlkJ10gPSBVc2VyTWFuYWdlci5nZXRVc2VySWQoKVxuICBvcHRpb25zLmhlYWRlclsnWC1Vc2VyLUFjY2Vzcy1Ub2tlbiddID0gVXNlck1hbmFnZXIuZ2V0QWNjZXNzVG9rZW4oKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KHVybDogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSk6IFByb21pc2U8YW55PiB7XG4gIG9wdGlvbnMudXJsID0gYmFzZVVSTCArIHVybFxuICBvcHRpb25zLm1ldGhvZCA9ICdHRVQnXG4gIGFkZEF1dGhlbnRpY2F0aW9uSGVhZGVycyhvcHRpb25zKVxuICByZXR1cm4gcmVxdWVzdChvcHRpb25zKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9zdCh1cmw6IHN0cmluZywgZGF0YTogYW55LCBvcHRpb25zOiBhbnkgPSB7fSk6IFByb21pc2U8YW55PiB7XG4gIG9wdGlvbnMudXJsID0gYmFzZVVSTCArIHVybFxuICBvcHRpb25zLm1ldGhvZCA9ICdQT1NUJ1xuICBhZGRBdXRoZW50aWNhdGlvbkhlYWRlcnMob3B0aW9ucylcbiAgb3B0aW9ucy5kYXRhID0gZGF0YVxuICByZXR1cm4gcmVxdWVzdChvcHRpb25zKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdChvcHRpb25zOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIG9wdGlvbnMuc3VjY2VzcyA9IChyZXM6IGFueSkgPT4ge1xuICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID49IDIwMCAmJiByZXMuc3RhdHVzQ29kZSA8IDQwMCAmJiAhcmVzLmRhdGEuZXJyKSB7XG4gICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgIH1cbiAgICB9XG4gICAgb3B0aW9ucy5mYWlsID0gKGVycjogYW55KSA9PiB7XG4gICAgICByZWplY3QoZXJyKVxuICAgIH1cbiAgICB3eC5yZXF1ZXN0KG9wdGlvbnMpXG4gIH0pXG59XG4iXX0=