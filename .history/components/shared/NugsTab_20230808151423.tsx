import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/dist/server/api-utils";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const NugsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let result = await fetchUserPosts(accountId);

  if (!result) redirect("/");
  return <section>NugsTab</section>;
};

export default NugsTab;
