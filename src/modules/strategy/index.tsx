import NavBar from "components/nav-bar";
import styles from "./index.module.scss";

const Strategy = () => {
  return (
    <div className={styles.strategy_container}>
      <NavBar />
      <div className={styles.strategy_content}>
        <div style={{fontSize: '18px', textAlign: 'center', paddingBottom: '50px'}}>Выберите стратегию</div>
        <div className={styles.strategy_content_wrapp}>
          <div className={styles.strategy_row}>
            <input type="radio" style={{marginTop: '2px'}} />
            <div style={{color: '#00FF38'}}>
              <span>Пассивный игрок</span>
              <p style={{paddingTop: '10px'}}>
                Участник покупает 1 виртулаьного рабочего и больше ничего не
                покупает, только если сам захочет (по умолчанию)
              </p>
            </div>
          </div>
          <div className={styles.strategy_row}>
            <input type="radio" style={{marginTop: '2px'}}/>
            <div>
              <span>Активный игрок (х1 или х2)</span>
              <p style={{paddingTop: '10px'}}>
                Автоматизированная система создания виртуальных рабочих. Покупка
                виртуального рабочего срабатывает, как только участник нажимает
                кнопки [Встать в очередь][Перейти на следующий уровень]. По этой
                стратегии можно выбрать х1 или х2
              </p>
            </div>
          </div>
          <div style={{paddingLeft: '25%'}}>
            <div className={styles.strategy_row}>
              <input style={{marginTop: '2px'}} type="radio" />
              <label>
                1 уровень площадки – покупается 1 дополнительный рабочих 2
                уровень площадки – покупается 2 дополнительных рабочих 3 уровень
                площадки – покупается 3 дополнительных рабочих 4 уровень
                площадки – покупается 4 дополнительных рабочих 5 уровень
                площадки – покупается 5 дополнительных рабочих И т.д.
              </label>
            </div>
            <div className={styles.strategy_row} style={{paddingTop:'10px'}} >
              <input style={{marginTop: '2px'}} type="radio" />
              <label>
                1 уровень площадки – покупается 2 дополнительных рабочих 2
                уровень площадки – покупается 4 дополнительный рабочих 3 уровень
                площадки – покупается 6 дополнительных рабочих 4 уровень
                площадки – покупается 8 дополнительных рабочих 5 уровень
                площадки – покупается 10 дополнительных рабочих И т.д.
              </label>
            </div>
          </div>
          <div className={styles.strategy_row}>
            <input style={{marginTop: '2px'}} type="radio" />
            <div>
              <span>Жадный игрок</span>
              <p style={{paddingTop: '10px'}}>Автоматическая покупка одного рабочего ежедневно</p>
            </div>
          </div>
          <a className={styles.strategy_text}>Сохранить</a>
          <div style={{color: '#FF0000'}}>
            <p>
              Одновременно можно использовать стратегии № 2 (х1 или х2) и № 3
            </p>
            <br />
            <p style={{marginTop:'10px'}}>
              Внимание! Вы хотите использовать обе стратегии игры. Это может
              повлечь дополнительные непредвиденные расходы!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Strategy;
