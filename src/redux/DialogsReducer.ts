export type StateDialogsPropsType = {
  id: number;
  name: string;
};

export type StateMessagesPropsType = {
  id: number;
  message: string;
};

const initialState = {
  dialogs: [
    { id: 1, name: "Natasha" },
    { id: 2, name: "Dima" },
    { id: 3, name: "Jeka" },
    { id: 4, name: "Vova" },
    { id: 5, name: "Illia" },
    { id: 6, name: "Roma" },
  ] as Array<StateDialogsPropsType>,
  messages: [
    { id: 1, message: "How are you?" },
    { id: 2, message: "Hi" },
    { id: 3, message: "Hello" },
    { id: 4, message: "Yo" },
    { id: 5, message: "How you doing?" },
  ] as Array<StateMessagesPropsType>,
};

export type InitialStateType = typeof initialState;

export const dialogsReducer = (
  state: InitialStateType = initialState,
  action: DialogsReducerType
): InitialStateType => {
  switch (action.type) {
    case "SEND-MESSAGE": {
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: 6, message: action.payload.message },
        ],
      };
    }
    default:
      return state;
  }
};

export type DialogsReducerType = ReturnType<typeof sendMessageAC>;

export const sendMessageAC = (message: string) =>
  ({
    type: "SEND-MESSAGE",
    payload: {
      message: message,
    },
  } as const);
