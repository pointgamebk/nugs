import { User } from "lucide-react";
import Nug from "../models/nug.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string;
  path: string;
}

export async function creatheNug({ text, author, communityId, path }: Params) {
  connectToDB();

  const createdNug = await Nug.create({
    text,
    author,
    community: null,
  });

  //Update user instance
  await User.findByIdAndUpdate(author. {
    
  })
}
