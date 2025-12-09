// app/admin/page.jsx
import AdminCard from "../component/admincard";
import AdminLayout from "./layout/page";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="bg-gray-300">
      <AdminLayout className="overflow-x-hidden">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 text-black">Halo👋 Admin!</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-10 text-gray-600">
        <AdminCard title="Jumlah Kategori" value="120" />
        <AdminCard title="Pengajuan Masuk" value="120" />
        <AdminCard title="Ringkasan Barang" value="120" />
        <AdminCard title="Peminjaman Terakhir" value="120" />
      </div>

      {/* Pengajuan Masuk Terbaru */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 text-gray-600">
        <h2 className="text-lg font-semibold mb-4">Pengajuan Masuk Terbaru</h2>

        <table className="w-full text-left border-t">
          <thead>
            <tr className="text-gray-600">
              <th className="py-2">Nama</th>
              <th className="py-2">Kelas</th>
              <th className="py-2">Barang</th>
              <th className="py-2">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t text-gray-700">
              <td className="py-3">—</td>
              <td className="py-3">—</td>
              <td className="py-3">—</td>
              <td className="py-3">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-10 text-gray-600">
        <AdminCard title="Daftar Barang" link="/admin/items" />
        <AdminCard title="Tambahkan Barang" link="/admin/items/add"/>
      </div>

      </AdminLayout>
    </div>
  );
}
