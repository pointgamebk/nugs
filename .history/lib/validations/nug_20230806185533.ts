import * as z from "zod";

export const NugValidation = z.object({
  nug: z.string().nonempty().min(3, { message: "Minimum 3 characters" }),
  accountId: z.string(),
});
