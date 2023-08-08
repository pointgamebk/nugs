import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import NugCard from "../cards/NugCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const NugsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let result = await fetchUserPosts(accountId);

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.nugs.map((nug) => (
        <NugCard />
      ))}
    </section>
  );
};

export default NugsTab;