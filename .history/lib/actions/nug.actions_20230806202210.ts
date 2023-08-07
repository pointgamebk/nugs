"use server";

import User from "../models/user.model";
import Nug from "../models/nug.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  communityId: string;
  path: string;
}

export async function createNug({ text, author, communityId, path }: Params) {
  try {
    connectToDB();

    const createdNug = await Nug.create({
      text,
      author,
      community: null,
    });

    //Update user model
    await User.findByIdAndUpdate(author, {
      $push: { nugs: createdNug._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating nug: ${error.message}`);
  }
}

export async function fetchPosts();
