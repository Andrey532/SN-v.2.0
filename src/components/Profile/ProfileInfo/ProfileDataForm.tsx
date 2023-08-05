import { SubmitHandler, useForm } from "react-hook-form";
import s from "./ProfileInfo.module.css";
import { ProfileUsersType } from "../ProfileContainer";
import { saveProfileThunk } from "../../../redux/ProfileReducer";
import { profile } from "console";

type ProfileDataFormType = {
  saveProfileThunk: (fullName: string, aboutMe: string, lookingForAJob: boolean, lookingForAJobDescription: string)=> void
  profile: ProfileUsersType
};


type ProfileFormType = {
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;

};

// const emailConfig = {
//   required: "Website is required!",
//   pattern: {
//     value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
//     message: "Please enter valid website"
//   }
// }

export const ProfileDataForm = ({saveProfileThunk, profile}: ProfileDataFormType) => {
  const Callback: SubmitHandler<ProfileFormType> = (data) => {
    const { fullName, aboutMe, lookingForAJob, lookingForAJobDescription } = data;
    saveProfileThunk(fullName, aboutMe, lookingForAJob, lookingForAJobDescription)
  };

  const {register,handleSubmit,formState: { errors}} = useForm({
    defaultValues: profile,
    values: {
      fullName: "",
      aboutMe: "",
      lookingForAJob: false,
      lookingForAJobDescription: "",
      contacts: {
        facebook: "",
        website: null,
      vk: "",
      twitter: "",
      instagram: "",
      youtube: null,
      github: "",
      mainLink: null
      },
      userId: 0,
      photos: {
        small: "",
        large: ""
      }
    },
    mode: "onChange",
  });
  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(Callback)}>
        <div>
          <input
            type="fullName"
            {...register("fullName")}
            placeholder={"Full name"}
          />
          <br />
          <input
            type="aboutMe"
            {...register("aboutMe")}
            placeholder={"About me"}
          />
          <br />
          <input type="checkbox" {...register("lookingForAJob")} />
          Loocking job
          <br />
          <input
            type="lookingForAJobDescription"
            {...register("lookingForAJobDescription")}
            placeholder={"My professional skills"}
          />
        </div>
        <br/>
      <button>save</button>
      {/* <div className={s.contacts}>
          <b>Contacts:</b>{Object.keys(profile.contacts).map((key) => {
            return <div className={s.contact}>
              <b>{key}: {<input type="key"{...register("contacts")}
              />}</b> 
             </div>
           })}</div> */}
      </form>
    </div>
  );
};
