"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../request/index");
var UploadManager = (function () {
    function UploadManager() {
    }
    UploadManager.prototype.upload = function (path) {
        return new Promise(function (resolve, reject) {
            index_1.post('/upload_tokens').then(function (res) {
                wx.uploadFile({
                    url: 'https://upload.qiniup.com',
                    filePath: path,
                    name: 'file',
                    formData: {
                        token: res.data.token,
                        key: res.data.key,
                    },
                    success: function (res) {
                        res.data = JSON.parse(res.data);
                        resolve(res);
                    },
                    fail: function (err) {
                        reject(err);
                    },
                    complete: function () {
                    }
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    UploadManager.prototype.getUrl = function (key) {
        return "https://img.kangyu.co/" + key;
    };
    return UploadManager;
}());
exports.default = new UploadManager();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBdUM7QUFFdkM7SUFBQTtJQStCQSxDQUFDO0lBOUJDLDhCQUFNLEdBQU4sVUFBTyxJQUFZO1FBQ2pCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxZQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO2dCQUM3QixFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNaLEdBQUcsRUFBRSwyQkFBMkI7b0JBQ2hDLFFBQVEsRUFBRSxJQUFJO29CQUNkLElBQUksRUFBRSxNQUFNO29CQUNaLFFBQVEsRUFBRTt3QkFDUixLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLO3dCQUNyQixHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUUsVUFBQSxHQUFHO3dCQUNWLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7d0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDZCxDQUFDO29CQUNELElBQUksRUFBRSxVQUFBLEdBQUc7d0JBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUNiLENBQUM7b0JBQ0QsUUFBUSxFQUFFO29CQUNWLENBQUM7aUJBQ0YsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztnQkFDVixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDYixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDhCQUFNLEdBQU4sVUFBTyxHQUFXO1FBQ2hCLE9BQU8sMkJBQXlCLEdBQUssQ0FBQTtJQUN2QyxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBL0JELElBK0JDO0FBRUQsa0JBQWUsSUFBSSxhQUFhLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBvc3QgfSBmcm9tICcuLi9yZXF1ZXN0L2luZGV4J1xuXG5jbGFzcyBVcGxvYWRNYW5hZ2VyIHtcbiAgdXBsb2FkKHBhdGg6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHBvc3QoJy91cGxvYWRfdG9rZW5zJykudGhlbihyZXMgPT4ge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL3VwbG9hZC5xaW5pdXAuY29tJyxcbiAgICAgICAgICBmaWxlUGF0aDogcGF0aCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgIHRva2VuOiByZXMuZGF0YS50b2tlbixcbiAgICAgICAgICAgIGtleTogcmVzLmRhdGEua2V5LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgIHJlcy5kYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcbiAgICAgICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZXJyID0+IHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIHJlamVjdChlcnIpXG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0VXJsKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGh0dHBzOi8vaW1nLmthbmd5dS5jby8ke2tleX1gXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFVwbG9hZE1hbmFnZXIoKVxuIl19