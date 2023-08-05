import {Dispatch} from "redux";
import {authAPI, securityAPI} from "../api/api";
import { AppThunkType } from "./store";

export type AuthDataPropsType = {
  id: null | string
  email: null | string
  login: null | string
  isAuth: boolean
  captchaUrl: string | null
  messages: string[]
}

export type InitialStateType = AuthDataPropsType;

let initialState: AuthDataPropsType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
  messages: []
}

export const authReducer = (state: InitialStateType = initialState, action: AuthReducerType): InitialStateType => {
  switch (action.type) {
    case "SET_USER_DATA":
      case "GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload,
      }
      case "GET_MES_ERR":
      return {
        ...state,
        messages: state.messages.concat(action.payload.messages)
      }
    default:
      return state;
  }
}

export type AuthReducerType =
  | ReturnType<typeof setAuthUserDataAC>
  | ReturnType<typeof getCaptchaUrlAC>
  | ReturnType<typeof mesErrAC>


export const setAuthUserDataAC = (id: null | string, email: null | string, login: null | string, isAuth: boolean) => ({
  type: "SET_USER_DATA",
  payload: {
    id,
    email,
    login,
    isAuth,
  }
} as const);

export const getCaptchaUrlAC = (captchaUrl: string | null) => ({
  type: "GET_CAPTCHA_URL_SUCCESS",
  payload: {
    captchaUrl,
  }
} as const);

export const mesErrAC = (messages: Array<string>) => ({
  type: "GET_MES_ERR",
  payload: {
    messages,
  }
} as const);

export const getAuthUserDataThunk = () => async (dispatch: Dispatch) => {
  const response = await authAPI.me()

  if (response.data.resultCode === 0) {
    let {id, email, login} = response.data.data;
    dispatch(setAuthUserDataAC(id, email, login, true))
  }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string): AppThunkType => async (dispatch) => {
  try {
    const res = await authAPI.login(email, password, rememberMe, captcha)
    const res2 = await authAPI.me()
    if (res.data.resultCode === 0) {
      const {id, email, login} = res2.data.data
      dispatch(setAuthUserDataAC(id, email, login, true))
    } 
    else if (res.data.resultCode === 10 ) {
      dispatch(getCaptchaUrlThunk())
      dispatch(mesErrAC(res.data.messages))
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
  } finally {
  }
}

export const getCaptchaUrlThunk = () => async (dispatch: Dispatch<AuthReducerType>) => {
    const res = await securityAPI.getCaptchaUrl()
    const captchaUrl = res.data.url
      dispatch(getCaptchaUrlAC(captchaUrl))
}

export const logoutThunk = () => async (dispatch: Dispatch<AuthReducerType>) => {
  const res = await authAPI.logout()
  if (res.data.resultCode === 0) {
    dispatch(setAuthUserDataAC('', '', '', false))
  }
}