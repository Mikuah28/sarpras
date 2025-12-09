import Link from "next/link";// components/AdminCard.jsx

export default function AdminCard({ title, value, link }) {
  return (
    <Link href={link || '/'}>
      <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4 w-[460px]">
        <div className="w-12 h-12 rounded-lg bg-gray-200"></div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </Link>
  );
}
