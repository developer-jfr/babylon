import styles from "./index.module.scss";
import logo from './../../../assets/images/logo.svg';
import { useEffect, useState } from "react";
import ChangePassword from "../../personal-area/components/change-password";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { login } from "redux/auth/action";
import { ILogin } from "models/IAuth";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../error-modal/error-modal";
import ChangePasswordPA from "../change-password";

const validate = Yup.object({
  username: Yup.string().required("Логин не может быть пустым"),
  password: Yup.string()
    .required("Пароль не может быть пустым")
});


const SignIn = () => {
  const dispatch = useAppDispatch();
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const { isLogined,error } = useAppSelector((state) => state.authReducer);
  let navigate = useNavigate();

  useEffect(() => {
    if (isLogined) {
      return navigate("/", {replace:true});
    }
  }, [isLogined]);
  const submit = (
    values: ILogin,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);
    dispatch(login(values));
    setSubmitting(false);
  };
  return (
    <div className={styles.wrapper}>
            {error !== '' && <ErrorModal error={error} /> }
      <div className={styles.container}>
        <div className={styles.content}>
          <img className={styles.form_img} src={logo} alt="Logo" />
          <h1 className={styles.text}>
          Вход
          </h1>
          <Formik
          initialValues={{
            username: "",
            password: "",
          }as ILogin}
          validationSchema={validate}
          onSubmit={submit}
          >
             {({isSubmitting, errors}) => (
              <Form className={styles.form_group}>
              <div className={styles.form}>
                <Field
                 name="username"
                  type="text"
                  className={`${styles.form_input} ${errors.username && 'form_error'}`}
                  autoComplete="off"
                  placeholder=" "
                 
                />
                <label className={`${styles.form_label} ${errors.username && 'lable_error'}`}>Адрес электронной почты</label>
                <div className="error_text">
                  {errors.username}
                </div>
              </div>
              <div className={styles.form}>
                <Field
                name="password"
                  type="password"
                  className={`${styles.form_input} ${errors.password && 'form_error'}`}
                  autoComplete="off"
                  placeholder=""
                  
                />
                <label className={`${styles.form_label} ${errors.password && 'lable_error'}`}>Пароль</label>
                <div className="error_text">
                  {errors.password}
                </div>
              </div>
            <div className={styles.form_btn_group}>
            <div onClick={() => setIsChangePassword(true)} style={{fontSize: '14px', cursor: 'pointer'}}>Забыли пароль?</div>
            <button  type='submit' disabled={isSubmitting}  className={styles.form_btn}>Вход</button>
            <div onClick={() => setIsChangePassword(true)}  className={styles.form_btn}>Смена пароля</div>
            <div className="has-text-right" onClick={() => navigate('/auth/sign-up')}>
                Регистрация
            </div>
            </div>
              </Form>
             )}
          </Formik>
        </div>
        
      </div>
      {isChangePassword && <ChangePasswordPA setIsActive={setIsChangePassword} />}
    </div>
  );
};

export default SignIn;
