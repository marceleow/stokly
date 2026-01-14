import { UserRole } from "#/features/auth/auth-permission";
import { db } from ".";
import { users } from "./schema";
import bcrypt from "bcrypt";

const seed = async () => {
  await db.insert(users).values({
    name: "User",
    phoneNumber: "08123993",
    password: await bcrypt.hash("password", 10),
    role: UserRole.ADMIN,
  });
};

seed();
