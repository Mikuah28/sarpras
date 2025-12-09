import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/checkAdmin";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin.response;

  try {
    const form = await req.formData();

    const name = form.get("name");
    const description = form.get("description") || "";
    const stock = Number(form.get("stock"));
    const categoryId = Number(form.get("categoryId"));

    const imageFile = form.get("image");

    let imageUrl = null;

    // Kalau ada file gambar
    if (imageFile && typeof imageFile === "object") {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Lokasi simpan
      const uploadDir = path.join(process.cwd(), "public/uploads");

      // Pastikan folder ada
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Buat nama file unik
      const filename = `${Date.now()}-${imageFile.name}`;

      // Save ke folder
      fs.writeFileSync(path.join(uploadDir, filename), buffer);

      // URL untuk disimpan di DB
      imageUrl = `/uploads/${filename}`;
    }

    const item = await prisma.item.create({
      data: {
        name,
        description,
        stock,
        categoryId,
        image_url: imageUrl,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal menambahkan barang", detail: err.message },
      { status: 500 }
    );
  }
}
