import {
  sendMessageAC,
  StateDialogsPropsType,
  StateMessagesPropsType,
} from "../../redux/DialogsReducer";
import {Dialogs} from "./Dialogs";
import {AppStateType} from "../../redux/store";
import {compose} from "redux";
import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

export type DialogsPropsType = MapDispatchToPropsType & mapStateToPropsType;

type MapDispatchToPropsType = {
  sendMessageAC: (message: string) => void;
};

type mapStateToPropsType = {
  dialogs: StateDialogsPropsType[];
  message: StateMessagesPropsType[];
  isAuth: boolean
};

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
  return {
    dialogs: state.dialogsPage.dialogs,
    message: state.dialogsPage.messages,
    isAuth: state.auth.isAuth
  };
};

const DialogsContainer: any = compose<ComponentType>(
  connect(mapStateToProps, {
    sendMessageAC,
  }), WithAuthRedirect) (Dialogs)

export default DialogsContainer