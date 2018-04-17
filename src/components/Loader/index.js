import { Spin, Icon } from 'antd';
import styles from './Loader.css';
import classNames from 'classnames'

const antIcon = <Icon type="loading" style={{ fontSize: 40, width: 40}} spin />;

const Loader = ({spinning, fullScreen}) => {
  return(
      <div className={classNames(styles.sc, {[styles.hidden]: !spinning, [styles.fullScreen]: fullScreen, })}>
        <div className={styles.content}>
          <Spin indicator={antIcon}/>
          <div style={{marginTop: '10px'}}>LOADING</div>
        </div>
      </div>
  )
}


export default Loader;
