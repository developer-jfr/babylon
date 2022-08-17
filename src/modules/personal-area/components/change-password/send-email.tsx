import { Field, Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { sendEmailCode } from 'redux/auth/action';
import styles from './index.module.scss';
import * as Yup from "yup";
import ErrorModal from '../../../auth/error-modal/error-modal';

const validate = Yup.object({
  email: Yup.string().email("Адрес электроной почты неправильно").required("Адрес электронной почты не может быть пустым")
});


const SendEmail = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.authReducer);
  return (
    <>
          {error !== '' && <ErrorModal error={error} /> }
    <Formik
    initialValues={{ email: "" }}
    validationSchema={validate}
    onSubmit={(values, { setSubmitting }) => {
      
      dispatch(sendEmailCode(values.email));
      setSubmitting(false);
    }}
  >
    {({ isSubmitting, errors }) => (
      <Form>
        <div className="pt-5">
          <div className={styles.form}>
            <Field
              name="email"
              type="text"
              className={`${styles.form_input} ${errors.email && 'form_error'}`}
              autoComplete="off"
              placeholder=" "
            />
            <label className={`${styles.form_label} ${errors.email && 'lable_error'}`}>
              Введите адрес электронной почты
            </label>
            <div className='error_text'>
              {errors.email}
            </div>
          </div>
        </div>
        <div className="is-flex is-justify-content-end">
          <button
            disabled={isSubmitting}
            type="submit"
            className={styles.form_send}
          >
            Отправить
          </button>
        </div>
      </Form>
    )}
  </Formik>
  </>
  )
}

export default SendEmail