import { connectToDB } from "../mongoose";
import { NugValidation } from "../validations/nug";

interface Params {
  text: string;
  author: string;
  communityId: string;
  path: string;
}

export async function creatheNug({ text, author, communityId, path }: Params) {
  connectToDB();

  const createdNug = await NugValidation.create();
}
