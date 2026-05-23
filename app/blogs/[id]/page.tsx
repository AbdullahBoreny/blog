import { increaseCount } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";
interface Props {
    params: Promise<{ id: string; }>;
}
const BlogPage = async (props: Props) => {
    const { id } = await props.params;
    const blog = await getBlogById(Number(id));

    if (!blog) {
        notFound();
    }

    return (
        <div>
            <h1>Author: {blog.author}</h1>
            <h2>Title: {blog.title}</h2>
            <p>{blog.url}</p>
            <p>likes: {blog.likes}</p>
            <form action={increaseCount}>
                <input type="hidden" name="id" value={blog.id} />
                <button type="submit">
                    like
                </button>
            </form>

        </div>
    );
};

export default BlogPage;