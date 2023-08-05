import style from "./Profile.module.css";
import {ProfileUsersType} from "./ProfileContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

export type ProfilePropsType = {
  isOwner: boolean
  updateStatusThunk: any
  profile: ProfileUsersType
  status: string
  updateStatus: (status: string) => void
  savePhoto: (file: any) => void
  saveProfileThunk: (fullName: string, aboutMe: string, lookingForAJob: boolean, lookingForAJobDescription: string) => void
}

export const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <div>
        <ProfileInfo isOwner={props.isOwner}
                     profile={props.profile}
                     status={props.status}
                     updateStatus={props.updateStatusThunk}
                     savePhoto={props.savePhoto}
                     saveProfile={props.saveProfileThunk}
        />
      </div>
      <div className={style.post_container}>
        <MyPostsContainer/>
      </div>
    </div>

  );
};
