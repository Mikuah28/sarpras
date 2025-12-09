"use client";
import Link from "next/link";

export default function HomeNavbar() {
  return (
    <nav className="w-full bg-linear-to-r from-[#1A4B6C] to-[#4A92CD] text-white py-4 shadow fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Sarpras</h1>
        <input type="text"
               placeholder="Search"
               name="search"
               className="border-2 border-gray-300 bg-white text-gray-400 mx-auto px-4 py-1 rounded-md w-96 h-8">
        </input>
      </div>
    </nav>
  );
}
