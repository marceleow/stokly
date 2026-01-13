import "server-only";

import { env } from "#/env";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const AUTH_COOKIE_NAME = env.AUTH_COOKIE_NAME;
const AUTH_SECRET_KEY = env.AUTH_SECRET_KEY;
const encodedKey = new TextEncoder().encode(AUTH_SECRET_KEY);

type SessionPayload = {
  userId: number;
  expiresAt: Date;
};

export const encrypt = async (payload: SessionPayload) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);

export const decrypt = async (token: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.log("Failed to verify token");
  }
};

export const createSession = async (userId: number) => {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
  const token = await encrypt({ userId, expiresAt });
  const cookie = await cookies();

  cookie.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
};
