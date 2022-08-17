import styles from "./index.module.scss";
import competition from "../../../../assets/images/competition.svg";
import airpods from "../../../../assets/images/product.svg";
import clockpapper from '../../../../assets/images/clockpaper.svg';
import winners from '../../../../assets/images/winners.svg';
import User from "../user";

const CompetitionSC = () => {
  return (
    <div>
      <div>
        <div className={styles.prize_img}>
        <img src={competition} alt="competition" />
      
        </div>
        <h1 className="has-text-centered py-6">
          Данный раздел находится в разработке
        </h1> 
      </div>
      {/* ----------------------------- Winners Section ------------------------------- */}
      <div>
        <div>
          <div className={styles.winners_img}>
            <img src={winners} alt="winners" />
          </div>
          <div className={styles.winners_wrapp}>
          <h1 className="has-text-centered py-6">
          Данный раздел находится в разработке
        </h1> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionSC;
