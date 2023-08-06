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

import { usePathname, useRouter } from "next/navigation";

// import { updateUser } from "@/lib/actions/user.actions";

function PostNug({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(NugValidation),
    defaultValues: {
      nug: "",
      accountId: userId,
    },
  });

  return <h1>Post Nug Form</h1>;
}

export default PostNug;
