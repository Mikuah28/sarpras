import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const stock = Number(formData.get("stock"));
    const categoryId = Number(formData.get("categoryId"));
    const file = formData.get("image");

    if (!name || !stock || !categoryId) {
      return NextResponse.json(
        { error: "Nama, stok, dan kategori wajib diisi." },
        { status: 400 }
      );
    }

    let imagePath = null;

    // Jika ada upload file
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");

      await writeFile(`${uploadDir}/${fileName}`, buffer);

      imagePath = `/uploads/${fileName}`;
    }

    const item = await prisma.item.create({
      data: {
        name,
        description,
        stock,
        categoryId,
        image_url: imagePath,
      },
    });

    return NextResponse.json(item, { status: 201 });

  } catch (err) {
    return NextResponse.json(
      { error: "Gagal menambahkan item", detail: err.message },
      { status: 500 }
    );
  }
}
