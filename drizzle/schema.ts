import { UserRole } from "#/features/auth/auth-permission";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => ulid()),
  name: text("name").notNull(),
  phoneNumber: text("phoneNumber").notNull(),
  password: text("password").notNull(),
  role: text("role").$type<UserRole>().notNull(),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
});

export type User = typeof users.$inferSelect;
