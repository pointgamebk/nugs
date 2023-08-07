import { fetchPosts } from "@/lib/actions/nug.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();

  console.log(result);

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No nugs found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <NugCard key={post._id} id={post._id} currentUserId={user?.id} />
            ))}
          </>
        )}
      </section>
    </>
  );
}
