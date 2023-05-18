import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileUsersType} from "./ProfileContainer";

export type ProfilePropsType = {
  updateStatusThunk: any
  profile: ProfileUsersType
  status: string
  updateStatus: (status: string) => void
}

export const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo profile={props.profile}
                   status={props.status}
                   updateStatus={props.updateStatusThunk}/>
      <MyPostsContainer/>
    </div>
  );
};
