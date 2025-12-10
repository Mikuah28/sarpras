import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const totalUsers = await prisma.user.count();
    const totalItems = await prisma.item.count();
    const totalCategories = await prisma.kategori.count();

    const borrowingPending = await prisma.borrowing.count({
      where: { status: "pending" }
    });
    const borrowingApproved = await prisma.borrowing.count({
      where: { status: "approved" }
    });
    const borrowingRejected = await prisma.borrowing.count({
      where: { status: "rejected" }
    });

    const returningPending = await prisma.returning.count({
      where: { status: "pending" }
    });
    const returningApproved = await prisma.returning.count({
      where: { status: "approved" }
    });
    const returningRejected = await prisma.returning.count({
      where: { status: "rejected" }
    });

    const totalStock = await prisma.item.aggregate({
      _sum: { stock: true }
    });

    return Response.json({
      users: totalUsers,
      items: totalItems,
      categories: totalCategories,

      borrowing: {
        pending: borrowingPending,
        approved: borrowingApproved,
        rejected: borrowingRejected,
      },

      returning: {
        pending: returningPending,
        approved: returningApproved,
        rejected: returningRejected,
      },

      stock: totalStock._sum.stock ?? 0,
    });

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
