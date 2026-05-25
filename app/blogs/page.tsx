import Link from "next/link";
import { getBlogs } from "../services/blogs";
import { addToReadingList } from "../actions/blogs";
interface Props {
  searchParams: Promise<{ filter?: string; }>;
}

const Blogs = async ({ searchParams }: Props) => {
  const { filter } = await searchParams;
  const allBlogs = await getBlogs();
  const blogs = filter
    ? allBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(filter.toLowerCase())
    )
    : [...allBlogs].sort((a, b) => b.likes - a.likes);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Blogs
          </h2>

          <form
            action="/blogs"
            className="flex gap-3 mb-8"
          >
            <input
              type="text"
              name="filter"
              defaultValue={filter || ""}
              placeholder="Search blogs..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-3 rounded-xl 
              hover:bg-blue-700 transition font-medium"
            >
              Search
            </button>
          </form>

          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li
                key={blog.id}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5 
                hover:shadow-md transition"
              >
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Author
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800">
                    {blog.title}
                  </h3>

                  <p className="text-gray-700">
                    <span className="font-medium">
                      by
                    </span>{" "}
                    {blog.author}
                  </p>

                  <div className="inline-flex items-center bg-blue-100 
                  text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    ❤️ {blog.likes} likes
                  </div>
                  <form action={addToReadingList}>
                    <input type="hidden" name="blogId" value={blog.id} />
                    <button
                      className="font-medium hover:underline "
                      type="submit"> add to reading list</button>

                  </form>

                  <div className="pt-3">
                    <Link
                      href={`/blogs/${blog.id}`}
                      className="inline-block text-blue-600 hover:text-blue-800 
                      font-medium hover:underline"
                    >
                      View Blog →
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {blogs.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No blogs found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;