import styles from "./index.module.scss";
import row from "assets/images/level-1.svg";

import Card from "./components/card";
import { useEffect } from "react";
import { towerLevelsHandle } from "./tower-level";
import { useGetMyWorkers } from "services/tower/tower-queries";
import { useGetRoomToken } from "services/chat/chat-queries";

const Home = () => {
  const { data, isSuccess } = useGetMyWorkers();
  const { data: roomData, isSuccess: roomSucces } = useGetRoomToken(localStorage.getItem('pk'));
  useEffect( () => {

     if(isSuccess) {
      //@ts-ignore
      towerLevelsHandle(data?.data[0]?.current_level);
     //@ts-ignore
      localStorage.setItem('currentLevel', data.data[0]?.current_level);
           
      localStorage.setItem('pk', data?.data[0]?.area?.id)
                 
      localStorage.setItem('levelid', data.data[0]?.queue.level.id);
      
      localStorage.setItem('userId', data?.data[0]?.user?.id)
     }
  }, [isSuccess])

  useEffect( () => {
    if(roomSucces) {
      localStorage.setItem('roomToken', roomData.data.access_token)
    }
  },[roomSucces]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        {/* @ts-ignore */}
        {towerLevelsHandle(data?.data[0]?.current_level).slice(0).reverse().map(e => <Card id={e.id} active={e.active} level={e.level} sc_level={e.sc_level} />)}
        <img  className={styles.level} src={row} alt="row" />
      </div>
    </div>
  );
};

export default Home;
