const api_M = '/apiM'

module.exports = {
  name: '智能辅助系统',
  footerText: ' Admin © 2018 Benson',
  logo: '',
  openPages: ['/login'],
  api: {
    getUser: api_M + '/user/getUser',
    login: api_M + '/user/login',
    loginOut: api_M + '/user/loginOut',
  }
}
