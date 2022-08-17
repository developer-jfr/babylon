import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import NavBar from "components/nav-bar";
import styles from "./index.module.scss";
import second_perc from "assets/images/second_perc.svg";

//Social Icons
import instagram from "assets/images/instagram.svg";
import facebook from "assets/images/facebook.svg";
import telegram from "assets/images/telegram.svg";
import vk from "assets/images/vk.svg";
import Modal from "./components/modal";
import { IMyMaterials, IMyWorkers, IPAUpdateMe } from "models/ITower";
import {
  useGetMyMaterials,
  useGetMyWorkers,
} from "services/tower/tower-queries";
import { useGetUserDetails } from "services/user/user-queries";
import { Field, Form, Formik } from "formik";
import { useAppDispatch } from "hooks/redux";
import { deleteMe, updateMe } from "redux/auth/action";
import {
  useGetBankPayment,
  useGetCryptoWallets,
} from "services/payments/payments-queries";
import {
  createBankCard,
  createCryptoCard,
  deleteBankCard,
  deleteCryptoCard,
  updateBankCard,
  updateCryptoCard,
} from "redux/payments/action";
import {
  IBankCreate,
  IBankUpdate,
  ICryptoWAllet,
  ICryptoWAlletUpdate,
} from "models/IPayments";
import ChangePasswordPA from "modules/personal-area/components/change-password";
import { useNavigate } from "react-router-dom";
import { authSlice } from "redux/auth/reducer";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

