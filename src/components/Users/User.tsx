import React from "react";
import styles from "./users.module.css"
import {NavLink} from "react-router-dom";
// @ts-ignore
import userPhoto from "../../assets/images/user.png"
import {userType} from "../../redux/UsersReducer";

export type UserPropsType = {
  user: userType
  followingInProgress: []
  unfollowThunk: (userId: string | number) => void
  followThunk: (userId: string | number) => void
}

export const User: React.FC<UserPropsType> = ({user, followingInProgress, unfollowThunk, followThunk}) => {
  const onClickUnfollowHandler = () => {
    unfollowThunk(user.id)
  }
  const onClickFollowHandler = () => {
    followThunk(user.id)
  }
  return (
    <div className={styles.fullContainer}>
      <span>
        <div className={styles.ava_img}>
          <NavLink to={"/profile/" + user.id}>
            <img className={styles.userPhoto} alt={userPhoto}
                 src={user.photos.small !== null ? user.photos.small : userPhoto}/>
          </NavLink>
        </div>
        <div>
          {user.followed ?
            <button disabled={followingInProgress.some(id => id === user.id)} className={styles.follow_btn}
                    onClick={onClickUnfollowHandler}>Unfollow</button>
            : <button disabled={followingInProgress.some(id => id === user.id)}
                      className={styles.follow_btn} onClick={onClickFollowHandler}>Follow</button>
          }
        </div>
      </span>
      <span>
        <span>
          <div>Name: {user.name}</div>
          <div>Status: {user.status ? user.status : "Hui"}</div>
        </span>
      </span>
    </div>)
}