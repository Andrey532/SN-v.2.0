import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import style from "./LoginHookForm.module.css"

export type LoginHookFormType = {loginThunk: (email: string, password: string, rememberMe: boolean) => void}

export type LogFormInput = {
  email: string,
  password: string,
  rememberMe: boolean,
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

export const LoginHookForm = ({loginThunk}: LoginHookFormType) => {

  const Callback: SubmitHandler<LogFormInput> = (data) => {
    const {email, password, rememberMe} = data
    loginThunk(email, password, rememberMe)
  }

  const {register, handleSubmit, formState: {errors}} = useForm({
    values: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  return (
    <form  noValidate autoComplete="off" onSubmit={handleSubmit(Callback)}>
    <div>
      <input type="email" {...register("email", emailConfig)}
             placeholder={"Email"}/>

      {errors.email && (<span style={{color: "red"}}>{errors.email.message}</span>)}

      <br/>
      <input type="password"
             {...register("password", passwordConfig)}
             placeholder={"Password"}/>

      {errors.password && (<span style={{color: "red"}}>{errors?.password?.message}</span>)}

      <br/>
      <div >
        <input type="checkbox"
               {...register("rememberMe")}
              />Remember me
      </div>
      <br/>
      <button className={style.sbmt_btn}>Login</button>
    </div>
  </form>
  )}