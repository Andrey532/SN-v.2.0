import React, {ComponentType} from "react";
import {compose} from "redux";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatusThunk, getUsersProfileThunk, savePhotoThunk, updateStatusThunk} from "../../redux/ProfileReducer";
import {AppStateType} from "../../redux/store";
import {withRouter} from "../common/Hooks/withRouter";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {Navigate} from "react-router-dom";

export type ProfileUsersType = {
  aboutMe: string,
  contacts: {
    facebook: string
    website: null | string
    vk: string
    twitter: string
    instagram: string
    youtube: null | string
    github: string
    mainLink: null | string
  },
  lookingForAJob: boolean,
  lookingForAJobDescription: string,
  fullName: string,
  userId: number | string
  photos: {
    small: string | undefined
    large: string | undefined
  }
}

class ProfileComponent extends React.Component<ProfileContainerType> {

  refreshProfile () {
    // @ts-ignore
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId
      if (!userId) {
        return <Navigate to="/login"/>
      }
    }
    this.props.getUsersProfileThunk(userId)
    this.props.getStatusThunk(userId)
  }
  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: Readonly<ProfileContainerType>, prevState: Readonly<{}>, snapshot?: any) {
    // @ts-ignore
    if (this.props.router.params.userId != prevProps.router.params.userId) {
      this.refreshProfile()
    }
  }

  render() {

    return <>
      <div>
        <Profile {...this.props}
              // @ts-ignore
                 isOwner = {!this.props.router.params.userId}
                 profile={this.props.profile}
                 status={this.props.status}
                 updateStatus={this.props.updateStatusThunk}
                 savePhoto={this.props.savePhotoThunk}
        />
      </div>
    </>
  }
}

export type ProfileContainerType = MapDispatchToPropsType & MapStateToPropsType;

type MapDispatchToPropsType = {
  getUsersProfileThunk: (userId: string | number) => void
  getStatusThunk: (userId: string | number) => void
  updateStatusThunk: (status: string) => void
  savePhotoThunk: (file: any) => void
}


type MapStateToPropsType = {
  profile: ProfileUsersType
  status: string
  authorizedUserId: string | null
  isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
  }
}

const ProfileContainer: any = compose<ComponentType>(
  connect(mapStateToProps, {
    getUsersProfileThunk,
    getStatusThunk,
    updateStatusThunk,
    savePhotoThunk
  }), WithAuthRedirect)(withRouter(ProfileComponent))

export default ProfileContainer