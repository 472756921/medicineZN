const api_M = '/apiM'

module.exports = {
  name: '智能辅助系统',
  footerText: ' Admin © 2018 Benson',
  logo: '',
  openPages: ['/login', '/404'],
  api: {
    getUser: api_M + '/user/getUser',
    login: api_M + '/user/login',
    loginOut: api_M + '/user/loginOut',
    articleList: api_M + '/article/list',
    articleTyles:  api_M + '/article/types',
    articleByID:  api_M + '/article',
  }
}
