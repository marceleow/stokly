import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userRole = {
  admin: "admin",
  user: "user",
} as const;

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  name: text("name").notNull(),
  phoneNumber: text("phoneNumber").notNull(),
  password: text("password").notNull(),
  role: text("role")
    .$type<(typeof userRole)[keyof typeof userRole]>()
    .notNull(),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
});
