import NugCard from "@/components/cards/NugCard";
import { fetchNugById } from "@/lib/actions/nug.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/dist/types/server-helpers.server";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const nug = await fetchNugById(params.id);

  return (
    <section className="relative">
      <div>
        <NugCard
          key={nug._id}
          id={nug._id}
          currentUserId={user?.id || ""}
          parentId={nug.parentId}
          content={nug.text}
          author={nug.author}
          community={nug.community}
          createdAt={nug.createdAt}
          comments={nug.children}
        />
      </div>
    </section>
  );
};

export default Page;
