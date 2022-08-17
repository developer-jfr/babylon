import ModalForm from "../modal-input";
import styles from "./index.module.scss";
import hix from "assets/images/hix.svg";
import ModalInput from "../modal-input";
import { Dispatch, FC, SetStateAction } from "react";
import { Field, Form, Formik } from "formik";
import { IBankCreate, ICryptoWAllet } from "models/IPayments";
import { useAppDispatch } from "hooks/redux";
import { createBankCard, createCryptoCard } from "redux/payments/action";

type IProps = {
  setIsActive:  Dispatch<SetStateAction<boolean>>;
}

const searchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

const Modal:FC<IProps> = ({setIsActive}) => {
  const dispatch = useAppDispatch();
  return (
    <div className={`modal is-active ${styles.modal}`}>
      <div
        className={`modal-background ${styles.modal_back}`}
      ></div>
      <div className={`modal-card ${styles.modal_card}`} >
        <div onClick={() => setIsActive(false)} className={styles.close_wrapp}>
          <img src={hix} alt="hix" />
        </div>
        <section className={`modal-card-body ${styles.modal_body}`}>
          <div className={styles.modal_body_wrapp}>
            {/*@ts-ignore */}

            {localStorage.getItem('currentLevel') > 6 ? (
 <Formik
 initialValues={{name: '', address: '', network: ''} as ICryptoWAllet}
 validate={searchFormValidate}
 onSubmit={(values: ICryptoWAllet, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
   console.log(values)
   dispatch(createCryptoCard(values))
   setSubmitting(false)
}}
 >
   {({isSubmitting}) => (
       <div>
     
       <div className="is-flex is-flex-direction-column" style={{gap:'10px'}}>
       <div className={styles.form}>
                        <Field
                          name="address"
                          type="text"
                          className={styles.form_input}
                          autoComplete="off"
                          placeholder=" "
                        />
                        <label className={styles.form_label}>Адрес криптокошелька</label>
                      </div>
                      <div className={styles.form}>
                        <Field
                          name="name"
                          type="text"
                          className={styles.form_input}
                          autoComplete="off"
                          placeholder=" "
                        />
                        <label className={styles.form_label}>Криптовалюта</label>
                      </div>
                      <div className={styles.form}>
                        <Field
                          name="network"
                          type="text"
                          className={styles.form_input}
                          autoComplete="off"
                          placeholder=" "
                        />
                        <label className={styles.form_label}>Сеть</label>
                      </div>
       </div>
      <div className="is-flex is-justify-content-flex-end pb-5">
      <button disabled={isSubmitting} className={styles.form_data_btn}>Сохранить</button>
      </div>
     </div>
   )}
 </Formik>
            ) : (
              <Formik
              initialValues={{bank: '', number: ''} as IBankCreate}
              validate={searchFormValidate}
              onSubmit={(values: IBankCreate, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
                console.log(values)
                dispatch(createBankCard(values))
                setSubmitting(false)
         }}
              >
                {({isSubmitting}) => (
                    <Form>
                  
                    <div className="is-flex is-flex-direction-column" style={{gap:'10px'}}>
                    <div className={styles.form}>
                                     <Field
                                       name="bank"
                                       type="text"
                                       className={styles.form_input}
                                       autoComplete="off"
                                       placeholder=" "
                                     />
                                     <label className={styles.form_label}>Номер карты</label>
                                   </div>
                                   <div className={styles.form}>
                                     <Field
                                       name="number"
                                       type="text"
                                       className={styles.form_input}
                                       autoComplete="off"
                                       placeholder=" "
                                     />
                                     <label className={styles.form_label}>Номер карты</label>
                                   </div>
                    </div>
                   <div className="is-flex is-justify-content-flex-end pb-5">
                   <button disabled={isSubmitting} className={styles.form_data_btn}>Сохранить</button>
                   </div>
                  </Form>
                )}
              </Formik>
            )}
     
          <div className={styles.modal_line}>
            
          </div>
         
          </div>
        </section>
      </div>
    </div>
  );
};

export default Modal;

/*

   <div className={styles.personal_modal_wrapp}>
       <div className={styles.personal_modal}>
        <div className={styles.personal_modal_grid}>
            <div className={styles.modal_form_wrapp}>
            
            </div>
            <div className={styles.modal_grid_line}></div>
            <div className={styles.modal_form_wrapp}>
            
            </div>
        </div>
        <a className={styles.modal_grid_text}>Сохранить</a>
        </div>
        </div>

*/
