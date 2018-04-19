import { connect } from 'dva';
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button } from 'antd';
import styles from './datail.css';
import E from 'wangeditor';

class article extends React.Component {

  componentDidMount() {
    const toolbar = document.getElementById('toolbar');
    const text = document.getElementById('text');
    let editor = new E(toolbar, text);
    editor.customConfig.showLinkImg = false;
    editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
    editor.create();
    editor.txt.html(this.props.detail.article.content);
  }
  render() {
    return(
      <div className={styles.content}>
        {this.props.detail.article.date}
        <div style={{ marginBottom: 16, width: '400px' }}>
          <Input addonBefore="标题" defaultValue={this.props.detail.article.title}/>
        </div>
        <div>
          <div id='toolbar' style={{borderTop: '1px solid #999'}}></div>
          <div id='text' style={{height: '50vh', border: '1px solid #999'}}></div>
        </div>
        <br/>
        <Button type="primary">发布</Button>
      </div>
    )
  }
}

article.propTypes = {
  detail: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ loading, detail }) => ({ loading, detail }))(article)
