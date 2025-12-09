import Image from "next/image";
import Link from "next/link";
import Navbar from "./component/navbar";
import Footer from "./component/footer";


export default function LandingPage() {
  return (
    <div className="bg-[#F2F2F2]">
      <Navbar className="" />

      {/* HERO SECTION */}
      <section className="relative h-[350px] w-full">
        <img 
          src="./sarpras.jpeg" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start container mx-auto px-4 text-white">
          <h1 className="text-4xl font-bold mb-2">Sarpras</h1>
          <h2 className="text-2xl">(Sarana dan Prasarana Sekolah)</h2>
          <p className="mt-4 text-lg">Tempat Peminjaman Barang Sekolah</p>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="container mx-auto mt-10 px-4 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4 text-black">About Us</h2>
        <div className="bg-white p-6 rounded-xl shadow flex flex-row items-center w-[960px]">
          <p className="text-gray-700 leading-relaxed mr-4 text-xl">
            SARPRAS adalah divisi yang bertanggung jawab atas pengelolaan,
            pemeliharaan, dan pengembangan fasilitas agar setiap kegiatan dapat
            berjalan dengan nyaman, aman, dan efisien. Kami memastikan seluruh aset
            digunakan secara optimal dan mendukung kebutuhan operasional dengan
            pelayanan yang cepat, teratur, dan profesional.
          </p>
          <img src="./question-41.svg"
              className="w-72 h-72 mt-4"  />
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto mt-10 px-4 text-center flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6 text-black">Featured</h2>
        <p className="text-black mb-8">
          Platform Sarpras dilengkapi berbagai fitur untuk mendukung proses peminjaman secara profesional.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black w-[960px]">
          {[
            "Form Peminjaman Online",
            "Pemantauan Status Peminjaman",
            "Riwayat Peminjaman",
            "Data Barang yang Terstruktur",
            "Sistem Notifikasi Pengembalian",
            "Manajemen Aset untuk Admin",
          ].map((item, i) => (
            <div key={i} className="bg-white shadow rounded-xl p-6 hover:bg-blue-50 transition">
              <p className="font-medium">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
