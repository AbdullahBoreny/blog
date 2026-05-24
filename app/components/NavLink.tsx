"use client";

import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className="
        px-4 py-2 rounded-xl font-medium
        text-gray-300 hover:text-white hover:bg-gray-700
        transition-all duration-200
      "
    >
      {children}
    </Link>
  );
};

export default NavLink;