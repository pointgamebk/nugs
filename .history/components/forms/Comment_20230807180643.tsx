"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/lib/validations/nug";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
//import { createNug } from "@/lib/actions/nug.actions";

interface Props {
  nugId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({ nugId, currentUserImg, currentUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      nug: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    // await createNug({
    //   text: values.nug,
    //   author: userId,
    //   communityId: null,
    //   path: pathname,
    // });

    router.push("/");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="nug"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="mt-10 text-base-semibold text-light-2">
                <Image
                  src={currentUserImg}
                  alt="Profile image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Input
                  type="text"
                  placeholder="Comment..."
                  {...field}
                  className="no-focus text-light-1 outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post Nug
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
