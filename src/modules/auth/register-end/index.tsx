import styles from "./index.module.scss";

import logo from "assets/images/logo.svg";
import auth_telega from "assets/images/auth-telega.svg";
import auth_email from "assets/images/auth-email.svg";
import { Field, Form, Formik } from "formik";
import { INotification } from "models/IAuth";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { registerEndLogin, updateUserNotification } from "redux/auth/action";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { enterLevel } from "redux/tower/action";

const usersSearchFormValidate = (values: any) => {
  const errors = {}
  return errors
}

const RegisterEnd = () => {
  const dispatch = useAppDispatch();
  const accesToken = localStorage.getItem('access_token');
  const { isRegisterEnd } = useAppSelector((state) => state.authReducer);
  const { isEnterLevel } = useAppSelector((state) => state.towerReducer);
  let navigate = useNavigate();

  useEffect(() => {
    if (isRegisterEnd && isEnterLevel) {
      return navigate("/auth/sign-in");
    }
  }, [isRegisterEnd, isEnterLevel]);

  const submit = async (
    values: INotification,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    await dispatch(updateUserNotification(values));
    let login = {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password')
    }
    await dispatch(registerEndLogin(login))
    setSubmitting(false);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <img className={styles.form_img} src={logo} alt="Logo" />
          <h1 className={styles.text}>Завершение регистрации</h1>
          <Formik
          initialValues={{
            token: accesToken,
            tg_notifications: false,
            email_notifications: false
          }as INotification}
          validate={usersSearchFormValidate}
          onSubmit={submit}
          >
            {({isSubmitting}) => (
              <Form className={styles.content_form}>
              <div>Способ получения уведомлений</div>
              <div>
                <div className={styles.content_check_wrapp}>
                  <label
                    className="checkbox is-flex is-align-items-center"
                    style={{ gap: "5px" }}
                  >
                    <Field
                     name='tg_notifications'
                      type="checkbox"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <img src={auth_telega} alt="auth_telega" /> Telegram
                  </label>
                  <label
                    className="checkbox is-flex is-align-items-center"
                    style={{ gap: "5px" }}
                  >
                    <Field
                    name='email_notifications'
                      type="checkbox"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <img src={auth_email} alt="auth_email" /> e-mail
                  </label>
                </div>
              </div>
              <div className={styles.form_btn_group}>
                <button type="submit" disabled={isSubmitting} className={styles.submit_btn}>Сохранить</button>
                <div onClick={() => dispatch(enterLevel(localStorage.getItem('access_token')))}  className={styles.form_btn}>Встать в очередь</div>
              </div>
            </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterEnd;
