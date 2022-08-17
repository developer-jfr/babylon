import styles from "./index.module.scss";
import select from "assets/images/select.svg";
import emoji from "assets/images/emoji-laugh.svg";
import camera from "assets/images/camera.svg";
import send from "assets/images/send.svg";
import { Dispatch, FC, SetStateAction } from "react";

type IProps = {
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  sendMessage: () => void;
  refetch: () => void;
};

const InputBox: FC<IProps> = ({ value, setValue, sendMessage, refetch }) => {
  return (
    <div className={styles.input_wrapper}>
      <img className={styles.input_select_img} src={select} alt="select" />
      <input
        value={value}
        onChange={(e) => {
          console.log(e.target.value);
          setValue(e.target.value);
        }}
        className={styles.input}
        type="text"
      />
      <div className={styles.input_icons}>
        <img src={emoji} alt="emoji" style={{ width: "20px" }} />
        <img src={camera} alt="emoji" style={{ width: "20px" }} />
        <img
          src={send}
          onClick={() => {
            sendMessage();
            refetch();
          }}
          alt="emoji"
          style={{ width: "45pxpx" }}
        />
      </div>
    </div>
  );
};

export default InputBox;
