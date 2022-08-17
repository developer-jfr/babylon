import styles from "./index.module.scss";
import prizesItem from "assets/images/product.svg";
import { FC } from "react";


type IProps = {
  name: string
  description: string
  image: string
  prize_name: string
}

const PrizesItem:FC<IProps> = ({name,description,image,prize_name}) => {
  return (
      <div className={styles.item_wrapp}>
        <div className={styles.prize_content}>
            <img src={image} alt="image" />
          <p
            className="has-text-centered"
            style={{
              paddingInline: "50px",
              color: "#8D8D8D",
            }}
          >
            {description}
          </p>
          <div className="is-flex is-justify-content-end pt-6" style={{columnGap: '40px', marginTop: '50px'}}>
          <input type="radio" name="answer" />
            <button className={styles.prize_btn}>Получить</button>
          </div>
        </div>
        <div
          className="is-flex is-flex-direction-column"
          style={{ gap: "30px"}}
        >
          <h5 style={{ fontSize: "18px" }}>{prize_name}</h5>
          <div className={styles.content_wrapp}>
            <span>{name}</span>
            <p>Квалифицированных участников</p>
          </div>
        </div>
      </div>
  );
};

export default PrizesItem;
