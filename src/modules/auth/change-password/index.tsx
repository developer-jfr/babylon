import styles from "./index.module.scss";
import hix from "assets/images/hix.svg";
import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Field, Form, Formik } from "formik";
import { IChangePassword, IRessetPassword } from "models/IAuth";
import SendEmail from "./send-email";
import CheckCode from "./check-code";
import { changePasswordThunk, sendEmailCode } from "redux/auth/action";
import * as Yup from "yup";
import ErrorModal from "../../auth/error-modal/error-modal";
import { authSlice } from "redux/auth/reducer";

const validate = Yup.object({
  password1: Yup.string()
  .required("Пароль не может быть пустым"),
password2: Yup.string()
  .oneOf([Yup.ref("password1"), null], "Пароль должен соответсвовать")
  .required("Пароль должен соответсвовать"),
});
type IProps = {
  setIsActive: Dispatch<SetStateAction<boolean>>
};

const ChangePasswordPA: FC<IProps> = ({ setIsActive }) => {
  const dispatch = useAppDispatch();
  const { isCodeChecked, isEmailSend, changePassword, isChangePassword, error } = useAppSelector(
    (state) => state.authReducer
  );


  const submit = (
    values: IChangePassword,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    dispatch(changePasswordThunk(values));

    setSubmitting(false);
  };

  return (
    <div className="modal is-active">
      {error !== '' && <ErrorModal error={error} /> }
      <div
        className="modal-background"
        style={{ backdropFilter: "blur(5px)", background: "none" }}
      ></div>
      <div
        className="modal-card"
        style={{ maxWidth: "500px", borderRadius: "10px" }}
      >
        <div className="is-flex is-justify-content-end has-background-white pt-4 pr-4">
          <img
            onClick={() => setIsActive(false)}
            className="is-clickable"
            src={hix}
            alt="hix"
            style={{ height: "60%" }}
          />
        </div>
        
        <div className={`modal-card-body ${styles.form_body}`}>
        {!isEmailSend && (
            <>
              <SendEmail />
            </>
          )}
         
          {isCodeChecked && (
            <>
              <h5 className="has-text-centered">
                На вашу почту был выслан проверочный код введите его в поле ниже
              </h5>
              <CheckCode />
            </>
          )}

          {isChangePassword && (
            <Formik
              initialValues={
                {
                  email: changePassword.email,
                  code: changePassword.code,
                  password1: "",
                  password2: "",
                } as IChangePassword
              }
              validationSchema={validate}
              onSubmit={submit}
            >
              {({ isSubmitting, errors }) => (
                <Form className="pt-6">
                  <div>
                    <div className={styles.form}>
                      <Field
                        name="password1"
                        type="text"
                        className={`${styles.form_input} ${errors.password1 && 'form_error'}`}
                        autoComplete="off"
                        placeholder=" "
                      />
                      <label className={`${styles.form_label} ${errors.password1 && 'lable_error'}`}>
                        Введите новый пароль
                      </label>
                      <div className="error_text">
                        {errors.password1}
                      </div>
                    </div>
                  </div>
                  <div className="pt-5">
                    <div className={styles.form}>
                      <Field
                        name="password2"
                        type="text"
                        className={`${styles.form_input} ${errors.password2 && 'form_error'}`}
                        autoComplete="off"
                        placeholder=" "
                      />
                      <label className={`${styles.form_label} ${errors.password2 && 'lable_error'}`}>
                        Введите новый пароль еще раз
                      </label>
                      <div className="error_text">
                        {errors.password2}
                      </div>
                    </div>
                  </div>
                  <div className="is-flex is-justify-content-end pt-5">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className={styles.form_send}
                    >
                      Сохранить
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPA;
