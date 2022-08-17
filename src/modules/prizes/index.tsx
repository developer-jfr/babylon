import NavBar from "../../components/nav-bar";
import PrizesItem from "./components/item";
import styles from "./index.module.scss";
import prize_img from "../../assets/images/prizes_img.svg";
import CompetitionSC from "./components/competition";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IPrizes } from "models/IPrizes";

const Prizes = () => {
  const { data } = useQuery(["prizes main"], () =>
    axios.get<Array<IPrizes>>("https://babylon-api.aitrix.online/prizes/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
  );
  return (
    <div className={styles.prizes_container}>
      <NavBar />
      <div className="pb-6">
        <div className="pt-6">
          <div className={styles.content_img}>
            <img src={prize_img} alt="prize_img" />
          </div>
          <div className="pt-6">
            <div className="is-flex is-flex-direction-column">
            <h1 className="has-text-centered py-6">
          Данный раздел находится в разработке
        </h1> 
             
            </div>
          </div>
        </div>
        <CompetitionSC />
      </div>
    </div>
  );
};

export default Prizes;