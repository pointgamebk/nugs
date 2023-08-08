import { fetchUserPosts } from "@/lib/actions/user.actions";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const NugsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let result = await fetchUserPosts(accountId);
  return <section>NugsTab</section>;
};

export default NugsTab;
