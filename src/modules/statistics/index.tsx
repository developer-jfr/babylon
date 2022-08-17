import { IMainStatistics, IMyStatistics } from "models/ITower";
import { useEffect, useState } from "react";
import { useGetMainStatistics, useGetMyStatistics } from "services/tower/tower-queries";
import NavBar from "../../components/nav-bar";
import User from "./components/user";
import styles from "./index.module.scss";
//Images
import gold from "assets/images/gold.svg";

const Statistics = () => {
  const [mainStatistics, setMainStatistics] = useState<IMainStatistics>();
  const [ myStatistics, setMyStatistics] = useState<IMyStatistics>();
  const { data, isSuccess } = useGetMainStatistics();
  const { data:staticData , isSuccess: staticSucces} = useGetMyStatistics();

  useEffect(() => {
    setMainStatistics(data?.data);
  }, [isSuccess]);

  useEffect(() => {
    setMyStatistics(staticData?.data);
  }, [staticSucces]);
  return (
    <div className={styles.static_container}>
      <NavBar />
      <div className={styles.static_wrapp}>
        <div className={styles.static_crypto}>Статистика</div>
        <div>
          <div className={styles.static_level_grid}>
            <div className={styles.static_level_item}>
              <div className={styles.statistics_level_wrapp}>
                <img src={gold} alt="gold" />
                <div className={styles.statistics_level_text}>
                  <span>Закрытых площадок</span>
                  <span>{mainStatistics?.finished_areas}</span>
                </div>
              </div>
              <div className={styles.statistics_level_wrapp}>
                <img src={gold} alt="gold" />
                <div className={styles.statistics_level_text}>
                  <span>Количество рабочих</span>
                  <span>{mainStatistics?.workers}</span>
                </div>
              </div>
            </div>
            <div className={styles.static_level_item}>
              <div className={styles.statistics_level_wrapp}>
                <img src={gold} alt="gold" />
                <div className={styles.statistics_level_text}>
                  <span>Количество участников</span>
                  <span>{mainStatistics?.users}</span>
                </div>
              </div>
              <div className={styles.statistics_level_wrapp}>
                <img src={gold} alt="gold" />
                <div className={styles.statistics_level_text}>
                  <span>Максимальный уровень площадки</span>
                  <span>{mainStatistics?.max_level}</span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className={styles.chat_title}>Курс криптовалюты</div>
                <div className={styles.cryptocurrency}>
                  <div>
                    <div style={{ textAlign: "end" }}>01.01.2022</div>
                    <div className={styles.crypto_wrapp}>
                      <div>
                        <span className="has-text-weight-bold">Валюта</span>
                        <div className={styles.crypto_list}>
                          <span>Bitcoin BTC</span>
                          <span>Ethereum ETH</span>
                          <span>Tether USDT</span>
                          <span>Tronix TRX</span>
                        </div>
                      </div>
                      <div>
                        <span className="has-text-weight-bold">Стоимость</span>
                        <div className={styles.crypto_list}>
                          <span>25637.3$ -2580.23</span>
                          <span>1347.57$ -164.18</span>
                          <span>0.9998$ +0.0004</span>
                          <span>0.0740552$ -0.0016</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.static_user_grid}>
            <User id={myStatistics?.statistic.id} earned={myStatistics?.statistic.earned} finished_areas={myStatistics?.statistic.finished_areas} login={myStatistics?.first_name} workers={myStatistics?.statistic.workers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
