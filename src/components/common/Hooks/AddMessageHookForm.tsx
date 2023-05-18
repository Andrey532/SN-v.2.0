import s from "../../Dialogs/Dialogs.module.css";
import React from "react";
import {sendMessageAC} from "../../../redux/DialogsReducer"
import {SubmitHandler, useForm} from "react-hook-form";

type AddMsgHookFormType = { sendMessageAC: (message: string) => void }

export type IFormInput = {
  message: string
}

const addMsgConfig = {
  required: "Field is required!",
  maxLength: {
    value: 300,
    message: "Max lenght is 300 symbols!"
  },
}

export const AddMessageHookForm = ({sendMessageAC}: AddMsgHookFormType) => {
  const addMessage: SubmitHandler<IFormInput> = (data) => {
    const {message} = data
    sendMessageAC(message)
    resetField("message")
  }

  const {register, handleSubmit, resetField, formState: {errors}} = useForm({
      values: {
        message: ""
      }
    }
  )

  return (
    <form onSubmit={handleSubmit(addMessage)}>
      <textarea className={s.txt_area} {...register("message", addMsgConfig)}/>
      {errors?.message && <p style={{color: "red"}}>{errors?.message?.message}</p>}
      <div>
        <button className={s.btn_snd_msg}>
          Send message
        </button>
      </div>
    </form>
  )
}