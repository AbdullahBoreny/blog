"use server";

import { db } from "@/db";
import { readingList } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
export const markAsRead = async (formData: FormData) => {
    const id = Number(formData.get("id"));
    await db.update(readingList).set({ isRead: true }).where(eq(readingList.id, id));


    revalidatePath("/me");
};
