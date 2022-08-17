import { FC } from "react";
import { useMediaQuery } from 'react-responsive'
import column from "./../../../../assets/images/row2.png";
import styles from "./index.module.scss";
type IProps = {
  id: number
  level: string
  sc_level: string
  active: boolean
};

const Card: FC<IProps> = ({id, active, level,sc_level}) => {
  return (
    <div className={styles.card_wrapp} key={id.toString()}>
      {active ? <img src={sc_level} /> : <img src={level}  />}
    </div>
  );
};

export default Card;
