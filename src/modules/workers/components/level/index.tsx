import { FC } from 'react';
import styles from './index.module.scss';

type IProps = {
    level:number
    id: number
    active: boolean
}

const Level:FC<IProps> = ({level, id, active}) => {
  return (
    <div key={id} className={styles.workers_level_wrapp}>
    <div className={`${styles.workers_gate} ${active && styles.worker_active}`}></div>
    <div className={styles.workers_level_text}>
     <span className={`${active && styles.worker_active_text}`}>Уровень {level}</span>
     <span>001</span>
    </div>
</div>
  )
}

export default Level