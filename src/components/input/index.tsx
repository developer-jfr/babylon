import {FC} from 'react';
import styles from './index.module.scss';

type IProps = {
  text:string,
  type: 'text' | 'email'
  labelBg?: string
}

const Input:FC<IProps> = ({text,type, labelBg = '#f9f3e9'}) => {
  return (
    <div className={styles.form}>
    <input
      type={`${type}`}
      id="email"
      className={styles.form_input}
      autoComplete="off"
      placeholder=" "
    />
    <label style={{backgroundColor: `${labelBg}`}} className={styles.form_label}>{text}</label>
  </div>
  )
}

export default Input