import { memo, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useGetMyWorkers, useGetQueue } from "services/tower/tower-queries";
import NavBar from "../../components/nav-bar";
import AreaUser from "./components/area-users";
import InputBox from "./components/input-box";
import MainModal from "./components/queue-modal";
import styles from "./index.module.scss";
import {
  useGetRoomToken,
  usePreviousMessage,
} from "services/chat/chat-queries";
import { IMessages } from "models/IChat";


let URL = `wss://babylon-api.aitrix.online/chat/ws?chat_token=${localStorage.getItem('roomToken')}&user_token=${localStorage.getItem('access_token')}`
let ws = new WebSocket(URL);

const Area = () => {

  const isMobileScreen = useMediaQuery({ query: "(max-width:500px)" });

  const [isActive, setIsActive] = useState<boolean>(false);
  const { data, isSuccess } = useGetMyWorkers();
  const { data: queueData } = useGetQueue(localStorage.getItem('levelid'));
  const { data: prevMessage, isSuccess: prevSucces, refetch } = usePreviousMessage(localStorage.getItem('pk'));
  const { data: roomData, isSuccess: roomSucces } = useGetRoomToken(localStorage.getItem('pk'));
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  const [messages, setMessages] = useState<Array<IMessages>>([]);
  const [isConnectionOpen, setConnectionOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");

  // sending message function

  const sendMessage = () => {
    if (messageBody) {
      console.log(JSON.stringify({
        message: messageBody
      }))
      ws.send(
        JSON.stringify({
          message: messageBody,
        })
      );
      setMessageBody("");
    }
  };

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300)
    {
        !isAutoScroll && setIsAutoScroll(true)
    } else {
        isAutoScroll && setIsAutoScroll(false)
    }
}
useEffect( () => {

  if(isSuccess) {
        
   localStorage.setItem('pk', data?.data[0]?.area?.id)
              
   localStorage.setItem('levelid', data.data[0]?.queue.level.id);
   
   localStorage.setItem('userId', data?.data[0]?.user?.id)
  }
}, [isSuccess])



useEffect(() => {


  ws.onopen = () => {
    console.log("Connection opened");
    setConnectionOpen(true);
  };

  ws.onmessage = (event) => {
    
  };


}, [ws.onmessage, ws.onopen, ws.onclose,prevMessage]);

useEffect( () => {
  if(roomSucces) {
    localStorage.setItem('roomToken', roomData.data.access_token)
  }
},[roomSucces]);

useEffect(() => {
  if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'});
      //@ts-ignore
      setMessages(prevMessage?.data.messages);
  }
}, [prevSucces])

  return (
    <div
      style={{ height: `${isMobileScreen && isActive ? "100vh" : "auto"}` }}
      className={styles.square}
    >
      <NavBar />
      {isActive ? (
        <MainModal
          queueWorksers={queueData?.data.queue_workers}
          functionToggle={setIsActive}
          toggle={isActive}
        />
      ) : (
        ""
      )}
      {isMobileScreen && isActive ? (
        <MainModal
          queueWorksers={queueData?.data.queue_workers}
          functionToggle={setIsActive}
          toggle={isActive}
        />
      ) : (
        <>
          {
            data?.data[0].area !== null ? (
              data?.data.map((item) => (
                <AreaUser areaId={item?.area?.id} />
              ))
            ) : (
              <h1 className="has-text-centered py-6">Сейчас все площадки заняты, дождитесь очереди</h1>
            )
          }
          <div className={styles.person_labels}>
            {[
              "Строитель",
              "Прораб",
              "Бригадир",
              "Шеф",
              "Бригадир",
              "Прораб",
              "Строитель",
            ].map((item, key) => (
              <span key={key}>{item}</span>
            ))}
          </div>
          <div className={styles.line}></div>
          <div className={styles.chat_wrapper}>
            <div>
              <div className={styles.chat_title}>Чат</div>
              <div className={styles.chat}>
                <div ref={messagesAnchorRef} onScroll={scrollHandler} className={styles.user_wrapper}>
                  {prevMessage?.data.messages?.map((item) => (
                    <div key={item.id} className={styles.user}>
                      <span style={{color: 'green'}}>{item?.user?.username}</span>
                      <span>{item?.content}</span>
                    </div>
                  ))}
                </div>
                <InputBox  value={messageBody} setValue={setMessageBody} sendMessage={sendMessage} refetch={refetch}/>
              </div>
            </div>
            <div>
              <div
                onClick={() => setIsActive(true)}
                className={styles.chat_title}
              >
                Очередь
              </div>
              <div className={styles.turn}>
                <div className={styles.turn_user}>
                  {queueData?.data.queue_workers.map((item) => (
                    <span>{item.user.username}</span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className={styles.chat_title}>Курс криптовалюты</div>
              <div className={styles.cryptocurrency}>
                <div>
                  <div style={{ textAlign: "end" }}>01.01.2022</div>
                  <div className={styles.crypto_wrapp}>
                    <div>
                      <span>Валюта</span>
                      <div className={styles.crypto_list}>
                        <span>Bitcoin BTC</span>
                        <span>Ethereum ETH</span>
                        <span>Tether USDT</span>
                        <span>Tronix TRX</span>
                      </div>
                    </div>
                    <div>
                      <span>Стоимость</span>
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
        </>
      )}
    </div>
  );
};

export default memo(Area);
