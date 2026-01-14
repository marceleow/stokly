import "server-only";

import { db } from "#/drizzle";
import { users } from "#/drizzle/schema";
import { env } from "#/env";
import { decrypt } from "#/lib/session";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

const AUTH_COOKIE_NAME = env.AUTH_COOKIE_NAME;

export const getSession = async () => {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await decrypt(token);
  if (!session) return null;

  return session;
};

export const verifySession = cache(async () => {
  const session = await getSession();

  if (!session?.userId) redirect("/auth");

  return session;
});

export const getUser = cache(async () => {
  const session = await verifySession();

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.userId),
  });

  if (!user) throw new Error("User is not exists. (getUser)");

  return user;
});
