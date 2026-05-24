"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      userName: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div
      className="min-h-screen bg-linear-to-b from-gray-100 to-gray-200
      flex items-center justify-center px-4"
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl
        shadow-2xl p-8"
      >
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-2">
            Login to continue to your account
          </p>
        </div>

        {error && (
          <div
            className="mb-6 bg-red-100 border border-red-300
            text-red-700 px-4 py-3 rounded-2xl"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              className="block text-sm font-semibold
              text-gray-700 mb-2"
            >
              Username
            </label>

            <input
              type="text"
              name="username"
              required
              placeholder="Enter your username"
              className="
                w-full border border-gray-300 rounded-2xl
                px-4 py-3 text-gray-800
                focus:outline-none focus:ring-2
                focus:ring-blue-500 transition
              "
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold
              text-gray-700 mb-2"
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="
                w-full border border-gray-300 rounded-2xl
                px-4 py-3 text-gray-800
                focus:outline-none focus:ring-2
                focus:ring-blue-500 transition
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full bg-blue-600 hover:bg-blue-700
              text-white py-3 rounded-2xl
              font-semibold transition
              shadow-md active:scale-[0.99]
            "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}