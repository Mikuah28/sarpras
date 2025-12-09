import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data.borrowingId || isNaN(Number(data.borrowingId))) {
      return Response.json({ message: "borrowingId tidak valid" }, { status: 400 });
    }

    if (!data.qty || isNaN(Number(data.qty)) || Number(data.qty) <= 0) {
      return Response.json({ message: "qty harus lebih dari 0" }, { status: 400 });
    }

    const borrowingId = Number(data.borrowingId);
    const qty = Number(data.qty);

    const borrowing = await prisma.borrowing.findUnique({
      where: { id: borrowingId },
      include: { item: true }
    });

    if (!borrowing) {
      return Response.json({ message: "Borrowing tidak ditemukan" }, { status: 404 });
    }

    if (qty > borrowing.qty) {
      return Response.json(
        { message: "Qty melebihi jumlah yang dipinjam" },
        { status: 400 }
      );
    }

    const returning = await prisma.returning.create({
      data: {
        qty,
        borrowingId,
        status: "pending"
      }
    });

    return Response.json(returning);

  } catch (error) {
    console.error(error);
    return Response.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
