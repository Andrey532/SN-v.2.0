import s from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import React from "react";
import {AddMessageHookForm} from "../common/Hooks/AddMessageHookForm";
import {sendMessageAC} from "../../redux/DialogsReducer"

export const Dialogs = (props: DialogsPropsType) => {
  const dialogsElements = props.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id}/>
  ));
  const messagesElements = props.message.map((m) => (
    <Message message={m.message}/>
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}> {dialogsElements} </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessageHookForm sendMessageAC={props.sendMessageAC}/>
      </div>
    </div>
  );
};
