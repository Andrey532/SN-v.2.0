import { ComponentType } from "react";
import { compose } from "redux";
import { MyPosts } from "./MyPosts";
import { connect } from "react-redux";
import { addPostAC } from "../../../redux/ProfileReducer";
import { AppStateType } from "../../../redux/store";

export type PostsPropsType = MapDispatchToPropsType & mapStateToPropsType;

type MapDispatchToPropsType = {
  addPostAC: (addNewPost: string) => void;
};

type mapStateToPropsType = {
  posts: messageData[];
};

type messageData = {
  id: number;
  message: string;
  likesCount: number;
};

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
  };
};

export const MyPostsContainer: any = compose<ComponentType>(
  connect(mapStateToProps, {
    addPostAC,
  })(MyPosts)
);
