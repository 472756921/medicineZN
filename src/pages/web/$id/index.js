import { connect } from 'dva';
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button } from 'antd';
import styles from './datail.css';
import E from 'wangeditor';
import pathToRegexp from 'path-to-regexp';
import { Select } from 'antd';
const Option = Select.Option;

let editor = '';
let title = '';
let date = '';
let dis = '';


const se = (web, typeID, type) => {
  let index = web.filter( it => {
    if(it.id === typeID) {
      return it;
    }
  })
  return (
    <Select defaultValue={index[0].name} style={{ width: 200, zIndex: '11000' }} onChage={change}>
      {
        web!==''?web.map((it, i) => {
          return (<Option value={it.id} key={it.id}>{it.name}</Option>)
        }):''
      }
    </Select>
  )
}
const change = (data) => {

}
let select = '';
class article extends React.Component {

  componentWillMount() {
    dis = this.props.dispatch;
    const pathname = this.props.history.location.pathname;
    const match = pathToRegexp('/web/:id').exec(pathname);
    this.props.dispatch({type: 'detail/queryArticle', payload:{articleID: match[1]}});
    this.props.dispatch({type: 'detail/querytypes'});
  }

  componentDidMount () {
    const toolbar = document.getElementById('toolbar');
    const text = document.getElementById('text');
    editor = new E(toolbar, text);
    editor.customConfig.showLinkImg = false;
    editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
    editor.customConfig.zIndex = 1;
    editor.create();
  }

  componentDidUpdate() {
    if(this.props.detail.typeList.length > 0) {
      select = se(this.props.detail.typeList, this.props.detail.article.typeID, this.props.detail.article.type);
    }
    date = this.props.detail.article.date;
    title = this.props.detail.article.title;
    editor.txt.html(this.props.detail.article.content);
  }

  send = () => {
    this.props.dispatch({type: 'detail/send', payload:{id: 1}});
  }
  back = () => {
    window.history.back();
  }

  render() {
    return(
      <div className={styles.content}>
        <div className={styles.back}> <span onClick={this.back}><Icon type="left" /> 返回</span></div>
        {date}
        <div style={{ marginBottom: 16, width: '400px' }}>
          <Input addonBefore="标题" value={title}/>
        </div>
        <div style={{ marginBottom: 16, width: '400px' }}>
          <span>类型：{select}</span>
        </div>
        <div>
          <div id='toolbar' style={{borderTop: '1px solid #999'}}></div>
          <div id='text' style={{height: '50vh', border: '1px solid #999'}}></div>
        </div>
        <br/>
        <Button type="primary" onClick={this.send}>发布</Button>
      </div>
    )
  }
}

article.propTypes = {
  typeList: PropTypes.object,
  detail: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ loading, detail, typeList }) => ({ loading, detail, typeList }))(article)
