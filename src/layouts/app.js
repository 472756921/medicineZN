/* global window */
/* global document */
import { withRouter } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import {openPages} from '../utils/config'
import Loader from '../components/Loader'
import { name, footerText } from '../utils/config'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon, Avatar, Row, Col, Dropdown } from 'antd';
const { Header, Sider, Content, Footer } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">个人资料</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">退出登录</a>
    </Menu.Item>
  </Menu>
);

const App = ({children, dispatch, app, loading, location}) => {
  let { pathname } = location;
  const getMuensTree = (data)=>{
    return data.map((item, i) => {
      return (
        <Menu.Item key={i+1}>
          <Link to={item.route}><Icon type={item.icon}></Icon>{item.name}</Link>
        </Menu.Item>
      )
    })
  }
  let menus = getMuensTree(app.menu);
  if(openPages && openPages.includes(pathname)){
    return (
      <div>
        <Loader fullScreen spinning={loading.global}></Loader>
        {children}
      </div>
    )
  } else {
    return (
      <div style={{height: '100vh'}}>
        <Layout style={{height: '100%'}}>
          <Sider breakpoint="lg" collapsedWidth="0">
            <div style={{color: '#fff'}}>this is LOGO</div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              {menus}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: '0 20px'}}>
              <Row type="flex" justify="space-between">
                <Col span={4}><div style={{fontSize: 18 }}>{name}</div></Col>
                <Col span={3} style={{textAlign:'right'}}>
                  <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{app.user!==''?app.user.user.username:''}</Avatar>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="" style={{marginLeft: '10px'}}>
                      Click me <Icon type="down" />
                    </a>
                  </Dropdown>
                </Col>
              </Row>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              {name} {footerText}
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}


App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}


export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
