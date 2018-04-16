/* global window */
/* global document */
import { withRouter } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import {openPages} from '../utils/config'
import styles from './app.css';


const App = ({children, dispatch, app, loading, location}) => {
  let { pathname } = location
  if(openPages && openPages.includes(pathname)){
    return (
      <div className={styles.loginBK}>{children}</div>
    )
  } else {
    return (
      <div>{children}</div>
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
