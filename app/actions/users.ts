"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "../../db";
import { users } from "../../db/schema";
import { isExists } from "../services/users";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const registerUser = async (
  prevState: { error: string; },
  formData: FormData,
) => {
  const userName = (formData.get("username") as string)?.trim();
  if (userName.length < 4) {
    return { error: "username must be at least 4 characters long" };
  }
  const existsUser = await isExists(userName);
  if (existsUser) {
    return { error: "username already exists" };
  }
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;
  if (confirm !== password) {
    return { error: "passwords don't match" };
  }
  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ userName, name, passwordHash });

  redirect("/login");
};

export const newToken = async (formData: FormData) => {
  const token = crypto.randomUUID();
  console.log(token)
  const id = Number(formData.get("id"));
  console.log(id)
  await db.update(users)
    .set({ token: token })
    .where(eq(users.id, id));
    revalidatePath("/me")
};