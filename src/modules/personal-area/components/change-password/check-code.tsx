import { Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { checkCode } from "redux/auth/action";
import styles from "./index.module.scss";
import * as Yup from "yup";
import ErrorModal from "../../../auth/error-modal/error-modal";

const validate = Yup.object({
  code: Yup.string().required("Код не может быть пустым")
});

const CheckCode = () => {
  const dispatch = useAppDispatch();
  const { changePassword , error} = useAppSelector(state => state.authReducer)
  return (
    <>
      {error !== '' && <ErrorModal error={error} /> }
    <Formik
      initialValues={{ email: changePassword.email ,code: "" } as { email: string; code: string}}
      validationSchema={validate}
      onSubmit={(values:{ email: string; code: string}, { setSubmitting }) => {
        dispatch(checkCode(values));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting,errors }) => (
        <Form>
          <div className="pt-5">
            <div className={styles.form}>
              <Field
                name="code"
                type="text"
                className={`${styles.form_input} ${errors.code && 'form_error'}`}
                autoComplete="off"
                placeholder=" "
              />
              <label className={`${styles.form_label} ${errors.code && 'lable_error'}`}>Код</label>
              <div className="error_text">
                {errors.code}
              </div>
            </div>
          </div>
          <div className="is-flex is-justify-content-end">
            <button
              disabled={isSubmitting}
              type="submit"
              className={styles.form_send}
            >
              Проверить
            </button>
          </div>
        </Form>
      )}
    </Formik>
    </>
  );
};

export default CheckCode;
