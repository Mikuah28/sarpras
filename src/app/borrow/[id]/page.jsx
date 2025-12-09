"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BorrowPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  fetch(`/api/items/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("DATA API:", data); // ⬅️ lihat isi di console
      setItem(data);
    });
}, [id]);


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("itemId", id);

    const res = await fetch("/api/borrow", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      alert("Peminjaman berhasil diajukan!");
      router.push("/borrow/history");
    } else {
      const error = await res.json();
      alert(error.error);
    }
  }

  if (!item) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 max-w-xl mx-auto bg-[#F2F2F2] text-black">
      <h1 className="text-3xl font-bold mb-6">Borrow {item.name}</h1>

      <img
        src={item.image_url || "noimage.png"}
        className="w-full h-52 object-cover rounded-lg mb-4"
      />

      <p>Category: {item.category?.name}</p>
      <p>Stock: {item.stock}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">

        <label className="block">
          <span>Tanggal Pinjam</span>
          <input type="date" name="startDate" required className="border p-2 w-full rounded" />
        </label>

        <label className="block">
          <span>Tanggal Kembali</span>
          <input type="date" name="endDate" required className="border p-2 w-full rounded" />
        </label>

        <label className="block">
          <span>Keperluan</span>
          <textarea
            name="purpose"
            required
            className="border p-2 w-full rounded"
          ></textarea>
        </label>

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Mengajukan..." : "Ajukan Peminjaman"}
        </button>
      </form>
    </div>
  );
}
