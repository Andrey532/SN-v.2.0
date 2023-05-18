import React, {ComponentType} from "react";
import { LoginHookForm} from "../common/Hooks/LoginHookForm";
import {compose} from "redux";
import {connect} from "react-redux";
import { loginThunk} from "../../redux/AuthReducer";
import {AppStateType} from "../../redux/store";
import {Navigate} from "react-router-dom";
import style from "./Login.module.css";

export const Login = (props: LoginPropsType) => {
  if (props.isAuth) {
    return <Navigate to={"/profile"}/>
  }
  return <div className={style.log_form}>
    <h1 className={style.pg_title}>LOGIN</h1>
    <LoginHookForm loginThunk={props.loginThunk}/>
  </div>
  }

export type LoginPropsType = MapDispatchToPropsType & MapStateToPropsType;

type MapDispatchToPropsType = {
  loginThunk: (email: string, password: string, rememberMe: boolean)  => void;
};

type MapStateToPropsType = {
  isAuth: boolean
}

const MapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
})

export const LoginContainer: any = compose<ComponentType>(
  connect(MapStateToProps, {loginThunk})(Login)
)