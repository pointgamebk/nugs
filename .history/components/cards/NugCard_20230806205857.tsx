interface Props {
  id: string;
  currentUserId: string;
  parentId;
  content;
  author;
  community;
  createdAt;
  comments;
}

const NugCard = async ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
}: Props) => {};

export default NugCard;
