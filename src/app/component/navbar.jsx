"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-linear-to-r from-[#1A4B6C] to-[#4A92CD] text-white py-4 shadow fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Sarpras</h1>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-1 bg-[#D9D9D9] text-[#3C7EB1] rounded-md font-semibold">
            Login
          </Link>
          <Link href="/register" className="px-4 py-1 bg-[#3c7ec9] hover:bg-blue-600 rounded-md font-semibold">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
