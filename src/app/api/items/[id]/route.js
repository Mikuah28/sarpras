import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/checkAdmin";

export async function GET(req, { params }) {
  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(params.id) },
      include: { category: true },
    });

    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(item);
  } catch (err) {
    return NextResponse.json({ error: "Gagal mengambil detail" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin.response;

  try {
    const data = await req.json();

    const updated = await prisma.item.update({
      where: { id: Number(params.id) },
      data,
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal update data" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin.response;

  try {
    await prisma.item.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Item dihapus" });
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal menghapus data" },
      { status: 500 }
    );
  }
}
