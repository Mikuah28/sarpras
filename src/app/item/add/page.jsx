// "use client";

// import { useState, useEffect } from "react";

// export default function AddItem() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function fetchCategories() {
//       const res = await fetch("/api/category");
//       const data = await res.json();
//       setCategories(data);
//     }
//     fetchCategories();
//   }, []);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.target);

//     const res = await fetch("/api/item", {
//       method: "POST",
//       body: formData,
//     });

//     setLoading(false);

//     if (res.ok) {
//       alert("Item berhasil ditambahkan!");
//       e.target.reset();
//     } else {
//       const error = await res.json();
//       alert(error.error);
//     }
//   }

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold mb-6">Tambah Barang</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <input
//           type="text"
//           name="name"
//           placeholder="Nama item"
//           className="border p-2 w-80 rounded"
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Deskripsi"
//           className="border p-2 w-80 rounded"
//         ></textarea>

//         <input
//           type="number"
//           name="stock"
//           placeholder="Stok"
//           className="border p-2 w-80 rounded"
//           required
//         />

//         {/* Dropdown kategori */}
//         <select
//           name="categoryId"
//           className="border p-2 w-80 rounded"
//           required
//         >
//           <option value="">Pilih kategori</option>
//           {categories.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         {/* Upload gambar */}
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           className="border p-2 w-80 rounded"
//         />

//         <button
//           disabled={loading}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           {loading ? "Menyimpan..." : "Tambah Item"}
//         </button>
//       </form>
//     </div>
//   );
// }
