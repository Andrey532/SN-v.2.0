import { AppThunkType } from "./store";
import { getAuthUserDataThunk } from "./AuthReducer";

export type AppDataPropsType = {
  initialized: boolean;
};

export type InitialStateType = AppDataPropsType;

let initialState: AppDataPropsType = {
  initialized: false,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppReducerType
): InitialStateType => {
  switch (action.type) {
    case "INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export type AppReducerType = ReturnType<typeof initializedSuccessAC>;

export const initializedSuccessAC = () =>
  ({ type: "INITIALIZED_SUCCESS" } as const);

export const initializeAppThunk = (): AppThunkType => (dispatch) => {
  dispatch(getAuthUserDataThunk()).then(() => {
    dispatch(initializedSuccessAC());
  });
};
