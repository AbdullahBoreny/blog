import { db } from "@/db";
import { eq } from "drizzle-orm";
export const getBlogs =async () => {
  return db.query.blogs.findMany();
};
export const getBlogById = (id: number) => {

};

export const addBlog = (author: string, title: string, likes: number, url: string) => {
  // blogs.push({ id: nextId++, author, title, likes, url });
};
export const increaseLikes = async (id: number) => {
  // const blog = blogs.find(blog => blog.id === id);
  // if (blog) {
  //   blog.likes++;
  // }
};