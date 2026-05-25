import { increaseCount } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

const BlogPage = async (props: Props) => {
  const { id } = await props.params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8 transition"
        >
          ← Back to Publications
        </Link>

        <article className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xs">
          <header className="border-b border-gray-100 pb-6 mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-3">
              {blog.title}
            </h1>
            
            <p className="text-sm text-gray-500">
              Written by <span className="font-semibold text-gray-800">{blog.author}</span>
            </p>
          </header>

         
          <footer className="flex items-center justify-between gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-4 mt-8">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-700 px-3 py-1">
              <span>❤️</span>
              <span>{blog.likes} Likes</span>
            </div>

            <form action={increaseCount}>
              <input type="hidden" name="id" value={blog.id} />
              <button
                type="submit"
                className="bg-blue-500 cursor-pointer hover:bg-gray-800 active:scale-[0.98] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-xs"
              >
                Like Article
              </button>
            </form>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default BlogPage;