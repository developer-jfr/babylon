import { Dispatch, FC, SetStateAction } from "react";

import styles from "./index.module.scss";
import second_perc from "assets/images/second_perc.svg";
import hix from "assets/images/hix.svg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "hooks/redux";
import { authSlice } from "redux/auth/reducer";

type IProps = {
  functionToggle: Dispatch<SetStateAction<boolean>>;
  toggle: boolean;
};

const Exit: FC<IProps> = ({ functionToggle, toggle }) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const exit = () => {
    dispatch(authSlice.actions.setIsLogined(false))
    return navigate('/auth/sign-in')
  }
  return (
    <div style={{zIndex: '999'}} className={`modal ${toggle && "is-active"}`}>
      <div
        className="modal-background"
        style={{ backdropFilter: "blur(3px)", background: "none" }}
      ></div>
      <div className={`modal-card ${styles.container}`}>
        <div className={styles.close_wrapp}>
          <img className="is-clickable" onClick={() => functionToggle(false)} src={hix} alt="hix" />
        </div>
        <section className="modal-card-body" style={{ background: "none" }}>
          <div  style={{color: '#8D8D8D', lineHeight: '25px'}}  className="is-flex is-flex-direction-column is-align-items-center  is-size-4">
            <h5 className="has-text-centered is-size-5 pt-6 mt-2">Вы действительно хотите</h5>
            <p className="has-text-centered">ВЫЙТИ ИЗ ИГРЫ?</p>
            <div className="is-flex pt-5" style={{gap :'90px'}}>
              <p onClick={() => exit()} className={styles.item}>
              Да
              </p>
              <p onClick={() => functionToggle(false)} className={`${styles.item} ${styles.shake_btn}`}>
              Нет
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Exit;
