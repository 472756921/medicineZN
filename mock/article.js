import Mock from 'MockJS';

let usersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      title: '@ctitle(4,20)',
      date: '@date("yyyy-MM-dd HH:mm")',
      key: '@id',
    },
  ],
})

const article = {
  'GET /apiM/article/list': (req, res) => {
    let {query} = req;
    let nd = usersListData.data;
    let bd = nd.slice((query.page-1)*query.pageSize, query.page*query.pageSize);
    let resData = {
      data: bd,
      total: nd.length,
      page: Number(query.page),
    }
    setTimeout(()=>{
      res.json(resData);}, 1000)
  },

  'GET /apiM/article/types': (req, res) => {
    const type = [
      {name: '公告', id: 1},
      {name: '文化', id: 2},
      {name: '新闻', id: 3},
    ]
    res.json(type);
  },
}

module.exports = article;
