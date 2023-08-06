import * as z from "zod";

export const NugValidation = z.object({
  nug: z.string().nonempty().min(3, { message: "Minimum 3 characters" }),
  name: z.string().min(3).max(30),
  username: z.string().min(3).max(30),
  bio: z.string().min(3).max(1000),
});
