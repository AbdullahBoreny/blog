import Link from "next/link";
import { getBlogs } from "../services/blogs";

interface Props {
  searchParams: Promise<{ filter?: string }>;
}

const Blogs = async ({ searchParams }: Props) => {
  const { filter } = await searchParams;
  const allBlogs = getBlogs();

  // Create a copy before sorting to avoid mutating the original source array
  const blogs = filter 
    ? allBlogs.filter(blog => blog.title.toLowerCase().includes(filter.toLowerCase())) 
    : [...allBlogs].sort((a, b) => b.likes - a.likes); // Standard high-to-low sorting

  return (
    <div>
      <h2>Blogs</h2>
      <form action="/blogs">
        {/* Providing a defaultValue keeps the input in sync with the URL */}
        <input name="filter" type="text" defaultValue={filter || ""} />
        <button type="submit">search</button>
      </form>
      
      {/* Cleaned up HTML structure */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {blogs.map(blog => (
          <li style={{ marginBottom: 20 }} key={blog.id}>
            <div><strong>author:</strong> {blog.author}</div>
            <div><strong>title:</strong> {blog.title}</div>
            <div><strong>likes:</strong> {blog.likes}</div>
            {/* Added a leading slash to the link so it routes relative to root */}
            <Link href={`/blogs/${blog.id}`}>{blog.url}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;