import React from "react";
import style from "./LoginHookForm.module.css"
import {SubmitHandler, useForm} from "react-hook-form";

export type LoginHookFormType = {loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string) => void
                                 captchaUrl: string | null
                                 messages: Array<string>
}

export type LogFormInput = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string,
}

const emailConfig = {
  required: "Email is required!",
  pattern: {
    value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
    message: "Please enter valid email!"
  }
}
const passwordConfig = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Min length is 6 symbols!",
  }
}

export const LoginHookForm = ({loginThunk, captchaUrl, messages}: LoginHookFormType) => {

  const Callback: SubmitHandler<LogFormInput> = (data) => {
    const {email, password, rememberMe, captcha} = data
    loginThunk(email, password, rememberMe, captcha)
  }

  const {register, handleSubmit, formState: {errors}} = useForm({
    values: {
      email: "",
      password: "",
      rememberMe: false,
      captcha: "",
    },
    mode: "onChange",
  });
  return (
    <form className={style.login_form}  noValidate autoComplete="off" onSubmit={handleSubmit(Callback)}>
    <div>
      <input type="email" {...register("email", emailConfig)}
             placeholder={"Email"}/>
      <br/>
      {errors.email && (<span style={{color: "red"}}>{errors.email.message}</span>)}

      <br/>
      <input type="password"
             {...register("password", passwordConfig)}
             placeholder={"Password"}/>
      <br/>
      {errors.password && (<span style={{color: "red"}}>{errors?.password?.message}</span>)}

      <br/>
      <div >
        <input type="checkbox"
               {...register("rememberMe")}
              />Remember me
      </div>

      {captchaUrl && <img src={captchaUrl}/>} 
      {captchaUrl && <input type="text" {...register("captcha")} placeholder="captcha"/>}

      {messages ? <div className={style.captcha_err} >{messages}</div> : null}
      
      <br/>
      <button className={style.sbmt_btn}>Login</button>
    </div>
  </form>
  )}