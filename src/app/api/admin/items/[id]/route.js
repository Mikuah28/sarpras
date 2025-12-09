import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

export async function GET(req, { params }) {
  try {
    const id = Number(params.id);
    const item = await prisma.item.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (err) {
    console.error("GET /api/items/[id] error:", err);
    return NextResponse.json({ error: "Gagal mengambil detail", detail: String(err) }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin.response;

  try {
    const id = Number(params.id);

    // Accept JSON or multipart/form-data
    const contentType = req.headers.get("content-type") || "";
    let data = {};
    let imageUrl = undefined;

    if (contentType.includes("application/json")) {
      data = await req.json();
    } else {
      const form = await req.formData();
      data.name = form.get("name");
      data.description = form.get("description");
      data.stock = Number(form.get("stock") || 0);
      data.categoryId = Number(form.get("categoryId"));

      const file = form.get("image");
      if (file && file.name) {
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await fs.mkdir(uploadsDir, { recursive: true });
        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(path.join(uploadsDir, fileName), buffer);
        imageUrl = `/uploads/${fileName}`;
      }
    }

    if (imageUrl) data.image_url = imageUrl;

    const updated = await prisma.item.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/items/[id] error:", err);
    return NextResponse.json({ error: "Gagal update data", detail: String(err) }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin.response;

  try {
    const id = Number(params.id);
    await prisma.item.delete({ where: { id } });
    return NextResponse.json({ message: "Item dihapus" });
  } catch (err) {
    console.error("DELETE /api/items/[id] error:", err);
    return NextResponse.json({ error: "Gagal menghapus data", detail: String(err) }, { status: 500 });
  }
}
