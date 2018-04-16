import Mock from 'MockJS';

const loginSJ = (data) => {
  if(data.req.body.account == '123' && data.req.body.password == '123' ) {
    return JSON.stringify({userId:Mock.mock('@id'), userName:Mock.mock('@cname'), status: 200});
  }else {
    return JSON.stringify(backMessage)
  }
}

var backMessage = {
  status: '403',
  msg: '账号或密码错误',
};



let Dashboard =  {
  'POST /apiM/users/login': (req, res) => {
    res.send(loginSJ(res)); },
};

module.exports = Dashboard;