const PersonalArea = () => {
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [material, setMaterial] = useState<Array<IMyMaterials>>();
  const isMobileScreen = useMediaQuery({ query: "(max-width:800px)" });
  const [isActive, setIsActive] = useState<boolean>(false);
  const { data, isSuccess } = useGetMyWorkers();
  const { data: userDeatails, isSuccess: userIsSucces } = useGetUserDetails();
  const { data: bankData, refetch: bankRefetch } = useGetBankPayment();
  const { data: cryptoData } = useGetCryptoWallets();
  const { data: materialsData, isSuccess: materialSucess } =
    useGetMyMaterials();
  const navigate = useNavigate();

  useEffect(() => {
    setMaterial(materialsData?.data);
  }, [materialSucess]);

  console.log(materialsData?.data + "materialsData");

  const submit = async (
    values: IPAUpdateMe,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    dispatch(updateMe(values));
    setSubmitting(false);
  };
  return (
    <div className={styles.personal_container}>
      <NavBar />
      {isActive && <Modal setIsActive={setIsActive} />}
      {isMobileScreen && isActive ? (
        <Modal setIsActive={setIsActive} />
      ) : (
        <div className={styles.personal_wrapper}>
          <div style={{ textAlign: "center" }}>Личный кабинет</div>
          <div className={styles.personal_grid}>
            <div className={styles.personal_level}>
              <span>Уровень ({localStorage.getItem("currentLevel")})</span>
              <div className={styles.level_details}>
                <div>
                  <span className={styles.level_details_text}>Куплено</span>
                  <div className={styles.level_elements}>
                    {material?.length !== 0 ? (
                      material?.map((item) => (
                        <div className={styles.level_element}>
                          <img src={item?.material?.image} />
                          <span>(001) {item?.material?.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="has-text-centered">
                        У вас нет материалов
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className={styles.count_workers}>
                    <img src={second_perc} alt="second_perc" />

                    <span>
                      ({data?.data[0]?.area?.workers_count || 0}) Количество
                      работников
                    </span>
                  </div>
                  <div className={styles.count_workers_details}>
                    <div>
                      <input style={{ marginRight: "10px" }} type="radio" />
                      <label htmlFor="radio">
                        Внимание! Когда Ваш виртуальный рабочий попадет на
                        площадку и становится в ранге «Строитель», только тогда
                        Вы отправите деньги «Шефу». До этого момента ничего
                        переводить не надо
                      </label>
                    </div>
                    <div>
                      <input style={{ marginRight: "10px" }} type="radio" />
                      <label htmlFor="radio">
                        Внимание! Когда Ваш виртуальный рабочий попадет на
                        площадку и становится в ранге «Строитель», только тогда
                        Вы отправите деньги «Шефу». До этого момента ничего
                        переводить не надо
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.personal_line}></div>
            <div className={styles.personal_form}>
              <Formik
                enableReinitialize
                initialValues={
                  {
                    first_name: userDeatails?.data?.first_name,
                    last_name: userDeatails?.data?.last_name,
                    phone: userDeatails?.data?.phone,
                  } as IPAUpdateMe
                }
                validate={usersSearchFormValidate}
                onSubmit={submit}
              >
                {({ isSubmitting, handleChange }) => (
                  <Form>
                    <div className={styles.form}>
                      <Field
                        name="first_name"
                        type="text"
                        className={styles.form_input}
                        autoComplete="off"
                        placeholder=" "
                      />
                      <label className={styles.form_label}>Имя</label>
                    </div>
                    <div className={styles.form}>
                      <Field
                        name="last_name"
                        type="text"
                        className={styles.form_input}
                        autoComplete="off"
                        placeholder=" "
                      />
                      <label className={styles.form_label}>Фамилия</label>
                    </div>
                    <div className={styles.personal_form_input}>
                      <div className={styles.form}>
                        <Field
                          name="phone"
                          type="text"
                          className={styles.form_input}
                          autoComplete="off"
                          placeholder=" "
                        />
                        <label className={styles.form_label}>Телефон</label>
                      </div>
                      <a>Скрыть</a>
                    </div>
                    <div className="is-flex  is-justify-content-flex-end">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className={styles.form_data_btn}
                      >
                        Сохранить
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              {bankData?.data.map((item) => (
                <Formik
                  initialValues={
                    {
                      id: item.id,
                      bank: item.bank,
                      number: item.number,
                    } as IBankUpdate
                  }
                  validate={usersSearchFormValidate}
                  onSubmit={(
                    values: IBankUpdate,
                    {
                      setSubmitting,
                    }: { setSubmitting: (isSubmitting: boolean) => void }
                  ) => {
                    console.log(values);
                    dispatch(updateBankCard(values));
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className={styles.form}>
                        <Field
                          name="bank"
                          type="text"
                          className={styles.form_input}
                          autoComplete="off"
                          placeholder=" "
                        />
                        <label className={styles.form_label}>
                          Название Банка
                        </label>
                      </div>
                      <div>
                        <div className={styles.form}>
                          <Field
                            name="number"
                            type="text"
                            className={styles.form_input}
                            autoComplete="off"
                            placeholder=" "
                          />
                          <label className={styles.form_label}>
                            Номер карты
                          </label>
                        </div>
                      </div>
                      <div
                        className="is-flex  is-justify-content-flex-end is-align-items-center"
                        style={{ gap: "20px" }}
                      >
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className={styles.form_data_btn}
                        >
                          Сохранить
                        </button>
                        <div
                          className={styles.form_data_btn}
                          style={{ fontWeight: "700", color: "red" }}
                          onClick={() => {
                            dispatch(deleteBankCard(item.id));
                            bankRefetch();
                          }}
                        >
                          Удалить
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              ))}
              {/*@ts-ignore */}
              {Number(localStorage.getItem("currentLevel")) > 6
                ? cryptoData?.data.map((item) => (
                    <Formik
                      initialValues={
                        {
                          id: item.id,
                          address: item.address,
                          name: item.name,
                          network: item.network,
                        } as ICryptoWAlletUpdate
                      }
                      validate={usersSearchFormValidate}
                      onSubmit={(
                        values: ICryptoWAlletUpdate,
                        {
                          setSubmitting,
                        }: { setSubmitting: (isSubmitting: boolean) => void }
                      ) => {
                        console.log(values);
                        dispatch(updateCryptoCard(values));
                        setSubmitting(false);
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div className={styles.form}>
                            <Field
                              name="address"
                              type="text"
                              className={styles.form_input}
                              autoComplete="off"
                              placeholder=" "
                            />
                            <label className={styles.form_label}>
                              Адрес криптокошелька
                            </label>
                          </div>
                          <div>
                            <div className={styles.form}>
                              <Field
                                name="name"
                                type="text"
                                className={styles.form_input}
                                autoComplete="off"
                                placeholder=" "
                              />
                              <label className={styles.form_label}>
                                Криптовалюта
                              </label>
                            </div>
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
                          <div
                            className="is-flex  is-justify-content-flex-end is-align-items-center"
                            style={{ gap: "20px" }}
                          >
                            <button
                              disabled={isSubmitting}
                              type="submit"
                              className={styles.form_data_btn}
                            >
                              Сохранить
                            </button>
                            <div
                              className={styles.form_data_btn}
                              style={{ fontWeight: "700", color: "red" }}
                              onClick={() => {
                                dispatch(deleteCryptoCard(item.id));
                                bankRefetch();
                              }}
                            >
                              Удалить
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  ))
                : bankData?.data.map((item) => (
                    <Formik
                      initialValues={
                        {
                          id: item.id,
                          bank: item.bank,
                          number: item.number,
                        } as IBankUpdate
                      }
                      validate={usersSearchFormValidate}
                      onSubmit={(
                        values: IBankUpdate,
                        {
                          setSubmitting,
                        }: { setSubmitting: (isSubmitting: boolean) => void }
                      ) => {
                        console.log(values);
                        dispatch(updateBankCard(values));
                        setSubmitting(false);
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div className={styles.form}>
                            <Field
                              name="bank"
                              type="text"
                              className={styles.form_input}
                              autoComplete="off"
                              placeholder=" "
                            />
                            <label className={styles.form_label}>
                              Название Банка
                            </label>
                          </div>
                          <div>
                            <div className={styles.form}>
                              <Field
                                name="number"
                                type="text"
                                className={styles.form_input}
                                autoComplete="off"
                                placeholder=" "
                              />
                              <label className={styles.form_label}>
                                Номер карты
                              </label>
                            </div>
                          </div>
                          <div
                            className="is-flex  is-justify-content-flex-end is-align-items-center"
                            style={{ gap: "20px" }}
                          >
                            <button
                              disabled={isSubmitting}
                              type="submit"
                              className={styles.form_data_btn}
                            >
                              Сохранить
                            </button>
                            <div
                              className={styles.form_data_btn}
                              style={{ fontWeight: "700", color: "red" }}
                              onClick={() => {
                                dispatch(deleteBankCard(item.id));
                                bankRefetch();
                              }}
                            >
                              Удалить
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  ))}
                  {/*@ts-ignore */}
{Number(localStorage.getItem('currentLevel')) > 6 ? (
  <Formik
                initialValues={
                  {
                    id: "",
                    address: "",
                    name: "",
                    network: "",
                  } as ICryptoWAllet
                }
                validate={usersSearchFormValidate}
                onSubmit={(
                  values: ICryptoWAllet,
                  {
                    setSubmitting,
                  }: { setSubmitting: (isSubmitting: boolean) => void }
                ) => {
                  console.log(values);
                  dispatch(createCryptoCard(values));
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className={styles.form}>
                      <Field
                        name="address"
                        type="text"
                        className={styles.form_input}
                        autoComplete="off"
                        placeholder=" "
                      />
                      <label className={styles.form_label}>
                        Адрес криптокошелька
                      </label>
                    </div>
                    <div>
                      <div className={styles.form}>
                        <Field
                          name="name"
                          type="text"
                          className={styles.form_input}
                          autoComplete="off"
                          placeholder=" "
                        />
                        <label className={styles.form_label}>
                          Криптовалюта
                        </label>
                      </div>
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
                    <div className="is-flex  is-justify-content-flex-end">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className={styles.form_data_btn}
                      >
                        Сохранить
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
): (
  <Formik
  initialValues={{ bank: "", number: "" } as IBankCreate}
  validate={usersSearchFormValidate}
  onSubmit={(
    values: IBankCreate,
    {
      setSubmitting,
    }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    dispatch(createBankCard(values));
    setSubmitting(false);
  }}
>
  {({ isSubmitting }) => (
    <Form>
      <div className={styles.form}>
        <Field
          name="bank"
          type="text"
          className={styles.form_input}
          autoComplete="off"
          placeholder=" "
        />
        <label className={styles.form_label}>
          Название Банка
        </label>
      </div>
      <div>
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
      <div className="is-flex  is-justify-content-flex-end">
        <button
          disabled={isSubmitting}
          type="submit"
          className={styles.form_data_btn}
        >
          Сохранить
        </button>
      </div>
    </Form>
  )}
</Formik>
)}
             
              
              <div className={`has-text-right ${styles.scale_btn}`}onClick={() => setIsActive(true)}>
                Добавить еще карту
              </div>
              <div>
                <div className={styles.personal_btn_group}>
                  <button
                    onClick={() => setIsChangePassword(true)}
                    className={styles.personal_form_btn}
                  >
                    Смена пароля
                  </button>
                  <a>Поделиться</a>
                </div>
                {isChangePassword && (
                  <ChangePasswordPA
                    email={userDeatails?.data.email}
                    setIsActive={setIsChangePassword}
                  />
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <img src={facebook} alt="facebook" />
                <img src={instagram} alt="instagram" />
                <img src={telegram} alt="telegram" />
                <img src={vk} alt="vk" />
              </div>
              <button
                onClick={() => {
                  dispatch(deleteMe());
                  dispatch(authSlice.actions.setIsLogined(false));
                  return navigate("/auth/sign-up");
                }}
                className={`${styles.personal_form_btn} ${styles.shake_btn}`}
              >
                Удалить мой аккаунт
              </button>
            </div>
          </div>
          <div className={styles.personal_setting}>
            <div style={{ textAlign: "center" }}>
              Настроить показ информации на площадке
            </div>
            <div className={styles.personal_setting_item}>
              <input type="radio" />
              Способ получения средств по карте, уровень с 1-5
            </div>
            <div className={styles.personal_setting_item}>
              <input type="radio" />
              когда участник будет на уровнях 1-5, то для других участников
              будет виден только номер карты\телефона, к которому привязана
              карта
            </div>
            <div className={styles.personal_setting_item}>
              <input type="radio" />
              Способ получения средств в криптовалюте, уровень с 6-20
            </div>
            <div className={styles.personal_setting_item}>
              <input type="radio" />
              когда участник будет на уровнях 6-20, то для других участников
              будет виден только адрес криптокошелька
            </div>
            <div className={styles.personal_setting_item}>
              <input type="radio" />
              Внимание! Для стандартизации и упрощения работы для всех
              участников системы наилучшим способом получения средств в
              криптовалюте является USDT (TRC20). Но вы можете выбрать любой вид
              криптовалюты и сеть
            </div>
            <div className={styles.personal_setting_item}>
              <input type="radio" />В случае изменений настроек, после ввода
              новых данных участнику приходит код с подтверждением действия на
              тот способ уведомления, который он выбрал. После ввода
              поступившего кода настройки меняются
            </div>
            <div className={styles.personal_setting_item}>
              <input type="radio" />
              Выбор адреса криптокошелька это выбор любого участника, какой
              способ получения ему будет удобен. Участник может добавить
              несколько адресов для принятия криптовалюты
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalArea;
