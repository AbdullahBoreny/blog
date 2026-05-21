import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string, }>;
}) => {
  const { filter } = await searchParams;
  const allBlogs = getBlogs();
  const blogs = filter ? allBlogs.filter(blog => blog.title.includes(filter)) :
    allBlogs.sort((a, b) => a.likes - b.likes).reverse();

  return (
    <div>

      <h2>Blogs</h2>
      <form action="/blogs">
        <input name="filter" type="text" />
        <button type="submit">search</button>
      </form>
      <ul>
        {blogs.map(blog => (
          <ul style={{ marginBottom: 10 }} key={blog.id}>
            <li>author: {blog.author}</li>
            <li>title: {blog.title}</li>
            <li>likes:  {blog.likes}</li>
            <Link href={`blogs/${blog.id}`}>{blog.url}</Link>
          </ul>
        ))}
      </ul>
    </div>
  );
};
export default Blogs;