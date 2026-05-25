"use client";

import { createBlog } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    errors: { author: "", title: "", url: "" },
    values: { author: "", title: "", url: "" },
    success: false,
  });

  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully!");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        
        <div className="bg-white rounded-3xl shadow-xl p-8">
          
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Create a New Blog
            </h2>

            <p className="text-gray-500 mt-2">
              Share your thoughts with the world.
            </p>
          </div>

          <form action={formAction} className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Author
              </label>

              <input
                type="text"
                name="author"
                minLength={3}
                defaultValue={state.values?.author}
                placeholder="Enter author name"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition"
              />

              {state.errors.author && (
                <p className="text-red-500 text-sm mt-2">
                  {state.errors.author}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>

              <input
                type="text"
                name="title"
                minLength={3}
                defaultValue={state.values?.title}
                placeholder="Enter blog title"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition"
              />

              {state.errors.title && (
                <p className="text-red-500 text-sm mt-2">
                  {state.errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Likes
              </label>

              <input
                type="number"
                name="likes"
                placeholder="0"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL
              </label>

              <input
                type="text"
                name="url"
                minLength={5}
                defaultValue={state.values?.url}
                placeholder="https://example.com"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition"
              />

              {state.errors.url && (
                <p className="text-red-500 text-sm mt-2">
                  {state.errors.url}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-2xl
              font-semibold hover:bg-blue-700 active:scale-[0.99]
              transition shadow-md"
            >
              Create Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;