import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  id: z.number().int(),
  name: z.string().max(10, { message: "名前は10文字以内にしてください" }),
  role: z.enum(["ADMIN", "USER"]),
  //posts: z.array(z.any()),
});

export type User = z.infer<typeof UserSchema>;

export default UserSchema;
