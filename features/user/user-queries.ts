"use server";

import { db } from "#/drizzle";
import { users } from "#/drizzle/schema";
import { eq } from "drizzle-orm";

export const getUser = async (userId: number) => {
  return await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
};
