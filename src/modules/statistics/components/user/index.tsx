import styles from './index.module.scss';

import second_pers from 'assets/images/second_perc.svg';
import { FC } from 'react';

type IProps = {
  id: string | undefined
  login: string | undefined
  finished_areas: number | undefined
  earned: number | undefined
  workers: number | undefined
}

const User:FC<IProps> = ({id,earned,finished_areas,login,workers}) => {
  return (
    <div key={id} className={styles.user_wrapp}>
        <img className={styles.user_img} src={second_pers} alt="second_pers" />
        <div className={styles.user_content}>
            <h2>{login}</h2>
            <div>
                <p>Закрыто площадок - {finished_areas}</p>
                <p>Полученно - {earned}</p>
                <p>Количество рабочих - {workers}</p>
            </div>
        </div>
    </div>
  )
}

export default User