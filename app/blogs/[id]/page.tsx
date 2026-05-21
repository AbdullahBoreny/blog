import { getBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";
interface Props {
    params: Promise<{ id: string; }>;
}
const BlogPage = async (props: Props) => {
    const { id } = await props.params;
    const blog = getBlogById(Number(id));

    if (!blog) {
        notFound();
    }

    return (
        <div>
            <h1>{blog.author}</h1>
            <h2>{blog.title}</h2>
            <p>likes: {blog.likes}</p>
            <p>{blog.url}</p>
            
        </div>
    );
};

export default BlogPage;