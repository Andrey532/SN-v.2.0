import React from "react";
import s from "../Dialogs.module.css";

type PropsMessageType = {
  message: string;
};

export const Message: React.FC<PropsMessageType> = (props) => {
  return <div className={s.message}>{props.message}</div>;
};
