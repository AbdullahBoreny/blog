"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, increaseLikes } from "../services/blogs";
import { auth } from "@/auth";

export const createBlog = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const author = formData.get("author") as string;
  const title = formData.get("title") as string;
  const likes = formData.get("likes") as string;
  const url = formData.get("url") as string;

  await addBlog(author, title, Number(likes), url);

  revalidatePath("/blogs");
  redirect("/blogs");
};
export const increaseCount = async (formData: FormData) => {
  const id = formData.get("id") as string;
  await increaseLikes(Number(id));
  revalidatePath(`blogs/${id}`);

};