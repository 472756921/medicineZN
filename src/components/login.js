import React from 'react';
import styles from './style/login.css';
import { Input, Button, Icon} from 'antd';

const login = ({login, change}) => {
  return (
    <div className={styles.loginBK}>
      <div className={styles.infos}>
        <div>登录系统</div>
        <br/>
        <Input placeholder="账号" onChange={(e)=>{change(e.target)}}/>
        <br/>
        <br/>
        <Input type='password' placeholder="密码" onChange={(e)=>{change(e.target)}}/>
        <br/>
        <br/>
        <Button type="primary" onClick={login}>登录<Icon type="right" /></Button>
      </div>
    </div>
  );
};

login.propTypes = {
};

export default login;
