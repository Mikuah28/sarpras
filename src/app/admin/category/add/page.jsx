"use client";
import { useState } from "react";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Kategori berhasil ditambahkan!");
      setName("");
    } else {
      const error = await res.json();
      alert(error.error || "Terjadi kesalahan");
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Tambah Kategori</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama kategori..."
          className="border p-2 rounded w-72"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
