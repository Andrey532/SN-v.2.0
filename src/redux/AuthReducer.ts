import {Dispatch} from "redux";
import {authAPI} from "../api/api";

export type AuthDataPropsType = {
  id: null | string
  email: null | string
  login: null | string
  isAuth: boolean
}

export type InitialStateType = AuthDataPropsType;

let initialState: AuthDataPropsType = {
  id: null,
  email: null,
  login: null,
  isAuth: false
}

export const authReducer = (state: InitialStateType = initialState, action: AuthReducerType): InitialStateType => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}

export type AuthReducerType =
  | ReturnType<typeof setAuthUserDataAC>


export const setAuthUserDataAC = (id: null | string, email: null | string, login: null | string, isAuth: boolean) => ({
  type: "SET_USER_DATA",
  payload: {
    id,
    email,
    login,
    isAuth,
  }
} as const);

export const getAuthUserDataThunk = () => async (dispatch: Dispatch) => {
  const response = await authAPI.me()

  if (response.data.resultCode === 0) {
    let {id, email, login} = response.data.data;
    dispatch(setAuthUserDataAC(id, email, login, true))
  }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.login(email, password, rememberMe)
    const res2 = await authAPI.me()
    if (res.data.resultCode === 0) {
      const {id, email, login} = res2.data.data
      dispatch(setAuthUserDataAC(id, email, login, true))
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
  } finally {
  }
}

export const logoutThunk = () => async (dispatch: Dispatch) => {
  const res = await authAPI.logout()
  if (res.data.resultCode === 0) {
    dispatch(setAuthUserDataAC('', '', '', false))
  }
}