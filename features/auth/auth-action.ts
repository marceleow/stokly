"use server";

import { db } from "#/drizzle";
import { users } from "#/drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import z from "zod";
import { createSession } from "#/lib/session";
import { redirect } from "next/navigation";

const SignInSchema = z.object({
  phoneNumber: z.string(),
  password: z
    .string()
    .min(8, "Password harus memiliki minimal 8 karakter")
    .max(100, "Password tidak boleh lebih dari 100 karakter"),
});

export const signIn = async (_: any, formData: FormData) => {
  const parsed = SignInSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success)
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
    };

  const user = await db.query.users.findFirst({
    where: eq(users.phoneNumber, parsed.data.phoneNumber),
    columns: {
      id: true,
      password: true,
    },
  });

  if (!user)
    return {
      success: false,
      message: "Kredensial tidak valid",
    };

  if (!(await bcrypt.compare(parsed.data.password, user.password)))
    return {
      success: false,
      message: "Kredensial tidak valid",
    };

  await createSession(user.id);
  redirect("/");
};
