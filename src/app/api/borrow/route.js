import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const borrows = await prisma.borrowing.findMany({
    include: {
      item: true,
      borrower: true,
      approver: true
    },
    orderBy: { createdAt: "desc" }
  });

  return Response.json(borrows);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data.itemId || isNaN(Number(data.itemId))) {
      return Response.json({ message: "itemId tidak valid" }, { status: 400 });
    }

    if (!data.qty || isNaN(Number(data.qty)) || Number(data.qty) <= 0) {
      return Response.json({ message: "qty harus lebih dari 0" }, { status: 400 });
    }

    const itemId = Number(data.itemId);
    const qty = Number(data.qty);
    const userId = Number(session.user.id);

    const item = await prisma.item.findUnique({
      where: { id: itemId }
    });

    if (!item) {
      return Response.json({ message: "Item tidak ditemukan" }, { status: 404 });
    }


    if (item.stock < qty) {
      return Response.json(
        { message: `Stok tidak cukup. Stok tersedia: ${item.stock}` },
        { status: 400 }
      );
    }

    await prisma.item.update({
      where: { id: itemId },
      data: {
        stock: item.stock - qty
      }
    });

    const borrowing = await prisma.borrowing.create({
      data: {
        qty,
        itemId,
        borrowingUserId: userId
      }
    });

    return Response.json(borrowing);

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
