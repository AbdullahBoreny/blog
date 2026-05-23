import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull(),
  userId: integer("userId").notNull().references(() => users.id)
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userName: text("userName").unique().notNull(),
  password: text("password").notNull(),
});