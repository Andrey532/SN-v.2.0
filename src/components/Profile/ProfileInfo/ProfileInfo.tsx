import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileUsersType} from "../ProfileContainer";
import {ProfileStatus} from "./ProfileStatus"
import {ProfileStatusWithHook} from "./ProfileStatusWithHook";


type ProfileInfoType = {
  profile: ProfileUsersType
  status: string
  updateStatus: (status: string) => void
}

export const ProfileInfo = (props: ProfileInfoType) => {
  if (!props.profile) {
    return <Preloader/>
  }
  return (
    <div>
      <div className={s.block}>
        <div className={s.descriptionBlock}>
          <img className={s.myPhoto} src={props.profile.photos.small}/>
          <ProfileStatusWithHook status={props.status}
                                 updateStatus={props.updateStatus}
          />
        </div>
        <span>
          {props.profile.fullName}
        </span>
        <div>
          <div>
            {props.profile.aboutMe}
          </div>
          {props.profile.contacts.facebook}
          {props.profile.contacts.website}
          {props.profile.contacts.vk}
          {props.profile.contacts.twitter}
          {props.profile.contacts.instagram}
          {props.profile.contacts.youtube}
          {props.profile.contacts.github}
          {props.profile.contacts.mainLink}
          <div>
            <div>
              {props.profile.lookingForAJob ? "Безработный" : "Работаю в ..."}
            </div>
            {props.profile.lookingForAJobDescription}
          </div>
        </div>
      </div>
    </div>
  );
};
