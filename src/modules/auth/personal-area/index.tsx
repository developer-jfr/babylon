import styles from "./index.module.scss";
import logo from "assets/images/logo.svg";
import { useMediaQuery } from "react-responsive";
import { Field, Form, Formik } from "formik";
import { IPersonalArea } from "models/IAuth";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { setMyData } from "redux/auth/action";
import MaskedInput from "react-text-mask";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../error-modal/error-modal";

const validate = Yup.object({
  first_name: Yup.string().required("Имя не может быть пустым"),
  last_name: Yup.string().required("Фамилия не может быть пустым"),
  phone: Yup.string().min(15, 'Номер телефона неверный').required("Номер телефона не может быть пустым"),
  comment: Yup.string().required("Комментарий не может быть пустым"),
});

const phoneNumberMask = [
  "+",
  "7",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/
];

const AuthPersonalArea = () => {
  const [ connectTg, setConnectTg ] = useState<boolean>(false);
  const [ hideNumber, setHideNumber ] = useState<boolean>(false);
  const accesToken = localStorage.getItem("access_token");
  const dispatch = useAppDispatch();
  const { isDataSet,error } = useAppSelector((state) => state.authReducer);
  let token = localStorage.getItem('access_token');
  const isMobileScreen = useMediaQuery({ query: "(max-width:800px)" });
  let navigate = useNavigate();

  useEffect(() => {
    if (isDataSet && connectTg) {
      return navigate("/auth/register-end");
    }
  }, [isDataSet, connectTg]);


  const submit = async (
    values: IPersonalArea,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);
    dispatch(setMyData(values));
    setSubmitting(false);
  };
  return (
    <div className={styles.wrapper}>
            {error !== '' && <ErrorModal error={error} /> }
      <div className={styles.container}>
        <div className={styles.content}>
          <img className={styles.form_img} src={logo} alt="Logo" />
          <h1 className={styles.text}>Личный кабинет</h1>
          <Formik
            initialValues={
              {
                token: accesToken,
                first_name: "",
                last_name: "",
                phone: "",
                comment: "",
              } as IPersonalArea
            }
            validationSchema={validate}
            onSubmit={submit}
          >
            {({ isSubmitting, handleBlur, handleChange,errors }) => (
              <Form className={styles.form_group}>
                <div className={styles.form}>
                  <Field
                    name="first_name"
                    type="text"
                    className={`${styles.form_input} ${errors.first_name && 'form_error'}`}
                    autoComplete="off"
                    placeholder=" "
                  />
                  <label className={`${styles.form_label} ${errors.first_name && 'lable_error'}`}>Имя</label>
                  <div className="error_text">
                     {errors.first_name}
                  </div>
                </div>
                <div className={styles.form}>
                  <Field
                    name="last_name"
                    type="text"
                    className={`${styles.form_input} ${errors.last_name && 'form_error'}`}
                    autoComplete="off"
                    placeholder=" "
                  />
                  <label className={`${styles.form_label} ${errors.last_name && 'lable_error'}`}>Фамилия</label>
                  <div className="error_text">
                    {errors.last_name}
                  </div>
                </div>
                <div className={styles.form_phone}>
                  <div className={styles.form}>
                    <Field
                      name="phone"
                      render={({ field }: { field: any }) => (
                        <MaskedInput
                          {...field}
                          mask={phoneNumberMask}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type={hideNumber ? 'password' : 'text'}
                          className={`${styles.form_input} ${errors.phone && 'form_error'}`}
                          autoComplete="off"
                          placeholder=" "
                        />
                      )}
                    />
                    <label className={`${styles.form_label} ${errors.phone && 'lable_error'}`}>Телефон</label>
                    <div className="error_text">
                    {errors.phone}
                  </div>
                  </div>
                  <a onClick={() => setHideNumber(el => !el)} style={{ textDecoration: "underline", color: "#666666" }}>
                    {hideNumber ? 'Показать' : 'Скрыть'}
                  </a>
                </div>
                <div className={styles.form}>
                  <Field
                    as="textarea"
                    name="comment"
                    type="text"
                    className={`${styles.form_input} ${errors.comment && 'form_error'}`}
                    autoComplete="off"
                    placeholder=" "
                    style={{ height: `${isMobileScreen ? 43 : 64}px` }}
                  />
                  <label
                    className={`${styles.form_label} ${errors.comment && 'lable_error'}`}
                    style={{ top: `-${isMobileScreen ? 12 : 12}px` }}
                  >
                    Комментарий
                  </label>
                  <div className="error_text">
                    {errors.comment}
                  </div>
                </div>
                <div className={styles.form_btn_group}>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className={styles.form_save_btn}
                  >
                    Сохранить
                  </button>
                  <a onClick={() => setConnectTg(true)} target='_blank' href={`https://t.me/notifymeebot?start=${token}`}
                    className={styles.form_btn}
                  >
                    Подключиться к Telegram bot
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AuthPersonalArea;
