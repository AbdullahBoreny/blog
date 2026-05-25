
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
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Blogs
        </h2>

        <form
          action="/blogs"
          className="flex flex-wrap gap-3 mb-8"
        >
          <input
            type="text"
            name="filter"
            defaultValue={filter || ""}
            placeholder="Search blogs..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition"
          />

          <button
            type="submit"
            className="bg-blue-500 antialiased font-medium text-white fw px-2 py-2 rounded-2xl
              hover:bg-blue-700 transition"
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

                <form className="flex relative" action={addToReadingList}>
                  <h3 className="flex-1 text-2xl font-semibold text-gray-800">
                    {blog.title}
                  </h3>
                  <input type="hidden" name="blogId" value={blog.id} />
                  <button
                    className="absolute right-0 top-20 font-medium bg-blue-500 text-sm mt-0.5 cursor-pointer text-white p-2 rounded-2xl"
                    type="submit"> Add to reading list</button>

                </form>
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
  );
};

export default Blogs;