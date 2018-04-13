import { Spin } from 'antd';
import styles from './style/spin.css';

const spin = () => {
  return(
    <div className={styles.spc}>
      <Spin className={styles.spin} size="large"/>
      <div className={styles.text}>加载中<span className={styles.loding}>...</span></div>
    </div>
  )
}

export default spin;
