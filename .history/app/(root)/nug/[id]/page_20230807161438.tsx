import NugCard from "@/components/cards/NugCard";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/dist/types/server-helpers.server";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  <section className="relative">
    <div>
      <NugCard
        key={post._id}
        id={post._id}
        currentUserId={user?.id || ""}
        parentId={post.parentId}
        content={post.text}
        author={post.author}
        community={post.community}
        createdAt={post.createdAt}
        comments={post.children}
      />
    </div>
  </section>;
};

export default Page;
