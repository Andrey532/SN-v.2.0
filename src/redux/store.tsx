import {applyMiddleware, combineReducers} from "redux";
import { legacy_createStore as createStore } from "redux";
import { dialogsReducer } from "./DialogsReducer";
import { profileReducer } from "./ProfileReducer";
import {usersReducer} from "./UsersReducer";
import {authReducer} from "./AuthReducer";
import thunkMiddleware from "redux-thunk"
import {appReducer} from "./AppReducer";

export const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
