import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/checkAdmin";

export async function PUT(req, { params }) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin.response;

  try {
    const { name } = await req.json();

    const updated = await prisma.kategori.update({
      where: { id: Number(params.id) },
      data: { name },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Gagal update kategori" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin.response;

  try {
    await prisma.kategori.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Kategori dihapus" });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus kategori" }, { status: 500 });
  }
}
