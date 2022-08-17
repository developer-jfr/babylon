import { Dispatch, FC, SetStateAction } from "react";
import { useMediaQuery } from "react-responsive";

import styles from "./index.module.scss";
import second_perc from "assets/images/second_perc.svg";
import hix from "assets/images/hix.svg";
import { IQueueWorksers } from "models/ITower";

type IProps = {
  functionToggle: Dispatch<SetStateAction<boolean>>;
  toggle: boolean;
  queueWorksers: Array<IQueueWorksers> | undefined
};

const MainModal: FC<IProps> = ({ functionToggle, toggle , queueWorksers}) => {
  const isMobileScreen = useMediaQuery({ query: "(max-width:500px)" });
  return (
    <div className={`modal ${toggle && "is-active"} ${styles.modal}`}>
      <div className={`modal-background ${styles.modal_back}`}></div>
      <div className={`modal-card ${styles.modal_wrapp}`}>
        <div className={styles.close_wrapp}>
          <img onClick={() => functionToggle(false)} src={hix} alt="hix" />
        </div>
        <section
          className={`modal-card-body is-flex is-justify-content-center  ${styles.content_wrapp}`}
        >
          <div className={styles.modal_user_wrapp}>
            <div
              className={styles.title}
              style={{
                display: `${isMobileScreen ? "block" : "none"}`,
              }}
            >
              Очередь
            </div>
            {
              queueWorksers?.length !== 0 ? (
                queueWorksers?.map(item => (
                  <div className={styles.modal_user}>
                  <img src={second_perc} alt="second_perc" />
                  <div className={styles.user_info}>
                    <span>{item.user.username}</span>
                  </div>
                </div>
               ))
              ) : <span>Нет никого в очереди</span>
            }
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainModal;
