import styles from "./index.module.scss";
import logo from "./../../../assets/images/logo.svg";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { register } from "redux/auth/action";
import { IRegister } from "models/IAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import ErrorModal from "../error-modal/error-modal";



const validate = Yup.object({
  email: Yup.string().email("Адрес электроной почты неправильно").required("Адрес электронной почты не может быть пустым"),
  username: Yup.string().required("Логин не может быть пустым"),
  password1: Yup.string()
    .required("Пароль не может быть пустым"),
  password2: Yup.string()
    .oneOf([Yup.ref("password1"), null], "Пароль должен соответсвовать")
    .required("Пароль должен соответсвовать"),
    recaptcha: Yup.string().required(),
    check: Yup.string().required()
});

const SignUp = () => {
  const dispatch = useAppDispatch();
  const {isRegister, error} = useAppSelector((state) => state.authReducer);
  let navigate = useNavigate();

  useEffect(() => {
    if (isRegister) {
      return navigate("/auth/personal-area");
    }
  }, [isRegister]);
  const submit = async (
    values: IRegister,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);
    let registerData = {
      email: values.email,
      username: values.username,
      password1: values.password1,
      password2: values.password2
    }
    localStorage.setItem('username', values.username);
    localStorage.setItem('password', values.password2)
    dispatch(register(registerData));
    setSubmitting(false);
  };

  return (
    <div className={styles.wrapper}>
      {error !== '' && <ErrorModal error={error} /> }
      <div className={styles.container}>
        <div className={styles.content}>
          <img className={styles.form_img} src={logo} alt="Logo" />
          <h1 className={styles.text}>Регистрация</h1>
          <Formik
            initialValues={
              {
                email: "",
                username: "",
                password1: "",
                password2: "",
                recaptcha: '',
                check: false
              } as IRegister
            }
            validationSchema={validate}
            onSubmit={submit}
           >
            {({ isSubmitting, errors,setFieldValue,setSubmitting }) => (
              <Form className={styles.form_group}>
                <div className={styles.form}>
                  <Field
                    name="email"
                    type="email"
                    className={`${styles.form_input} ${errors.email && 'form_error'}`}
                    autoComplete="off"
                  />
                  <label className={`${styles.form_label} ${errors.email && 'lable_error'}`}>
                    Адрес электронной почты
                  </label>
                  <div className='error_text'>
                  {errors.email}
                  </div>
                </div>
                <div>
                </div>
                <div className={styles.form}>
                  <Field
                    name="username"
                    type="text"
                    className={`${styles.form_input} ${errors.username && 'form_error'}`}
                    autoComplete="off"
                  />
                  <label className={`${styles.form_label} ${errors.username && 'lable_error'}`}>Логин</label>
                  <div className='error_text'>
                 {errors.username}
                 
                  </div>
                </div>
                <div className={styles.form}>
                  <Field
                  name="password1"
                    type="password"
                    className={`${styles.form_input} ${errors.password1 && 'form_error'}`}
                    autoComplete="off"
                    placeholder=" "
                  />
                  <label className={`${styles.form_label} ${errors.password1 && 'lable_error'}`}>Пароль</label>
                  <div className='error_text'>
                  {errors?.password1} 
                  </div>
                </div>
                <div className={styles.form}>
                  <Field
                     name="password2"
                    type="password"
                    className={`${styles.form_input} ${errors.password2 && 'form_error'}`}
                    autoComplete="off"
                  />
                  <label className={`${styles.form_label} ${errors.password2 && 'lable_error'}`}>Повторите пароль</label>
                  <div className='error_text'>
                  {errors?.password2} 
                  </div>
                </div>
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={(value) => {
                    console.log("$$$$", isSubmitting, value);
                    setFieldValue("recaptcha", value);
                    setSubmitting(false);
                  }}
                  
                />
                <div className="has-text-right" onClick={() => navigate('/auth/sign-in/')}>
  Уже есть аккаунт
                </div>
                <div style={{ alignItems: "center" }}>
                  <label
                    className="checkbox has-text-right is-flex"
                    style={{ gap: '25px'}}
                  >
                    <Field name='check' className={styles.form_checkbox} type="checkbox" />
                    Подписание правил участия в игре
                  </label>
                </div>
                <div className="pt-5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.form_btn}
                  >
                    Зарегистрироваться
                  </button>
                  
                </div>
                
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
