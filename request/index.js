"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.del = exports.patch = exports.post = exports.get = void 0;
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
    if (data === void 0) { data = null; }
    if (options === void 0) { options = {}; }
    options.url = baseURL + url;
    options.method = 'POST';
    addAuthenticationHeaders(options);
    options.data = data;
    return request(options);
}
exports.post = post;
function patch(url, data, options) {
    if (data === void 0) { data = null; }
    if (options === void 0) { options = {}; }
    options.url = baseURL + url;
    options.method = 'PUT';
    addAuthenticationHeaders(options);
    options.data = data;
    return request(options);
}
exports.patch = patch;
function del(url, options) {
    if (options === void 0) { options = {}; }
    options.url = baseURL + url;
    options.method = 'DELETE';
    addAuthenticationHeaders(options);
    return request(options);
}
exports.del = del;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBeUM7QUFFekMsSUFBTSxPQUFPLEdBQUcsbUNBQW1DLENBQUE7QUFFbkQsU0FBUyx3QkFBd0IsQ0FBQyxPQUFZO0lBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ25CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO0tBQ3BCO0lBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxpQkFBVyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ3JELE9BQU8sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxpQkFBVyxDQUFDLGNBQWMsRUFBRSxDQUFBO0FBQ3RFLENBQUM7QUFFRCxTQUFnQixHQUFHLENBQUMsR0FBVyxFQUFFLE9BQWlCO0lBQWpCLHdCQUFBLEVBQUEsWUFBaUI7SUFDaEQsT0FBTyxDQUFDLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFBO0lBQzNCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQ3RCLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2pDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3pCLENBQUM7QUFMRCxrQkFLQztBQUVELFNBQWdCLElBQUksQ0FBQyxHQUFXLEVBQUUsSUFBZ0IsRUFBRSxPQUFpQjtJQUFuQyxxQkFBQSxFQUFBLFdBQWdCO0lBQUUsd0JBQUEsRUFBQSxZQUFpQjtJQUNuRSxPQUFPLENBQUMsR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUE7SUFDM0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDdkIsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDakMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7SUFDbkIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDekIsQ0FBQztBQU5ELG9CQU1DO0FBRUQsU0FBZ0IsS0FBSyxDQUFDLEdBQVcsRUFBRSxJQUFnQixFQUFFLE9BQWlCO0lBQW5DLHFCQUFBLEVBQUEsV0FBZ0I7SUFBRSx3QkFBQSxFQUFBLFlBQWlCO0lBQ3BFLE9BQU8sQ0FBQyxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsQ0FBQTtJQUMzQixPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtJQUN0Qix3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNqQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtJQUNuQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUN6QixDQUFDO0FBTkQsc0JBTUM7QUFFRCxTQUFnQixHQUFHLENBQUMsR0FBVyxFQUFFLE9BQWlCO0lBQWpCLHdCQUFBLEVBQUEsWUFBaUI7SUFDaEQsT0FBTyxDQUFDLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFBO0lBQzNCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFBO0lBQ3pCLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2pDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3pCLENBQUM7QUFMRCxrQkFLQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxPQUFZO0lBQ2xDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUNqQyxPQUFPLENBQUMsT0FBTyxHQUFHLFVBQUMsR0FBUTtZQUN6QixJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNiO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNaO1FBQ0gsQ0FBQyxDQUFBO1FBQ0QsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFDLEdBQVE7WUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2IsQ0FBQyxDQUFBO1FBQ0QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNyQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFkRCwwQkFjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVc2VyTWFuYWdlciBmcm9tICcuLi91c2VyL21hbmFnZXInXG5cbmNvbnN0IGJhc2VVUkwgPSBcImh0dHBzOi8vYmlsbC5rdWFpZ29uZ2xpYW4uY29tL2FwaVwiXG5cbmZ1bmN0aW9uIGFkZEF1dGhlbnRpY2F0aW9uSGVhZGVycyhvcHRpb25zOiBhbnkpIHtcbiAgaWYgKCFvcHRpb25zLmhlYWRlcikge1xuICAgIG9wdGlvbnMuaGVhZGVyID0ge31cbiAgfVxuICBvcHRpb25zLmhlYWRlclsnWC1Vc2VyLUlkJ10gPSBVc2VyTWFuYWdlci5nZXRVc2VySWQoKVxuICBvcHRpb25zLmhlYWRlclsnWC1Vc2VyLUFjY2Vzcy1Ub2tlbiddID0gVXNlck1hbmFnZXIuZ2V0QWNjZXNzVG9rZW4oKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KHVybDogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSk6IFByb21pc2U8YW55PiB7XG4gIG9wdGlvbnMudXJsID0gYmFzZVVSTCArIHVybFxuICBvcHRpb25zLm1ldGhvZCA9ICdHRVQnXG4gIGFkZEF1dGhlbnRpY2F0aW9uSGVhZGVycyhvcHRpb25zKVxuICByZXR1cm4gcmVxdWVzdChvcHRpb25zKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9zdCh1cmw6IHN0cmluZywgZGF0YTogYW55ID0gbnVsbCwgb3B0aW9uczogYW55ID0ge30pOiBQcm9taXNlPGFueT4ge1xuICBvcHRpb25zLnVybCA9IGJhc2VVUkwgKyB1cmxcbiAgb3B0aW9ucy5tZXRob2QgPSAnUE9TVCdcbiAgYWRkQXV0aGVudGljYXRpb25IZWFkZXJzKG9wdGlvbnMpXG4gIG9wdGlvbnMuZGF0YSA9IGRhdGFcbiAgcmV0dXJuIHJlcXVlc3Qob3B0aW9ucylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoKHVybDogc3RyaW5nLCBkYXRhOiBhbnkgPSBudWxsLCBvcHRpb25zOiBhbnkgPSB7fSk6IFByb21pc2U8YW55PiB7XG4gIG9wdGlvbnMudXJsID0gYmFzZVVSTCArIHVybFxuICBvcHRpb25zLm1ldGhvZCA9ICdQVVQnXG4gIGFkZEF1dGhlbnRpY2F0aW9uSGVhZGVycyhvcHRpb25zKVxuICBvcHRpb25zLmRhdGEgPSBkYXRhXG4gIHJldHVybiByZXF1ZXN0KG9wdGlvbnMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWwodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgb3B0aW9ucy51cmwgPSBiYXNlVVJMICsgdXJsXG4gIG9wdGlvbnMubWV0aG9kID0gJ0RFTEVURSdcbiAgYWRkQXV0aGVudGljYXRpb25IZWFkZXJzKG9wdGlvbnMpXG4gIHJldHVybiByZXF1ZXN0KG9wdGlvbnMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0KG9wdGlvbnM6IGFueSk6IFByb21pc2U8YW55PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgb3B0aW9ucy5zdWNjZXNzID0gKHJlczogYW55KSA9PiB7XG4gICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPj0gMjAwICYmIHJlcy5zdGF0dXNDb2RlIDwgNDAwICYmICFyZXMuZGF0YS5lcnIpIHtcbiAgICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QocmVzKVxuICAgICAgfVxuICAgIH1cbiAgICBvcHRpb25zLmZhaWwgPSAoZXJyOiBhbnkpID0+IHtcbiAgICAgIHJlamVjdChlcnIpXG4gICAgfVxuICAgIHd4LnJlcXVlc3Qob3B0aW9ucylcbiAgfSlcbn1cbiJdfQ==