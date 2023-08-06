import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  return <h1 className="head-text">Create Nug</h1>;
}

export default Page;
