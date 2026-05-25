import { increaseCount } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";

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
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

                    <div className="mb-6">
                        <Link
                            href="/blogs"
                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                        >
                            ← Back to Blogs
                        </Link>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                                Author
                            </p>

                            <h1 className="text-4xl font-bold text-gray-800">
                                {blog.author}
                            </h1>
                        </div>

                        <div>
                            <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                                Title
                            </p>

                            <h2 className="text-3xl font-semibold text-gray-900">
                                {blog.title}
                            </h2>
                        </div>


                        <div className="flex items-center gap-3">
                            <div
                                className="bg-pink-100 text-pink-700 px-4 py-2 
                rounded-full text-sm font-semibold"
                            >
                                ❤️ {blog.likes} Likes
                            </div>
                        </div>

                        <form action={increaseCount} className="pt-4">
                            <input
                                type="hidden"
                                name="id"
                                value={blog.id}
                            />

                            <button
                                className="bg-blue-600 text-white px-6 py-3 rounded-2xl 
                hover:bg-blue-500 active:scale-95 transition 
                font-semibold shadow-md"
                                type="submit"
                            >
                                Like Blog
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;