import React from 'react';
import { connect } from 'dva'
import { Button, Select, Divider, Table, Modal } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './web.css';
const Option = Select.Option;

const columns = [{
  title: '标题',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '发布时间',
  dataIndex: 'date',
  key: 'date',
},  {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;" onClick={() => {read(text)}}>阅读</a>
      <Divider type="vertical" />
      <Link to={`web/${text.id}`}>修改</Link>
      <Divider type="vertical" />
      <a href="javascript:;" style={{color:'red'}}>删除</a>
    </span>
  ),
}];

function read(text) {
  dis({type: 'web/queryArticle', payload:{ visible: true, articleID: text.id }});
}

const se = (web, loading) => (
  <Select defaultValue={web.typeList[0].name} style={{ width: 200 }} onChange={changeData}>
    {
      web.typeList!==''?web.typeList.map((it, i) => {
        return (<Option value={it.id} key={it.id}>{it.name}</Option>)
      }):''
    }
  </Select>
)

const changeData = (value) => {
  dis({type: 'web/query', payload:{ page: 1, pageSize: 20, type: value }});
}
let dis = '';
const web = ({loading, web, dispatch}) => {
  dis = dispatch;
  const chage = (p, f, s) => {
    dispatch({type: 'web/query', payload:{ page: p.current, pageSize: 20, type: 1 }});
  }
  const handleOk = () => {};
  const newArticle = () => {
    dispatch({type: 'web/modelOP', payload:{ visible: false }});
  };
  const handleCancel = () => {
    dispatch({type: 'web/modelOP', payload:{ visible: false }});
  };
  let select = '';
  if(web.typeList.length > 0) {
    select = se(web);
  }

  return(
    <div>
      <div>
        类型：{select}
        <Button type="primary" icon="plus" style={{float: 'right'}} onClick={newArticle}>新增文章</Button>
      </div>
      <Divider />
      <div>
        <Table columns={columns} onChange={chage} dataSource={web.listData.data} loading={loading.models.web} pagination={{'total': web.listData.total, 'pageSize': 20}} />
      </div>
      <Modal title="文章详情" visible={web.visible} onOk={handleOk} onCancel={handleCancel} width='50%'>
        <div className={styles.articleTitle}>{web.article.title}</div>
        <div className={styles.articleDate}>{web.article.date}</div>
        <div className={styles.articleContent}>{web.article.content}</div>
      </Modal>
    </div>
  )
}

web.propTypes = {
  web: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ loading, web }) => ({ loading, web }))(web)
