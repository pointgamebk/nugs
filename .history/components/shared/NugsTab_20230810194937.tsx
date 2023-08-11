import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import NugCard from "../cards/NugCard";

// interface Props {
//   currentUserId: string;
//   accountId: string;
//   accountType: string;
// }

interface Result {
  name: string;
  image: string;
  id: string;
  nugs: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const NugsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let result: any;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.nugs.map((nug: any) => (
        <NugCard
          // key={nug._id}
          // id={nug._id}
          // currentUserId={currentUserId}
          // parentId={nug.parentId}
          // content={nug.text}
          // author={
          //   accountType === "User"
          //     ? { name: result.name, image: result.image, id: result.id }
          //     : {
          //         name: nug.author.name,
          //         image: nug.author.image,
          //         id: nug.author.id,
          //       }
          // }
          // community={nug.community}
          // createdAt={nug.createdAt}
          // comments={nug.children}
          key={nug._id}
          id={nug._id}
          currentUserId={currentUserId}
          parentId={nug.parentId}
          content={nug.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: nug.author.name,
                  image: nug.author.image,
                  id: nug.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : nug.community
          }
          createdAt={nug.createdAt}
          comments={nug.children}
        />
      ))}
    </section>
  );
};

export default NugsTab;
