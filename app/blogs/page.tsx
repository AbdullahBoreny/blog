import Link from "next/link";
import { getBlogs } from "../services/blogs";

interface Props {
  searchParams: Promise<{ filter?: string }>;
}

const Blogs = async ({ searchParams }: Props) => {
  const { filter } = await searchParams;
  const allBlogs = await getBlogs();

  const blogs = filter 
    ? allBlogs.filter(blog => blog.title.toLowerCase().includes(filter.toLowerCase())) 
    : [...allBlogs].sort((a, b) => b.likes - a.likes); // Standard high-to-low sorting

  return (
    <div>
      <h2>Blogs</h2>
      <form action="/blogs">
        <input name="filter" type="text" defaultValue={filter || ""} />
        <button type="submit">search</button>
      </form>
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {blogs.map(blog => (
          <li style={{ marginBottom: 20 }} key={blog.id}>
            <div><strong>author:</strong> {blog.author}</div>
            <div><strong>title:</strong> {blog.title}</div>
            <div><strong>likes:</strong> {blog.likes}</div>
            <Link href={`/blogs/${blog.id}`}>{blog.url}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;