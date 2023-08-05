import {applyMiddleware, combineReducers} from "redux";
import { legacy_createStore as createStore } from "redux";
import { DialogsReducerType, dialogsReducer } from "./DialogsReducer";
import { ProfileReducerType, profileReducer } from "./ProfileReducer";
import {UsersReducerType, usersReducer} from "./UsersReducer";
import {AuthReducerType, authReducer} from "./AuthReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import {AppReducerType, appReducer} from "./AppReducer";

export const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//все экшены приложения(для типизации диспатча санок другими санками)
export type AppActionTypes = AppReducerType | AuthReducerType | DialogsReducerType | ProfileReducerType | UsersReducerType;

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionTypes>