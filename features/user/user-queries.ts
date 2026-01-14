"use server";

import { db } from "#/drizzle";
import { users } from "#/drizzle/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getUser = async (userId: string) => {
  return await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
};

export const getUsers = cache(async () => {
  return await db.query.users.findMany();
});
