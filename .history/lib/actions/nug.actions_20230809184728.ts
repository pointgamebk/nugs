"use server";

import User from "../models/user.model";
import Nug from "../models/nug.model";
import Community from "../models/community.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
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
      path: "community",
      model: Community,
    })
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

export async function createNug({ text, author, communityId, path }: Params) {
  try {
    connectToDB();

    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    const createdNug = await Nug.create({
      text,
      author,
      community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
    });

    //Update user model
    await User.findByIdAndUpdate(author, {
      $push: { nugs: createdNug._id },
    });

    if (communityIdObject) {
      // Update Community model
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { threads: createdNug._id },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating nug: ${error.message}`);
  }
}

export async function fetchNugById(id: string) {
  connectToDB();

  try {
    const nug = await Nug.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Nug,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();

    return nug;
  } catch (error: any) {
    throw new Error(`Error fetching nug: ${error.message}`);
  }
}

export async function addCommentToNug(
  nugId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    const originalNug = await Nug.findById(nugId);

    if (!originalNug) {
      throw new Error("Nug not found");
    }

    const commentNug = new Nug({
      text: commentText,
      author: userId,
      parentId: nugId,
    });

    // Save the new nug ("thread")
    const savedCommentNug = await commentNug.save();

    // Update the original nug to include the new comment
    originalNug.children.push(savedCommentNug._id);

    // Save the original nug
    await originalNug.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to nug: ${error.message}`);
  }
}
