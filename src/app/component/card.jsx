"use client";

import Link from "next/link";

export default function Card({ item }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition text-black">
      <img
        src={item.image_url || "/noimage.png"}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h3 className="text-xl font-bold mt-3">{item.name}</h3>
      <p className="text-blue-600 text-sm">{item.category?.name}</p>

      <p className="text-gray-700 mt-2 text-sm h-12 overflow-hidden">
        {item.description}
      </p>

      <p className="mt-2 font-semibold">Stock: {item.stock}</p>

      <Link
        href={`/borrow/${item.id}`}
        className="mt-3 inline-block bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transition"
      >
        Borrow
      </Link>
    </div>
  );
}
