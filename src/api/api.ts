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
        return response;
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
  },
  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append("image", photoFile)

    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  saveProfile(fullName: string, aboutMe: string,lookingForAJob: boolean,lookingForAJobDescription: string) {
    return instance.put<ProfileUsersType>(`profile`, {fullName,aboutMe,lookingForAJob,lookingForAJobDescription});
  }
}

type type1 = {
  data: {
    id: string
    login: string
    email: string
  }
  messages: []
  fieldsErrors: []
  resultCode: number
}

type type2 = {
  resultCode: number
  messages: []
  data: {
    userId: string
  }
  captcha: string
}

type type3 = {
  resultCode: number
  messages: string[]
  data: {}
}

export const authAPI = {
  me() {
    return instance.get<type1>(`auth/me`)
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha = "") {
    return instance.post<type2>(`auth/login`, {email, password, rememberMe, captcha})
  },
  logout() {
    return instance.delete<type3>(`auth/login`)
  },
}

type getCaptchaUrlType = {
  url: string 
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<getCaptchaUrlType>(`security/get-captcha-url`)
  }
}

