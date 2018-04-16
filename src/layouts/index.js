import { LocaleProvider } from 'antd'
import withRouter from 'umi/withRouter'
import App from './app'

export default withRouter((props) => {
  return (
    <LocaleProvider>
      <App>
        { props.children }
      </App>
    </LocaleProvider>
  )
})
