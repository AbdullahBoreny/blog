import { addBlog, getBlogs } from "@/app/services/blogs";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getUserBlogs } from "@/app/services/users";


export const GET = async (req: NextRequest) => {
    const Bearer = req.headers.get("authorization");
    const token = Bearer?.substring(7);
    if (!token) {
        return NextResponse.json({ error: "Unauthorized: token not found" }, { status: 401 });
    }
    const user = await db.query.users.findFirst({
        where: (eq(users.token, token))
    });
    if (token !== user?.token) {
        return NextResponse.json({ error: "Unauthorized TOKEN" }, { status: 401 });

    }
    const blogs = await getUserBlogs(user.userName);
    return NextResponse.json(blogs);
};


export const POST = async (req: NextRequest) => {
    const Bearer = req.headers.get("authorization");
    const token = Bearer?.substring(7);

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await db.query.users.findFirst({
        where: (eq(users.token, token))
    });
    if (token !== user?.token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    }
    const body = await req.json();
    const { author, title, url, likes } = body;


    await addBlog(author, title, url, likes);
    revalidatePath("/blogs");
    return NextResponse.json({ success: true }, { status: 201 });
};