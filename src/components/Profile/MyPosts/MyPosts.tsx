import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostsPropsType} from "./MyPostsContainer";
import {SubmitHandler, useForm} from "react-hook-form";
import {addPostAC} from "../../../redux/ProfileReducer"

export const MyPosts = React.memo((props: PostsPropsType) => {
  console.log("RENDER")

  const postsElements = props.posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount}/>
  ))

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddMyPostHookForm addPostAC={props.addPostAC}/>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
});

type AddMyPostHookFormType = { addPostAC: (addNewPost: string) => void }

export type AddMyPostType = {
  addNewPost: string
}

const addPostConfig = {
  required: "Field is required!",
  maxLength: {
    value: 300,
    message: "Max lenght is 300 symbols!"
  },
}

export const AddMyPostHookForm = ({addPostAC}: AddMyPostHookFormType) => {
  const addPost: SubmitHandler<AddMyPostType> = (data) => {
    const {addNewPost} = data
    addPostAC(addNewPost)
    resetField("addNewPost")
  }

  const {register, handleSubmit, resetField, formState: {errors}} = useForm({
    values: {
      addNewPost: ""
    }
  })

  return (
    <form onSubmit={handleSubmit(addPost)}>
      <textarea className={s.inputForm} {...register("addNewPost", addPostConfig)}/>
      <div>
        {errors?.addNewPost && <p style={{color: "red"}}>{errors?.addNewPost?.message || "Error"}</p>}
      </div>
      <div>
        <button className={s.add_pst_btn}>Add Post</button>
      </div>
    </form>
  )
}