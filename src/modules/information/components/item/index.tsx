import styles from "./index.module.scss";
import gold from "assets/images/gold.svg";
import { FC } from "react";


type IProps = {
  id: string
  question: string
  answer: string
}

const Item:FC<IProps> = ({id, question, answer}) => {
  return (
    <div className={styles.item_wrapp}>
      <img className={styles.item_logo} src={gold} alt="gold" />
      <div>
        <h2>{question}</h2>
        <p>
          {answer}
        </p>
      </div>
    </div>
  );
};

export default Item;
