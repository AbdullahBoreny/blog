import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
export const getUsers = async () => {
  return db.query.users.findMany();
};

export const getUserBlogs = async (userName: string) => {
  return db.query.users.findFirst({
    where: eq(users.userName, userName),
    with: { blogs: true }
  });
};

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }
  return db.query.users.findFirst({
    where: eq(users.userName, session.user.email),
  });
};
export const isExists = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.userName, username)
  });
};