import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = () => {
  const blogs = getBlogs();
  return (
    <div>
      <h2>Blogs</h2>
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