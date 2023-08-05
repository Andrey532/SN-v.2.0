import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileUsersType} from "../ProfileContainer";
import {ProfileStatusWithHook} from "./ProfileStatusWithHook";
// @ts-ignore
import UserPhoto from "../../../assets/images/user.png"


type ProfileInfoType = {
  isOwner: boolean
  profile: ProfileUsersType
  status: string
  updateStatus: (status: string) => void
  savePhoto: (file: any) => void
}

export const ProfileInfo = (props: ProfileInfoType) => {
  if (!props.profile) {
    return <Preloader/>
  }

  const onMainPhotoSelected = (e: any) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }
  return (

      <div className={s.block}>
        <div className={s.descriptionBlock}>
          <img className={s.myPhoto} src={props.profile.photos.small || UserPhoto}/>
          {props.isOwner && <input className={s.photo_input} type={"file"} onChange={onMainPhotoSelected}/>}
        </div>
        <div className={s.status}>
            <span className={s.full_name}>
          {props.profile.fullName}
        </span>
          <ProfileStatusWithHook status={props.status}
                                 updateStatus={props.updateStatus}
          />
        </div>
        <div>
          <div className={s.abou_me}>
            {props.profile.aboutMe}
          </div>
          <div className={s.contacts}>
            {props.profile.contacts.facebook}
            {props.profile.contacts.website}
            {props.profile.contacts.vk}
            {props.profile.contacts.twitter}
            {props.profile.contacts.instagram}
            {props.profile.contacts.youtube}
            {props.profile.contacts.github}
            {props.profile.contacts.mainLink}
          </div>
          <div className={s.abou_job}>
            <div>
              {props.profile.lookingForAJob ? "Безработный" : "Работаю в ..."}
            </div>
            {props.profile.lookingForAJobDescription}
          </div>
        </div>
      </div>

  );
};
