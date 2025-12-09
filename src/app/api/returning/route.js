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


export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const returningId = Number(params.id);
    const { status } = await req.json();

    if (!["approved", "rejected"].includes(status)) {
      return Response.json(
        { message: "Status harus 'approved' atau 'rejected'" },
        { status: 400 }
      );
    }
    
    const returning = await prisma.returning.findUnique({
      where: { id: returningId },
      include: {
        borrowing: {
          include: { item: true }
        }
      }
    });

    if (!returning) {
      return Response.json({ message: "Returning tidak ditemukan" }, { status: 404 });
    }

    if (status === "approved") {
      await prisma.item.update({
        where: { id: returning.borrowing.itemId },
        data: {
          stock: returning.borrowing.item.stock + returning.qty
        }
      });
    }

    const updated = await prisma.returning.update({
      where: { id: returningId },
      data: {
        status,
        approvedBy: session.user.id
      }
    });

    return Response.json(updated);

  } catch (error) {
    console.error(error);
    return Response.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
