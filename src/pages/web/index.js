import React from 'react';
import { connect } from 'dva'
import { Button, Select, Divider, Table, Modal } from 'antd';
import PropTypes from 'prop-types';
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
      <a href="javascript:;">修改</a>
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
        <Button type="primary" icon="plus" style={{float: 'right'}}>新增文章</Button>
      </div>
      <Divider />
      <div>
        <Table columns={columns} onChange={chage} dataSource={web.listData.data} loading={loading.models.web} pagination={{'total': web.listData.total, 'pageSize': 20}} />
      </div>
      <Modal title="Basic Modal" visible={web.visible} onOk={handleOk} onCancel={handleCancel}>
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  )
}

web.propTypes = {
  web: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ loading, web }) => ({ loading, web }))(web)
