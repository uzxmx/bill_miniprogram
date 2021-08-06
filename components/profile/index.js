"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../request/index");
Component({
    data: {
        nickname: '',
        avatar: '/assets/images/icon-profile.png',
        has_workspace: false,
        workspace: '',
    },
    lifetimes: {
        attached: function () {
            var _this = this;
            index_1.get('/users/me').then(function (res) {
                var _a = res.data, avatar = _a.avatar, nickname = _a.nickname;
                var has_workspace = false, workspace = '';
                if (res.data.current_workspace) {
                    has_workspace = true;
                    workspace = res.data.current_workspace.name;
                }
                _this.setData({ nickname: nickname, avatar: avatar, has_workspace: has_workspace, workspace: workspace });
            });
        }
    },
    methods: {}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUF5QztBQUV6QyxTQUFTLENBQUM7SUFDUixJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUUsRUFBRTtRQUNaLE1BQU0sRUFBRSxpQ0FBaUM7UUFDekMsYUFBYSxFQUFFLEtBQUs7UUFDcEIsU0FBUyxFQUFFLEVBQUU7S0FDZDtJQUVELFNBQVMsRUFBRTtRQUNULFFBQVE7WUFBUixpQkFVQztZQVRDLFdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO2dCQUNqQixJQUFBLEtBQXVCLEdBQUcsQ0FBQyxJQUFJLEVBQTdCLE1BQU0sWUFBQSxFQUFFLFFBQVEsY0FBYSxDQUFBO2dCQUNyQyxJQUFJLGFBQWEsR0FBRyxLQUFLLEVBQUUsU0FBUyxHQUFHLEVBQUUsQ0FBQTtnQkFDekMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO29CQUM5QixhQUFhLEdBQUcsSUFBSSxDQUFBO29CQUNwQixTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUE7aUJBQzVDO2dCQUNELEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLFVBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxhQUFhLGVBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxDQUFDLENBQUE7WUFDOUQsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUUsRUFDUjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldCB9IGZyb20gJy4uLy4uL3JlcXVlc3QvaW5kZXgnXG5cbkNvbXBvbmVudCh7XG4gIGRhdGE6IHtcbiAgICBuaWNrbmFtZTogJycsXG4gICAgYXZhdGFyOiAnL2Fzc2V0cy9pbWFnZXMvaWNvbi1wcm9maWxlLnBuZycsXG4gICAgaGFzX3dvcmtzcGFjZTogZmFsc2UsXG4gICAgd29ya3NwYWNlOiAnJyxcbiAgfSxcblxuICBsaWZldGltZXM6IHtcbiAgICBhdHRhY2hlZCgpIHtcbiAgICAgIGdldCgnL3VzZXJzL21lJykudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zdCB7IGF2YXRhciwgbmlja25hbWUgfSA9IHJlcy5kYXRhXG4gICAgICAgIGxldCBoYXNfd29ya3NwYWNlID0gZmFsc2UsIHdvcmtzcGFjZSA9ICcnXG4gICAgICAgIGlmIChyZXMuZGF0YS5jdXJyZW50X3dvcmtzcGFjZSkge1xuICAgICAgICAgIGhhc193b3Jrc3BhY2UgPSB0cnVlXG4gICAgICAgICAgd29ya3NwYWNlID0gcmVzLmRhdGEuY3VycmVudF93b3Jrc3BhY2UubmFtZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7IG5pY2tuYW1lLCBhdmF0YXIsIGhhc193b3Jrc3BhY2UsIHdvcmtzcGFjZSB9KVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICB9XG59KVxuIl19