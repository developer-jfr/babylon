import NavBar from '../../components/nav-bar';
import Level from './components/level';
import styles from './index.module.scss';
import { workersHandle } from './mock-data';
const Workers = () => {
  let level = workersHandle(Number(localStorage.getItem('currentLevel')));

  return (
    <div className={styles.workers_container}>
        <NavBar />
        <div className={styles.workers_grid}>
           {level?.map(item => <Level level={item.level} active={item.active} id={item.id} />)}
        </div>
    </div>
  )
}

export default Workers