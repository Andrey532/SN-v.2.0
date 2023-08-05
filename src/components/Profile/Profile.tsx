import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileUsersType} from "./ProfileContainer";
import style from "./Profile.module.css";

export type ProfilePropsType = {
  isOwner: boolean
  updateStatusThunk: any
  profile: ProfileUsersType
  status: string
  updateStatus: (status: string) => void
  savePhoto: (file: any) => void
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
        />
      </div>
      <div className={style.post_container}>
        <MyPostsContainer/>
      </div>
    </div>

  );
};
