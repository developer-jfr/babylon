import styles from "./index.module.scss";
import modal from "assets/images/modal.svg";
import { FC } from "react";
import { useGetUserDetailsByID } from "services/user/user-queries";
import { useGetBossInfo } from "services/tower/tower-queries";


type IPoprs = {
  id: string
}

const Modal:FC<IPoprs> = ({id}) => {
  console.log(id)
  const {data} = useGetBossInfo(id);
  return (
    <div key={data?.data.worker.id} className={styles.modal}>
      <div className={styles.modal_content}>
        <span>{data?.data.worker.user.username}</span>
       {data?.data.crypto[0].name !== null && (
        <div className={styles.wrapper}>
        <span> {data?.data.crypto[0].name} </span>
        <button className={styles.modal_btn}>Копировать</button>
       </div>
       )}
       {data?.data.cards[0].bank !== null && (
        <div className={styles.wrapper}>
        <span> {data?.data.cards[0].bank} </span>
        <button className={styles.modal_btn}>Копировать</button>
       </div>
       )}
       <div className={styles.wrapper}>
        <span>Примечание </span>
        <div className={styles.modal_note}></div>
       </div>
       <div>
        
       </div>
      </div>
    </div>
  );
};

export default Modal;
