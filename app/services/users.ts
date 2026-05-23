import { db } from "@/db";
import { users, blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
export const getUsers = async () => {
  return db.query.users.findMany();
};

export const getUserBlogs = async (userName: string) => {
  console.log(userName)
  return db.query.users.findFirst({
    where: eq(users.userName, userName),
    with: { blogs: true }
  });
};