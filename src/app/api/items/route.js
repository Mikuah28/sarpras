import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/checkAdmin";

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin.response;

  try {
    const form = await req.formData();

    const name = form.get("name");
    const description = form.get("description") || "";
    const stock = Number(form.get("stock"));
    const categoryId = Number(form.get("categoryId"));
    const image = form.get("image")?.name || null;

    const item = await prisma.item.create({
      data: { name, description, stock, categoryId, image },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal menambahkan barang", detail: err.message },
      { status: 500 }
    );
  }
}
