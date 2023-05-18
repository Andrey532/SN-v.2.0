import React from "react";
import {compose} from "redux";
import {Users} from "./Users";
import {connect} from "react-redux"
import {ComponentType} from "react";
import {AppStateType} from "../../redux/store";
import {Preloader} from "../common/Preloader/Preloader";
import {
  followThunk, getUsersThunk,
  setCurrentPageAC,
  unfollowThunk, userType
} from "../../redux/UsersReducer";
import {
  getCurrentPage, getFollowingInProgress, getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../redux/UsersSelectors";

export type onPageChangedType = {
  onPageChanged: (pageNumber: any) => void
}

class UsersComponent extends React.Component<UsersContainerType> {
  componentDidMount() {
    this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    this.props.getUsersThunk(pageNumber, this.props.pageSize);
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader/> : null}
      <Users users={this.props.users}
             pageSize={this.props.pageSize}
             onPageChanged={this.onPageChanged}
             currentPage={this.props.currentPage}
             totalUsersCount={this.props.totalUsersCount}
             setCurrentPageAC={this.props.setCurrentPageAC}
             isFetching={this.props.isFetching}
             followingInProgress={this.props.followingInProgress}
             getUsersThunk={this.props.getUsersThunk}
             unfollowThunk={this.props.unfollowThunk}
             followThunk={this.props.followThunk}
      />
    </>
  }
}

export type UsersContainerType = MapDispatchToPropsType & MapStateToPropsType

type MapDispatchToPropsType = {
  setCurrentPageAC: (currentPage: any) => void
  getUsersThunk: (currentPage: number, pageSize: number) => void
  followThunk: (userId: string | number) => void
  unfollowThunk: (userId: string | number) => void
}

type MapStateToPropsType = {
  users: userType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: []
}

// const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress
//   }
// }

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }
}

export const UsersContainer: any = compose<ComponentType>(
  connect(mapStateToProps, {
    setCurrentPageAC,
    getUsersThunk,
    followThunk,
    unfollowThunk,
  }))(UsersComponent);