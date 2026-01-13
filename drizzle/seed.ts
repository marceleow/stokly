import { db } from ".";
import { users } from "./schema";
import bcrypt from "bcrypt";

const seed = async () => {
  await db.insert(users).values({
    name: "Marceleo",
    phoneNumber: "08115816279",
    password: await bcrypt.hash("password", 10),
    role: "admin",
  });
};

seed();
