import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/checkAdmin";

export async function GET() {
  try {
    const categories = await prisma.kategori.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json({ error: "Gagal mengambil kategori" }, { status: 500 });
  }
}

export async function POST(req) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin.response;

  try {
    const { name } = await req.json();

    const category = await prisma.kategori.create({
      data: { name },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal menambahkan kategori" },
      { status: 500 }
    );
  }
}
