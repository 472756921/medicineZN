import React from 'react';
import { connect } from 'dva';
import LoginC from '../components/login';
import { message } from 'antd';
import Spin from '../components/Spin';

class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
    };
  }
  sendlogin() {
    if(this.state.password === '' || this.state.account === '') {
      message.error('请输入账号密码');
      return false
    }
    this.props.dispatch({type: 'login/login', payload: {account: this.state.account, password: this.state.password}})
  }
  chageValue(t) {
    if(t.type === 'text'){
      this.setState({account: t.value})
    } else if( t.type === 'password') {
      this.setState({password: t.value})
    }
  }

  componentDidUpdate() {
    if(this.props.pageStatus.status === 'error') {
      message.error(this.props.pageStatus.message);
      this.props.dispatch({type: 'login/loginShow', pyaload:{status:'normal', message: ''}})
    }
  }

  render(){
    return (
      <div>
        {
          this.props.pageStatus.status!=='loading'?'':<Spin/>
        }
        <LoginC login={this.sendlogin.bind(this)} change={this.chageValue.bind(this)} />
      </div>
    );
  }

}


function mapStateToProps(state) {
  const { account, pwd, pageStatus } = state.login;
  return {
    pwd,
    account,
    pageStatus,
    dispatch: state.dispatch,
  };
}

export default connect(mapStateToProps)(login);
