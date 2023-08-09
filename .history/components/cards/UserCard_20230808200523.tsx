interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {
  return (
    <article className="user-card">
      <div className="user-card_avatar"></div>
    </article>
  );
};

export default UserCard;
