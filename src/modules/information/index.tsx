import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IMainFaq, IMyFaq } from "models/ITower";
import { useEffect, useState } from "react";
import { useGetMainFaq, useGetMyFaq } from "services/tower/tower-queries";
import NavBar from "../../components/nav-bar";
import Item from "./components/item";
import styles from "./index.module.scss";

const Information = () => {
  const [ mainFaq,setMainFaq] = useState<IMainFaq>();
  const [ myFaq,setMyFaq] = useState<Array<IMyFaq>>();
  const {data: faqData, isSuccess:faqIsSucces} = useGetMyFaq();
  const {data, isSuccess} = useQuery(['main faq'], () => axios.get('https://babylon-api.aitrix.online/info/main/', {headers : {
    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
  }}));
 

  useEffect(() => {
    setMainFaq(data?.data);
  }, [isSuccess])


  useEffect(() => {
    setMyFaq(faqData?.data);
  }, [faqIsSucces])


  return (
    <div className={styles.info_container}>
      <NavBar />
      <div className={styles.info_wrapp}>
        <div className={styles.info_title}>Информация</div>
        <div>
          <div className={styles.info_grid}>
            <p>
             {mainFaq?.part1}
            </p>
            <p>
            {mainFaq?.part2}
            </p>
            <p>
            {mainFaq?.part3}
            </p>
          </div>
          <div style={{paddingTop: '50px'}}>
            
            <div className={styles.info_scroll_title} >FAQ</div>
            
            <div className={styles.info_scroll}>
              <div className={styles.info_scroll_wrapp}>
                {myFaq?.map(item => <Item id={item.id} answer={item.answer} question={item.question} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
