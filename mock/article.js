import Mock from 'MockJS';

let usersListData = Mock.mock({
  'data|100-300': [
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
    res.json(resData);
  },

  'GET /apiM/article/types': (req, res) => {
    const type = [
      {name: '公告', id: 1},
      {name: '文化', id: 2},
      {name: '新闻', id: 3},
    ]
    res.json(type);
  },

  'GET /apiM/article': (req, res) => {
    let {query} = req;
    const {id} = query;
    let article = {
      id: id,
      title: Mock.mock('@ctitle'),
      date: Mock.mock('@date("yyyy-MM-dd HH:mm")'),
      content: Mock.mock('@cparagraph(100, 400)'),
      typeID: Mock.mock('@integer(1, 3)'),
    };
    res.json(article);
  },

  'POST /apiM/newArticle': (req, res) => {
    const article =eval(req.body)
    res.json('ok');
  },
}

module.exports = article;
