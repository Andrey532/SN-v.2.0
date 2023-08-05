import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {ProfileUsersType} from "../components/Profile/ProfileContainer";

export type PostsType = {
  posts: messageData[];
  profile: ProfileUsersType;
  status: string;
};

type messageData = {
  id: number;
  message: string;
  likesCount: number;
};

const initialState: PostsType = {
  posts: [
    {id: 1, message: "Hi, how are you?", likesCount: 2},
    {id: 2, message: "It's my first post.", likesCount: 19},
    {id: 3, message: "I'm good.", likesCount: 12},
    {id: 4, message: "what is your name?", likesCount: 48},
  ],
  profile: {
    "aboutMe": "",
    "contacts": {
      "facebook": "",
      "website": null,
      "vk": "",
      "twitter": "",
      "instagram": "",
      "youtube": null,
      "github": "",
      "mainLink": null
    },
    "lookingForAJob": true,
    "lookingForAJobDescription": "",
    "fullName": "",
    "userId": 0,
    "photos": {
      "small": "",
      "large": ""
    }
  },
  status: "",
};

export type InitialStateType = typeof initialState;

export const profileReducer = (state: InitialStateType = initialState, action: ProfileReducerType): InitialStateType => {
  switch (action.type) {
    case "ADD_POST": {
      return {
        ...state,
        posts: [
          {id: 5, message: action.payload.addNewPost, likesCount: 0}, ...state.posts],
      };
    }
    case "SET-STATUS": {
      return {
        ...state,
        status: action.payload.status
      };
    }
    case "SET-USER-PROFILE": {
      return {...state, profile: action.payload.profile}
    }

    case "SAVE-PHOTO-SUCCESS": {
      // @ts-ignore
      return {...state, profile: {...state.profile, photos: action.payload.photos}}
    }

    default: {
      return state;
    }
  }
};

export type ProfileReducerType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof setUsersProfileAC>
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof savePhotoSuccessAC>

//actions

export const addPostAC = (addNewPost: string) => ({type: "ADD_POST", payload: {addNewPost}} as const)
export const setUsersProfileAC = (profile: ProfileUsersType) => ({type: "SET-USER-PROFILE", payload: {profile}} as const)
export const setStatusAC = (status: string) => ({type: "SET-STATUS", payload: {status}} as const)
export const savePhotoSuccessAC = (photos: string | undefined) => ({type: "SAVE-PHOTO-SUCCESS", payload: {photos}} as const)

//thunks

export const getUsersProfileThunk = (userId: string | number) => async (dispatch: Dispatch) => {
  const res = await profileAPI.getProfile(userId);
  dispatch(setUsersProfileAC(res.data))
};

export const getStatusThunk = (userId: string | number) => async (dispatch: Dispatch) => {
  const res = await profileAPI.getStatus(userId)
  dispatch(setStatusAC(res.data))
};

export const updateStatusThunk = (status: string) => async (dispatch: Dispatch) => {
  const res = await profileAPI.updateStatus(status)
  if (res.data.resultCode === 0) {
    dispatch(setStatusAC(status))
  }
};

export const savePhotoThunk = (file: any) => async (dispatch: Dispatch) => {
  const res = await profileAPI.savePhoto(file)
  if (res.data.resultCode === 0) {
    dispatch(savePhotoSuccessAC(res.data.data.photos))
  }
};

export const saveProfileThunk = (fullName: string, aboutMe: string, lookingForAJob: boolean, lookingForAJobDescription: string) => async (dispatch: Dispatch) => {
  const res = await profileAPI.saveProfile(fullName, aboutMe, lookingForAJob, lookingForAJobDescription)
    dispatch(setUsersProfileAC(res.data))
    window.location.reload()
}