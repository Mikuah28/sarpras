"use client";

import { useState, useEffect } from "react";

export default function AddItem() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load kategori dari endpoint admin
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/admin/categories");
        if (!res.ok) throw new Error("Gagal mengambil kategori");

        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCategories();
  }, []);

  // Submit tambah item
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/admin/items", {
      method: "POST",
      body: formData, // FormData → jangan set headers manual
    });

    setLoading(false);

    if (res.ok) {
      alert("Item berhasil ditambahkan!");
      e.target.reset();
      return;
    }

    // Hindari Unexpected end of JSON input
    let error = "Gagal menambahkan item.";
    try {
      const data = await res.json();
      error = data.error || error;
    } catch {}

    alert(error);
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Tambah Barang</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Nama item"
          className="border p-2 w-80 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Deskripsi"
          className="border p-2 w-80 rounded"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stok"
          className="border p-2 w-80 rounded"
          required
        />

        {/* Dropdown kategori */}
        <select
          name="categoryId"
          className="border p-2 w-80 rounded"
          required
        >
          <option value="">Pilih kategori</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {/* Upload gambar */}
        <input
          type="file"
          name="image"
          accept="image/*"
          className="border p-2 w-80 rounded"
        />

        <button
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Menyimpan..." : "Tambah Item"}
        </button>
      </form>
    </div>
  );
}
