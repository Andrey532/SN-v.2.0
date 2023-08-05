import s from "./ProfileInfo.module.css";
import { Preloader } from "../../common/Preloader/Preloader";
import { ProfileUsersType } from "../ProfileContainer";
import { ProfileStatusWithHook } from "./ProfileStatusWithHook";
// @ts-ignore
import UserPhoto from "../../../assets/images/user.png";
import { Entries } from "type-fest";
import { useState } from "react";
import { ProfileDataForm } from "./ProfileDataForm";

type ProfileInfoType = {
  isOwner: boolean;
  profile: ProfileUsersType;
  status: string;
  updateStatus: (status: string) => void;
  savePhoto: (file: any) => void;
  saveProfile:  (fullName: string, aboutMe: string, lookingForAJob: boolean, lookingForAJobDescription: string) => void;
};

export const ProfileInfo: React.FC<ProfileInfoType> = ({
  isOwner,
  profile,
  status,
  updateStatus,
  savePhoto,
  saveProfile
}) => {
  const [editMode, setEditMode] = useState(false)
  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e: any) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };
  
  return (
    <div className={s.block}>
      <div className={s.descriptionBlock}>
        <img className={s.myPhoto} src={profile.photos.small || UserPhoto} />
        {isOwner && (<input className={s.photo_input}type={"file"}onChange={onMainPhotoSelected}/>)}
      </div>

      {editMode 
      ? <ProfileDataForm saveProfileThunk={saveProfile} profile={profile}/> 
      : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={()=> {setEditMode(true)}}/>}
      <div className={s.status}>
        <b>Status:</b>
        <ProfileStatusWithHook status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

type ProfileDataType = {
  profile: ProfileUsersType;
  isOwner: boolean
  goToEditMode: () => void
};

export const ProfileData: React.FC<ProfileDataType> = ({ profile, isOwner, goToEditMode }) => {
  const contacts = Object.entries(profile.contacts) as Entries<typeof profile.contacts>;
  return (
    <div>
      {isOwner && <div><button onClick={goToEditMode}>edit</button></div> }
      <span className={s.full_name}>{profile.fullName}</span>
      <div>
        <div className={s.abou_me}>
          <b>About me:</b> {profile.aboutMe}
        </div>
        {/* <div className={s.contacts}>
          <b>Contacts:</b>
          {contacts.map(([key, value]) => (
            <Contact contactTitle={key} contactValue={value} />
          ))}
        </div> */}
        <div className={s.abou_job}>
          <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
          </div>
          {profile.lookingForAJob && (
            <div>
              <b>My prof skills:</b> {profile.lookingForAJobDescription}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type ContactType = {
  contactTitle: string | null;
  contactValue: string | null;
};

const Contact: React.FC<ContactType> = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};
