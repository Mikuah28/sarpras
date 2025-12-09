import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET user by ID
export async function GET(req, { params }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(params.id) },
    });

    if (!user)
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Error mengambil data" }, { status: 500 });
  }
}

// UPDATE user by ID
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const updatedData = {};

    if (username) updatedData.username = username;
    if (password)
      updatedData.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: Number(params.id) },
      data: updatedData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Error update" }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(req, { params }) {
  try {
    await prisma.user.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "User berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Error delete" }, { status: 500 });
  }
}
