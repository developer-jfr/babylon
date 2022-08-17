import styles from './index.module.scss';

import second_pers from '../../../../assets/images/second_perc.svg';

const User = () => {
  return (
    <div className={styles.user_wrapp}>
        <img className={styles.user_img} src={second_pers} alt="second_pers" />
        <div className={styles.user_content}>
            <h2>Логин</h2>
            <div>
                <p>Закрыто площадок - 01</p>
                <p>Полученно - 01</p>
                <p>Количество рабочих - 01</p>
            </div>
        </div>
    </div>
  )
}

export default User