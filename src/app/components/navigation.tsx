"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const Pathname = usePathname();
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md flex gap-6">
      <Link
        href="/"
        className={
          Pathname === "/"
            ? "font-bold text-white border-b-2 border-red-500 pb-1"
            : "text-gray-400 hover:text-white transition"
        }
      >
        Home
      </Link>
      <Link
        href="/about"
        className={
          Pathname === "/about"
            ? "font-bold text-white border-b-2 border-red-500 pb-1"
            : "text-gray-400 hover:text-white transition"
        }
      >
        About
      </Link>
      <Link
        href="/products/1"
        className={
          Pathname.startsWith("/products/1")
            ? "font-bold text-white border-b-2 border-red-500 pb-1"
            : "text-gray-400 hover:text-white transition"
        }
      >
        Product
      </Link>
      <Link
        href="/schedule"
        className={
          Pathname === "/schedule"
            ? "font-bold text-white border-b-2 border-red-500 pb-1"
            : "text-gray-400 hover:text-white transition"
        }
      >
        Schedule
      </Link>
    </nav>
  );
};
