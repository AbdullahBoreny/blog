import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "./users";
export const getBlogs = async () => {
  return db.query.blogs.findMany();
};
export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id)
  });
};

export const addBlog = async (author: string, title: string, likes: number, url: string) => {
  const user = await getCurrentUser();
    if (!user) {
    throw new Error("Not logged in")
  }
  await db.insert(blogs).values({ author, likes, title, url, userId: user?.id });
};
export const increaseLikes = async (id: number) => {
  const blog = await getBlogById(id);
  if (blog) {
    blog.likes++;
    await db
      .update(blogs)
      .set({ likes: blog.likes })
      .where(eq(blogs.id, id));
  }
};