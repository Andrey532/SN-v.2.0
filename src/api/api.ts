import axios from "axios";
import {userType} from "../redux/UsersReducer";
import {ProfileUsersType} from "../components/Profile/ProfileContainer";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "d5c325f4-1d70-41dd-b0d6-d89eeb3816ce"
  }
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => {
        return response; //тут должно быть return response.data;------------------------------------
      })
  },
  follow(userId: string | number) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId: string | number) {
    return instance.delete(`follow/${userId}`);
  }
}

type GetUsersType = {
  items: userType[]
  totalCount: number
  error: null
}

export const profileAPI = {
  getProfile(userId: string | number) {
    return instance.get<ProfileUsersType>(`profile/${userId}`);
  },
  getStatus(userId: string | number) {
    return instance.get<string>(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, {status: status});
  }
}

export const authAPI = {
  me() {
    return instance.get<hui>(`auth/me`)
  },
  login(email: string, password: string, rememberMe: boolean = false) {
    return instance.post<hui2>(`auth/login`, {email, password, rememberMe})
  },
  logout() {
    return instance.delete<hui3>(`auth/login`)
  },
}

type hui = {
  data: {
    id: string
    login: string
    email: string
  }
  messages: []
  fieldsErrors: []
  resultCode: number
}

type hui2 = {
  resultCode: number
  messages: []
  data: {
    userId: string
  }
}

type hui3 = {
  resultCode: number
  messages: string[]
  data: {}
}