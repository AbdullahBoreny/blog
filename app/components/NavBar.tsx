"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink";
import Image from "next/image";

const NavBar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-screen z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 shadow-lg sticky top-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-3">

        <div className="flex items-center gap-2">
          <Image src="/projects.png" alt="Logo" width={50} height={50} />
         
        </div>

        <div className="hidden md:flex items-center gap-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/blogs">Blogs</NavLink>
          <NavLink href="/users">Users</NavLink>
        </div>

        <div className="flex items-center gap-4 ml-auto md:ml-0">

          {session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/blogs/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-xl font-medium transition shadow-md text-sm md:text-base"
              >
                New blog
              </Link>

              <Link
                href="/me"
                className="hidden sm:flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-2xl"
              >
                <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                  {session.user?.name?.charAt(0).toUpperCase()}
                </div>
                <em className="text-gray-300 not-italic text-xs max-w-[100px] truncate">
                  {session.user?.name}
                </em>
              </Link>

              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-gray-300 hover:text-white transition font-medium text-sm md:text-base"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-xl font-medium transition shadow-md text-sm md:text-base"
              >
                Register
              </Link>
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400 hover:text-white focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800 px-6 py-4 flex flex-col gap-3 animate-fadeIn">
          <div onClick={() => setIsOpen(false)}>
            <NavLink href="/">Home</NavLink>
          </div>
          <div onClick={() => setIsOpen(false)}>
            <NavLink href="/blogs">Blogs</NavLink>
          </div>
          <div onClick={() => setIsOpen(false)}>
            <NavLink href="/users">Users</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;