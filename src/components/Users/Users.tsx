import React from "react";
import {onPageChangedType, UsersContainerType} from "./UsersContainer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

export const Users = (props: UsersContainerType & onPageChangedType) => {
  return <div>
    <Paginator currentPage={props.currentPage}
               onPageChanged={props.onPageChanged}
               totalItemsCount={props.totalUsersCount}
               pageSize={props.pageSize}
               portionSize={10}
    />
    {
      props.users.map((el, index) =>
        <User key={index}
              user={el}
              followThunk={props.followThunk}
              unfollowThunk={props.unfollowThunk}
              followingInProgress={props.followingInProgress}/>
      )
    }
  </div>
}