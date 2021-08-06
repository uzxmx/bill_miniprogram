import { get } from '../../request/index'

Component({
  data: {
    nickname: '',
    avatar: '/assets/images/icon-profile.png',
    has_workspace: false,
    workspace: '',
  },

  lifetimes: {
    attached() {
      get('/users/me').then(res => {
        const { avatar, nickname } = res.data
        let has_workspace = false, workspace = ''
        if (res.data.current_workspace) {
          has_workspace = true
          workspace = res.data.current_workspace.name
        }
        this.setData({ nickname, avatar, has_workspace, workspace })
      })
    }
  },

  methods: {
  }
})
