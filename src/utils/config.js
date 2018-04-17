const api_M = '/apiM'

module.exports = {
  name: '智能辅助系统',
  footerText: this.name + 'Admin © 2017 Benson',
  logo: '',
  openPages: ['/login'],
  api: {
    login: api_M + '/user/login',
    loginOut: api_M + '/user/loginOut',
  }
}
