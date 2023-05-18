import React, {ComponentType} from "react";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../redux/store";
import {connect} from "react-redux";

export type MapStateToPropsToNavigateType = {
  isAuth: boolean
}

const mapStateToPropsToNavigate = (state: AppStateType): MapStateToPropsToNavigateType => {
  return {
    isAuth: state.auth.isAuth
  }
}

export function WithAuthRedirect<T>(Component: ComponentType<T>) {
  function RedirectComponent (props: MapStateToPropsToNavigateType) {
    let {isAuth, ...restProps} = props
      if (!props.isAuth) {
        return <Navigate to={"/login"}/>
      }
      // @ts-ignore
    return <Component {...restProps as T}/>
  }
  return connect(mapStateToPropsToNavigate) (RedirectComponent)
}

