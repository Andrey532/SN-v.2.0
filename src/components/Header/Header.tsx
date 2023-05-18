import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {AuthDataPropsType} from "../../redux/AuthReducer";
// @ts-ignore
import logoSN from "../../assets/images/logoSN.png"
// @ts-ignore
import LogOutPng from "../../assets/images/log_out2.png"

export type HeaderPropsType = {
  data: AuthDataPropsType
  logoutThunk: () => void
}

export const Header = (props: HeaderPropsType) => {
  const onClickHandler = () => props.logoutThunk()

  return (
    <header className={s.header}>
      <img className={s.logo_SN} src={logoSN} alt="logo"/>
      <div className={s.loginBlock}>
        {props.data.isAuth
          ? <div>{props.data.login} - <button className={s.btn} onClick={onClickHandler}><img className={s.log_out_png} src={LogOutPng} alt=""/>Log out</button></div>
          : <NavLink to={"/login"}>Login</NavLink>}
      </div>
    </header>
  );
};
