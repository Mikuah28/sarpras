"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../layout/page";

export default function Item() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/items");
      const data = await res.json();
      setItems(data);
    }
    fetchData();
  }, []);


  console.log(items)


  return (
    <div className="bg-[#F2F2F2]">
            <AdminLayout>
              <div>
                <h1 className="text-3xl font-bold mb-8 text-black">Kelola Barang</h1>
              </div>
    
              <div className="bg-white p-6 rounded-xl shadow mb-10 text-gray-600">
                <h2 className="text-lg font-semibold mb-4"></h2>
    
                <table className="w-full text-left border-t">
                  <thead>
                    <tr className="text-gray-600">
                      <th className="py-2">No</th>
                      <th className="py-2">Nama Barang</th>
                      <th className="py-2"></th>
                      <th className="py-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr className="border-t text-gray-700" key={item.id}>
                        <td className="py-2">{item.id}</td>
                        <td className="py-2">{item.name}</td>
                        <td className="py-2">{item.description}</td>
                        <td className="py-2">{item.category.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AdminLayout>
        </div>


    // <div className="p-10">
    //   <h1 className="text-2xl font-bold mb-4">Daftar Kategori</h1>

    //   <ul className="space-y-2">
    //     {categories.map((c) => (
    //       <li
    //         key={c.id}
    //         className="border p-3 rounded bg-white shadow-sm"
    //       >
    //         {c.name}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}
