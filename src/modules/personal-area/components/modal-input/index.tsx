import { FC } from 'react';
import Input from '../../../../components/input';
import styles from './index.module.scss';

type IProps = {
  type: 'text' | 'number'
  text: string
}

const ModalInput:FC<IProps> = ({type = 'text', text = ''}) => {
  return (
    <div className={styles.form}>
    <input
      type={`${type}`}
      id="email"
      className={styles.form_input}
      autoComplete="off"
      placeholder=" "
    />
    <label className={styles.form_label}>{text}</label>
  </div>
  )
}

export default ModalInput