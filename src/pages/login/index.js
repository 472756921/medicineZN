import { connect } from 'dva'
import { Button, Icon, Form, Input, Checkbox } from 'antd'
import styles from './index.css'
import PropTypes from 'prop-types'
import {name} from '../../utils/config'

const FormItem = Form.Item

const Login = ({loading, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({ type: 'login/login', payload: values })
      }
    });
  }
  return (
    <div className={styles.bk}>
      <div className={styles.form}>
        <Form onSubmit={handleSubmit} className="login-form">
          <div className={styles.title}>{name}</div>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}
Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ loading }) => ({ loading }))(Form.create()(Login))
