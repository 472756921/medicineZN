import { connect } from 'dva';
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button } from 'antd';
import styles from './datail.css';
import E from 'wangeditor';

let editor = '';
class article extends React.Component {

  componentDidMount () {
    const toolbar = document.getElementById('toolbar');
    const text = document.getElementById('text');
    editor = new E(toolbar, text);
    editor.customConfig.showLinkImg = false;
    editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
    editor.create();
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
        <div style={{ marginBottom: 16, width: '400px' }}>
          <Input addonBefore="标题"/>
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
  detail: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ loading, detail }) => ({ loading, detail }))(article)
