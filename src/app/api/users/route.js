import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET → Ambil semua pengguna
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data users" },
      { status: 500 }
    );
  }
}

// POST → Buat user baru
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    if (!email || !password)
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      );

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal membuat user" },
      { status: 500 }
    );
  }
}
