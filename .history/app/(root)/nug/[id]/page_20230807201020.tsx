import NugCard from "@/components/cards/NugCard";
import Comment from "@/components/forms/Comment";
import { fetchNugById } from "@/lib/actions/nug.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
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

      <div className="mt-7">
        <Comment
          nugId={nug.id}
          currentUserImg={userInfo.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {nug.children.map((childItem: any) => (
          <NugCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={childItem?.id || ""}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
