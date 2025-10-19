"use client";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center p-6 mt-12">
      <p>&copy; {new Date().getFullYear()} Car Brand. All rights reserved.</p>
      <div className="flex justify-center gap-6 mt-4">
        <Link href="/privacy-policy" className="hover:text-white transition">
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" className="hover:text-white transition">
          Terms of Service
        </Link>
        <Link href="/contact" className="hover:text-white transition">
          Contact Us
        </Link>
      </div>
    </footer>
  );
};
