"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, increaseLikes } from "../services/blogs";
import { auth } from "@/auth";
interface Error {
  author: string,
  title: string;
  url: string,

}
export const createBlog = async (
  prevState: { errors: Error, values: Error; },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const errors = {
    author: "",
    url: "",
    title: ""
  };

  const author = formData.get("author") as string;
  if (author.length < 3) {
    const error = "author should be above 5 chars";
    Object.assign(errors, { author: error });
  }
  const title = formData.get("title") as string;
  if (title.length < 3) {
    const error = "title should be above 5 chars";
    Object.assign(errors, { title: error });

  }
  const url = formData.get("url") as string;
  if (url.length < 5) {
    const error = "url should be above 5 chars";
    Object.assign(errors, { url: error });


  }
  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url } };
  }
  const likes = formData.get("likes") as string;

  await addBlog(author, title, Number(likes), url);

  revalidatePath("/blogs");
  redirect("/blogs");
};
export const increaseCount = async (formData: FormData) => {
  const id = formData.get("id") as string;
  await increaseLikes(Number(id));
  revalidatePath(`blogs/${id}`);

};