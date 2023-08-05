import React from "react";
import {User} from "./User";
import styles from "./users.module.css"
import {Paginator} from "../common/Paginator/Paginator";
import {onPageChangedType, UsersContainerType} from "./UsersContainer";

export const Users = (props: UsersContainerType & onPageChangedType) => {
  return <div className={styles.usersContainer}>
    
    {
      props.users.map((el, index) =>
        <User key={index}
              user={el}
              followThunk={props.followThunk}
              unfollowThunk={props.unfollowThunk}
              followingInProgress={props.followingInProgress}/>
      )
    }
    <Paginator currentPage={props.currentPage}
               onPageChanged={props.onPageChanged}
               totalItemsCount={props.totalUsersCount}
               pageSize={props.pageSize}
               portionSize={10}
    />
  </div>
}