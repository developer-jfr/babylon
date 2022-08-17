import { memo, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiMenu} from "react-icons/hi";
import { motion } from "framer-motion";

import styles from "./index.module.scss";
import logo from "assets/images/logo.svg";
import second_perc from "assets/images/second_perc.svg";
import Exit from "modules/exit";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "hooks/redux";
import { useGetUserDetails } from "services/user/user-queries";

const NavBar = () => {
  const isMobileScreen = useMediaQuery({ query: "(max-width:500px)" });
  const [toggle, setToggle] = useState(false);
  const [exit, setExit] = useState<boolean>(false);
  const { pathname } = useLocation();
  const { isLogined } = useAppSelector((state) => state.authReducer);
  const {data} = useGetUserDetails();
  const navigate = useNavigate();
  

useEffect( () => {
  if(!isLogined) {
    return navigate('/auth/sign-in', {state: true})
  }
}, [isLogined])

  const isExit = () => {
    setExit(!exit);
  }
  const getIsActive = (curr: string) => {
    if (pathname === curr) {
      return styles.item;
    }
  };

  return (
  <>
     {exit && isMobileScreen ? <Exit functionToggle={setExit} toggle={exit} />  :''}
    <nav className={styles.wrapper}>
    {exit ? <Exit functionToggle={setExit} toggle={exit} /> : ""}
      <div>
        <img className={styles.logo} src={logo} alt="Logo" />
      </div>
      <div className={styles.items}>
        <ul className={styles.flex}>
          <NavLink className={getIsActive("/")} to="/">
            <li>Уровни ({localStorage.getItem('currentLevel')})</li>
          </NavLink>
          <NavLink className={getIsActive("/area")} to="/area">
            <li>Площадка</li>
          </NavLink>
          <NavLink className={getIsActive("/workers")} to="/workers">
            {" "}
            <li>Рабочие ({localStorage.getItem('currentLevel')})</li>
          </NavLink>
          <NavLink
            className={getIsActive("/personal-area")}
            to="/personal-area"
          >
            <li>Личный кабинет</li>
          </NavLink>
          <NavLink className={getIsActive("/strategy")} to="/strategy">
            <li>Стратегия</li>
          </NavLink>
          <NavLink className={getIsActive("/info")} to="/info">
            <li>Информация</li>
          </NavLink>
          <NavLink className={getIsActive("/statistics")} to="/statistics">
            {" "}
            <li>Статистика</li>
          </NavLink>
          <NavLink className={getIsActive("/prizes")} to="/prizes">
            {" "}
            <li>Призы</li>
          </NavLink>
          <li onClick={() => setExit(true)} style={{ cursor: "pointer" }}>
            Выход
          </li>
          {exit && <Exit functionToggle={setExit} toggle={exit} /> }
        </ul>
      </div>
      <div className="app__navbar-menu">
        {!toggle && <HiMenu style={{zIndex: '999',cursor: 'pointer'}} onClick={() => setToggle(true)} />}

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
           
            <ul>
            <section className={styles.navbar_user_wrapp}>
              <img src={second_perc} alt="second_perc" />
              <section className={styles.navbar_user_text}>
                <span>{data?.data.username}</span>
                <span> {data?.data.phone}</span>
              </section>
            
            </section>
            <section className={styles.navbar_line}></section>
            <li >
                  <NavLink to="/">
                    <a onClick={() => setToggle(false)}>Уровни (1)</a>
                  </NavLink>
                </li>
                <li >
                  <NavLink to="/area">
                    <a onClick={() => setToggle(false)}>Площадка</a>
                  </NavLink>
                </li>
                <li >
                  <NavLink to="/workers">
                    <a onClick={() => setToggle(false)}>Рабочие (1)</a>
                  </NavLink>
                </li>
                <li >
                  <NavLink to="/personal-area">
                    <a onClick={() => setToggle(false)}>Личный кабинет</a>
                  </NavLink>
                </li>
                <li >
                  <NavLink to="/strategy">
                    <a onClick={() => setToggle(false)}>Стратегия</a>
                  </NavLink>
                </li>
                <li >
                  <NavLink to="/info">
                    <a onClick={() => setToggle(false)}>Информация</a>
                  </NavLink>
                </li>
                <li >
                  <NavLink to="/statistics">
                    <a onClick={() => setToggle(false)}>Статистика</a>
                  </NavLink>
                </li>
                <li >
                  <NavLink to="/prizes">
                    <a onClick={() => setToggle(false)}>Призы</a>
                  </NavLink>
                </li>
                <li >
                  <a>
                    <a onClick={() => isExit()}>Выход</a>
                  </a>
                </li>
               
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  </>
  );
};

export default memo(NavBar);
