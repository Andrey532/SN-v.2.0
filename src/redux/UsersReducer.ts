import {usersAPI} from "../api/api";
import {Dispatch} from "redux";

export type StateUsersPropsType = {
  users: userType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: []
}

export type userType = {
  name: string
  id: number | string
  uniqueUrlName: null | undefined
  photos: {
    small: null | string
    large: null | string
  }
  status: null | undefined
  followed: boolean
}

export type InitialStateType = StateUsersPropsType;

let initialState: StateUsersPropsType = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: []
}

export const usersReducer = (state: InitialStateType = initialState, action: UsersReducerType): InitialStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map(el => el.id === action.userId ? {...el, followed: true} : el)
      }
    case "UNFOLLOW":
      return {
        ...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
      }
    case "SET_USERS": {
      return {...state, users: action.users}
    }
    case "SET_CURRENT_PAGE": {
      return {...state, currentPage: action.currentPage}
    }
    case "SET_USERS_TOTAL_COUNT": {
      return {...state, totalUsersCount: action.count}
    }
    case "TOGGLE_IS_FETCHING": {
      return {...state, isFetching: action.isFetching}
    }
    case "TOGGLE_IS_FOLLOWING_PROGRESS": {
      return <InitialStateType>{
        ...state,
        followingInProgress: action.isFetching
          ? [state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    }
    default:
      return state;
  }
}

export type UsersReducerType =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setUsersTotalCountAC>
  | ReturnType<typeof toggleIsFetchingAC>
  | ReturnType<typeof toggleFollowingProgressAC>

export const followAC = (userId: number) => ({type: "FOLLOW", userId} as const);
export const unfollowAC = (userId: number) => ({type: "UNFOLLOW", userId} as const);
export const setUsersAC = (users: any) => ({type: "SET_USERS", users} as const);
export const setCurrentPageAC = (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage} as const);
export const setUsersTotalCountAC = (totalUsersCount: any) => ({
  type: "SET_USERS_TOTAL_COUNT",
  count: totalUsersCount
} as const);
export const toggleIsFetchingAC = (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const);
export const toggleFollowingProgressAC = (isFetching: boolean, userId: number | string) => ({
  type: "TOGGLE_IS_FOLLOWING_PROGRESS",
  isFetching,
  userId
} as const);

export const getUsersThunk = (page: number, pageSize: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    dispatch(setCurrentPageAC(page))
    const res = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetchingAC(false));
    dispatch(setUsersAC(res.data.items))
    dispatch(setUsersTotalCountAC(res.data.totalCount))
  }
}

export const followThunk = (userId: number) => async (dispatch: Dispatch) => {
  dispatch(toggleFollowingProgressAC(true, userId))
  const res = await usersAPI.follow(userId)
  if (res.data.resultCode === 0) {
    dispatch(followAC(userId))
  }
  dispatch(toggleFollowingProgressAC(false, userId))
}

export const unfollowThunk = (userId: number) => async (dispatch: Dispatch) => {
  dispatch(toggleFollowingProgressAC(true, userId))
  const res = await usersAPI.unfollow(userId)
  if (res.data.resultCode === 0) {
    dispatch(unfollowAC(userId))
  }
  dispatch(toggleFollowingProgressAC(false, userId))
}