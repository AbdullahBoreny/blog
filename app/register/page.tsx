"use client";

import Link from "next/link";
import { registerUser } from "../actions/users";
import { useActionState } from "react";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    error: "",
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">
            Register to start using the app
          </p>
        </div>

        <form action={formAction} className="space-y-5">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>

            <input
              type="text"
              name="username"
              required
              minLength={4}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              minLength={4}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirm"
              required
              minLength={4}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Confirm your password"
            />
          </div>

          {state.error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-2xl">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl
            font-semibold transition shadow-md active:scale-[0.99]"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}