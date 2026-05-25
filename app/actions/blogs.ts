"use server";

import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, increaseLikes } from "../services/blogs";
import { auth } from "@/auth";
import { getCurrentUser } from "../services/users";
import { readingList } from "@/db/schema";
import { db } from "@/db";
interface Error {
  author: string,
  title: string;
  url: string,

}
export const createBlog = async (
  prevState: { errors: Error, values: Error, success?: boolean; },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const errors = {} as Error;

  const author = formData.get("author") as string;
  if (author.length < 3) {
    const error = "author should be above 3 chars";
    Object.assign(errors, { author: error });
  }
  const title = formData.get("title") as string;
  if (title.length < 3) {
    const error = "title should be above 3 chars";
    Object.assign(errors, { title: error });

  }
  const url = formData.get("url") as string;
  if (url.length < 5) {
    const error = "url should be above 5 chars";
    Object.assign(errors, { url: error });

  }
  const likes = formData.get("likes") as string;
  console.log(Object.keys(errors).length);
  if (Object.keys(errors).length > 0) {
    return { success: false, errors, values: { title, author, url } };
  }

  await addBlog(author, title, Number(likes), url);
  revalidatePath("/blogs");
  return {
    errors: { author: "", title: "", url: "" },
    success: true,
    values: { title: "", author: "", url: "" }
  };
};
export const increaseCount = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user) {
    notFound();
  }
  const id = formData.get("id") as string;
  await increaseLikes(Number(id));
  revalidatePath(`/blogs/${id}`);

};
export const addToReadingList = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"));
  const user = await getCurrentUser();
  if (!user) {
    notFound();
  }
  await db.insert(readingList).values({ blogId, userId: user?.id });
  revalidatePath("/me");
  redirect("/me");
};