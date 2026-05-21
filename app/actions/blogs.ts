"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog } from "../services/blogs";

export const createNote = async (formData: FormData) => {
  const author = formData.get("author") as string;
  const title = formData.get("title") as string;
  const likes = formData.get("likes") as string;
  const url = formData.get("url") as string;
  addBlog(author, title, Number(likes), url);

  revalidatePath("/blogs");
  redirect("/blogs");
};