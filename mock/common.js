import Mock from 'MockJS';

const adminUser = [
  { userName: 'admin', password: 'admin', head: 'XXX', permissions: 'admin'},
  { userName: 'guest', password: 'guest', head: 'XXX', permissions: 'guest'},
  { userName: 'dev', password: 'dev', head: 'XXX', permissions: 'dev'},
];

let Dashboard =  {
  'POST /apiM/user/login': (req, res) => {
    const { userName, password } =eval(req.body)
    const user = adminUser.filter(item => item.userName === userName);
    console.log(user.password);
    setTimeout(()=>{
      if(user.length > 0 && user[0].password === password) {
        res.send(user[0]);
      } else {
        res.status(400).end()
      }
    }, 1000)
  },
};

module.exports = Dashboard;
