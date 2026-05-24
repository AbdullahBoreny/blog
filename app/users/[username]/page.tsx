import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserBlogs } from "../../services/users";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;

  const user = await getUserBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-white rounded-3xl shadow-xl p-8">
          
          <div className="mb-8">
            <Link
              href="/users"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              ← Back to Users
            </Link>
          </div>

          <div className="space-y-6">
            
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                Name
              </p>

              <h1 className="text-4xl font-bold text-gray-800">
                {user.name}
              </h1>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                Username
              </p>

              <p className="text-xl text-gray-700">
                @{user.userName}
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Blogs
                </h2>

                <span
                  className="bg-blue-100 text-blue-700 
                  px-3 py-1 rounded-full text-sm font-medium"
                >
                  {user.blogs.length} Posts
                </span>
              </div>

              {user.blogs.length > 0 ? (
                <ul className="space-y-4">
                  {user.blogs.map((blog) => (
                    <li
                      key={blog.id}
                      className="border border-gray-200 rounded-2xl 
                      hover:shadow-md transition"
                    >
                      <Link
                        href={`/blogs/${blog.id}`}
                        className="flex items-center justify-between 
                        px-5 py-4 hover:bg-gray-50 transition"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {blog.title}
                          </h3>
                        </div>

                        <span
                          className="text-blue-600 font-medium 
                          hover:translate-x-1 transition"
                        >
                          Read →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500 py-6">
                  This user has no blogs yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;