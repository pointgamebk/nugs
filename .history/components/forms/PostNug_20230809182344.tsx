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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { NugValidation } from "@/lib/validations/nug";
import { useOrganization } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { createNug } from "@/lib/actions/nug.actions";

// import { updateUser } from "@/lib/actions/user.actions";

function PostNug({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  const form = useForm({
    resolver: zodResolver(NugValidation),
    defaultValues: {
      nug: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof NugValidation>) => {
    if (!organization) {
      await createNug({
        text: values.nug,
        author: userId,
        communityId: null,
        path: pathname,
      });
    } else {
      await createNug({
        text: values.nug,
        author: userId,
        communityId: null,
        path: pathname,
      });
    }

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="nug"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="mt-10 text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
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
}

export default PostNug;
