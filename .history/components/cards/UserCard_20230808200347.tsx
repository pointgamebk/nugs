interface Props {
  key: string;
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

const UserCard = ({ key, id, name, username, imgUrl, personType }: Props) => {
  return <div>UserCard</div>;
};

export default UserCard;
