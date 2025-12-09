"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HomeNavbar from "../../component/homenav";
import Footer from "../../component/footer";
import Card from "../../component/card";
import AdminLayout from "../layout/page";


export default function Item() {

  const [items, setItems] = useState([]);
  useEffect(() => {
  fetch("/api/items")
    .then(res => res.json())
    .then(data => setItems(data));
  }, []);



  return (
    <div className="bg-[#F2F2F2]">
      <HomeNavbar className="fixed top-0 z-50" />
        
        <AdminLayout>
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


            
        </AdminLayout>
    </div>
  );
}
