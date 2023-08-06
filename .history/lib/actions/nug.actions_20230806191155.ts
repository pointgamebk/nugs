import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string;
  path: string;
}

export async function creatheNug({ text, author, communityId, path }: Params) {
  connectToDB();

  const createdNug = await Nug.create();
}
