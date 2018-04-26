import { connect } from 'dva';
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, message } from 'antd';
import styles from './datail.css';
import E from 'wangeditor';
import { Select } from 'antd';
import { DateFormate } from '../../../utils/index';
const Option = Select.Option;

let editor = '';

class article extends React.Component {

  componentDidMount () {
    const toolbar = document.getElementById('toolbar');
    const text = document.getElementById('text');
    editor = new E(toolbar, text);
    editor.customConfig.showLinkImg = false;
    editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
    // editor.customConfig.focus = ''  // 上传图片到服务器
    editor.customConfig.zIndex = 1;
    editor.create();
  }

  componentDidUpdate() {
    if(this.props.loading.models.detail){
      editor.txt.html(this.props.detail.article.content);
    }
  }

  send = () => {
    if(editor.txt.html() ==='<p><br></p>' || this.props.detail.article.title === '' || this.props.detail.article.type === '') {
      message.error('请输入完整信息！');
      return false;
    }
    this.props.detail.article.content = editor.txt.html();
    this.props.detail.article.date = DateFormate(new Date(), 'yyyy-MM-dd hh:mm');
    this.props.dispatch({type: 'detail/send', payload:{article: this.props.detail.article}});
  }
  back = () => {
    window.history.back();
  }

  change = (data) => {
    let article = this.props.detail.article;
    article.type = data;
    this.props.dispatch({type: 'detail/articleChange', payload:{article: article}});
  }

  titleChange = (data) => {
    let article = this.props.detail.article;
    article.title =  data.target.value;
    this.props.dispatch({type: 'detail/articleChange', payload:{article: article}});
  }

  render() {
    return(
      <div className={styles.content}>
        <div className={styles.back}> <span onClick={this.back}><Icon type="left" /> 返回</span></div>
        <div style={{ marginBottom: 16, width: '400px' }}>
          {
            this.props.detail.optype === 'new'?'':'发布时间：'+ this.props.detail.article.date
          }
        </div>
        <div style={{ marginBottom: 16, width: '400px' }}>
          <span>文章类型：
            {
              this.props.loading.models.detail?'':<Select defaultValue={this.props.detail.article.typeName} style={{ width: 200, zIndex: '11000' }} onChange={this.change}>
                {
                  this.props.detail.typeList!==''?this.props.detail.typeList.map((it, i) => {
                    return (<Option value={it.id} key={it.id}>{it.name}</Option>)
                  }): ''
                }
              </Select>
            }
          </span>
        </div>
        <div style={{ marginBottom: 16, width: '400px' }}>
          <Input addonBefore="标题" value={this.props.detail.article.title} onChange={this.titleChange}/>
        </div>
        <div>
          <div id='toolbar' style={{borderTop: '1px solid #999'}}></div>
          <div id='text' style={{height: '45vh', border: '1px solid #999'}}></div>
        </div>
        <br/>
        <Button type="primary" onClick={this.send}>发布</Button>
      </div>
    )
  }
}

article.propTypes = {
  detail: PropTypes.object,
  web: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ loading, detail, web }) => ({ loading, detail, web }))(article)
