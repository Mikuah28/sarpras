'use client';
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {

  const path = usePathname();

  return (
    <div className="w-64 h-screen bg-[#0F2741] text-white flex flex-col p-6 fixed">
      <h2 className="text-xl font-bold mb-10">Admin dashboard</h2>
      <nav className="flex flex-col gap-4 text-sm">
        <Link href="/admin" className={`${path === "/admin" ? "bg-[#4C5E8D]" : ""} px-3 py-2 rounded`}>Dashboard</Link>
        <Link href="/admin/items" className={`${path === "/admin/items" ? "bg-[#4C5E8D]" : ""} px-3 py-2 rounded`}>Kelola Barang</Link>
        <Link href="/admin/category" className={`${path === "/admin/category" ? "bg-[#4C5E8D]" : ""} px-3 py-2 rounded`}>Kelola Kategori</Link>
        <Link href="/admin/inbox" className={`${path === "/admin/inbox" ? "bg-[#4C5E8D]" : ""} px-3 py-2 rounded`}>Kotak Masuk</Link>
        <Link href="/admin/borrowings" className={`${path === "/admin/borrowings" ? "bg-[#4C5E8D]" : ""} px-3 py-2 rounded`}>Peminjaman</Link>
      </nav>

      <div className="mt-auto">
        <button onClick={() => signOut({ callbackUrl: "/" })} 
        className="w-full mt-10 bg-[#4C5E8D] px-3 py-2 rounded">Logout</button>
      </div>
    </div>
  );
}
