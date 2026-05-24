"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav
      className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md
      border-b border-gray-800 shadow-lg"
    >
      <div
        className="max-w-7xl mx-auto px-6 py-4
        flex items-center gap-3"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-2xl bg-blue-600
            flex items-center justify-center font-bold text-lg"
          >
            B
          </div>

          <h1 className="text-xl font-bold text-white mr-4">
            Blogs App
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <NavLink href="/">Home</NavLink>

          <NavLink href="/blogs">Blogs</NavLink>

          <NavLink href="/users">Users</NavLink>
        </div>

        <div className="ml-auto flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/blogs/new"
                className="bg-blue-600 hover:bg-blue-700
                text-white px-4 py-2 rounded-xl
                font-medium transition shadow-md"
              >
                + Create New
              </Link>

              <div
                className="hidden sm:flex items-center gap-2
                bg-gray-800 px-4 py-2 rounded-2xl"
              >
                <div
                  className="w-8 h-8 rounded-full bg-blue-500
                  flex items-center justify-center text-sm font-bold"
                >
                  {session.user?.name?.charAt(0).toUpperCase()}
                </div>

                <em className="text-gray-300 not-italic text-sm">
                  {session.user?.name}
                </em>
              </div>

              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700
                text-white px-4 py-2 rounded-xl
                text-sm font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-gray-300 hover:text-white
                transition font-medium"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700
                text-white px-4 py-2 rounded-xl
                font-medium transition shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;