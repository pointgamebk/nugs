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

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  //Calculate the number of posts to skip
  const skipAmount = (pageNumber - 1) * pageSize;

  // Fetch the posts thathave no parents (top-level threads...)
  const postsQuery = Nug.find({ parentId: { $in: [null, undefined] } })
    .sort({
      createdAt: "desc",
    })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPostsCount = await Nug.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

export async function fetchNugById(id: string) {
  connectToDB();

  try {
  } catch (error) {}
}
