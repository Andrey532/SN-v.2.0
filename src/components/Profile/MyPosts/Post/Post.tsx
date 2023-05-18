import s from "./Post.module.css";

type PostType = {
  message: string;
  likesCount: number;
};

export const Post: React.FC<PostType> = (props) => {
  return (
    <div className={s.item}>
      <img
        src="https://kartinkin.net/uploads/posts/2021-07/thumbs/1625699605_37-kartinkin-com-p-kot-v-ochkakh-oboi-krasivie-47.jpg"
        alt="ava-cat.jpg"
      />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}

      </div>
    </div>
  );
};
