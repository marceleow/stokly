"use server";

import { db } from "#/drizzle";
import { users } from "#/drizzle/schema";
import { prepareFormData } from "#/lib/parse";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import z from "zod";
import { UserRole } from "../auth/auth-permission";
import { FormValidationMode } from "@base-ui/react";

const updateUserSchema = z.object({
  userId: z.string(),
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  password: z.string().optional(),
  role: z.enum(UserRole),
});

export const updateUser = async (_: any, formData: FormData) => {
  const cleaned = prepareFormData(formData);
  const parsed = updateUserSchema.safeParse(cleaned);

  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
      success: false,
    };
  }

  if (parsed.data.password) {
    parsed.data.password = await bcrypt.hash(parsed.data.password, 10);
  }

  await db
    .update(users)
    .set(parsed.data)
    .where(eq(users.id, parsed.data.userId));

  revalidateTag("users", "max");

  return {
    success: true,
  };
};

export const deactivateUser = async (_: any, formData: FormData) => {
  const parsed = z
    .object({
      userId: z.string(),
    })
    .safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success)
    return {
      success: false,
      message: "Pengguna tidak ditemukan",
    };

  await db
    .update(users)
    .set({ active: false })
    .where(eq(users.id, parsed.data.userId));

  revalidateTag("users", "max");
  return {
    success: true,
  };
};

export const toggleUserActive = async (_: any, formData: FormData) => {
  console.log(formData.get("active"));
  const parsed = z
    .object({
      userId: z.string(),
      active: z.coerce.number(),
    })
    .safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    console.log(z.flattenError(parsed.error).fieldErrors);
    return {
      success: false,
      message: "Pengguna tidak ditemukan",
    };
  }

  console.log(parsed.data.active);

  await db
    .update(users)
    .set({ active: Boolean(parsed.data.active) })
    .where(eq(users.id, parsed.data.userId));

  revalidateTag("users", "max");
  return {
    success: true,
  };
};
