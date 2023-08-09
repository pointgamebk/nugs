import PostNug from "@/components/forms/PostNug";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Nug</h1>

      <PostNug userId={userInfo._id} />
    </>
  );
}

export default Page;
