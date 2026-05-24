import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token"),
});

export const readingList = pgTable("readingList", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id),
  blogId: integer("blogId").notNull().references(() => blogs.id)

});

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
}));

export const blogsRelations = relations(blogs, ({ one }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id]
  }),
  readingList: one(readingList, {
    fields: [blogs.id],
    references: [readingList.blogId]
  })
}));

export const readingListRelations = relations(readingList, ({ one, many }) => ({
  user: one(users, {
    fields: [readingList.userId],
    references: [users.id]
  }),
  blogs: many(blogs)
}));