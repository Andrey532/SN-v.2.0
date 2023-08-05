import {compose} from "redux";
import {ComponentType} from "react";
import {connect} from "react-redux";
import style from "./Login.module.css";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../redux/store";
import { loginThunk} from "../../redux/AuthReducer";
import { LoginHookForm} from "../common/Hooks/LoginHookForm";

export const Login = (props: LoginPropsType) => {
  if (props.isAuth) {
    return <Navigate to={"/profile"}/>
  }
  return <div className={style.log_form}>
    <h1 className={style.pg_title}>LOGIN</h1>
    <LoginHookForm loginThunk={props.loginThunk} captchaUrl={props.captchaUrl} messages={props.messages}/>
  </div>
  }

export type LoginPropsType = MapDispatchToPropsType & MapStateToPropsType;

type MapDispatchToPropsType = {
  loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string)  => void;
};

type MapStateToPropsType = {
  captchaUrl: string | null
  isAuth: boolean
  messages: Array<string>
}

const MapStateToProps = (state: AppStateType) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
  messages: state.auth.messages
})

export const LoginContainer: any = compose<ComponentType>(
  connect(MapStateToProps, {loginThunk})(Login)
)