import React, {ComponentType} from "react";
import {Header} from "./Header";
import {compose} from "redux";
import {connect} from "react-redux";
import {AuthDataPropsType, logoutThunk} from "../../redux/AuthReducer";
import {AppStateType} from "../../redux/store";

class HeaderComponent extends React.Component<AuthContainerType> {

  render() {
    return <Header {...this.props.setAuthUserDataAC} data={this.props.data} logoutThunk = {this.props.logoutThunk}/>
  }
}

export type AuthContainerType = MapDispatchToPropsType & MapStateToPropsType;

type MapDispatchToPropsType = {
  setAuthUserDataAC: (data: AuthDataPropsType) => void
  logoutThunk: () => void
}

type MapStateToPropsType = {
  data: AuthDataPropsType
  isAuth: any
  login: any
}

const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    data: state.auth,
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

export const HeaderContainer: any = compose<ComponentType>(
  connect(MapStateToProps, {
     logoutThunk,
  }))(HeaderComponent)