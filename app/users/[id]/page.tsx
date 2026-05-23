import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserBlogs } from "../../services/users";

const UserPage = async ({ params }: { params: Promise<{ id: string; }>; }) => {
    const { id } = await params;
    const user = await getUserBlogs(Number(id));
    if (!user) {
        notFound();
    }


    return (
        <div>
            <h2>Name: {user.name}</h2>
            <p>Username: {user.userName}</p>
            <h3>blogs</h3>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>

                    </li>
                ))}
            </ul>
        </div>
    );
};
export default UserPage;