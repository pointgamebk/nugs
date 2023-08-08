interface Props {
  nugId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({ nugId, currentUserImg, currentUserId }: Props) => {
  return (
    <div>
      <h1 className="text-white">Comment Form</h1>
    </div>
  );
};

export default Comment;
