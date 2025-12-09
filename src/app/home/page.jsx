"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HomeNavbar from "../component/homenav";
import Footer from "../component/footer";
import Card from "../component/card";


export default function Home() {

  const [items, setItems] = useState([]);
  useEffect(() => {
  fetch("/api/items")
    .then(res => res.json())
    .then(data => setItems(data));
  }, []);



  return (
    <div className="bg-[#F2F2F2]">
      <HomeNavbar className="fixed top-0 z-50" />

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


      <section>
        <h2 className="text-2xl font-semibold mb-6 text-black p-8">
          Kategori
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
        </div>
      </section>


      {/* LIST BARANG */}
      <section className="container mx-auto mt-16 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-black text-center">
          Daftar Barang
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </section>


      
      <Footer />
    </div>
  );
}
