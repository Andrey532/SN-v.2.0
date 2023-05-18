import {addPostAC, profileReducer, PostsType} from "./ProfileReducer";

test ("length of posts should be incremented", () => {

  //1.test data
  const action = addPostAC("test profile reducer")
  const state: PostsType = {
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
    status: ""
  }

  //2.action
  const newState = profileReducer(state, action)

  //3.expected
  expect(newState.posts.length).toBe(5)
})