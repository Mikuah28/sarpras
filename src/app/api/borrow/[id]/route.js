import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const item = await prisma.item.findUnique({
    where: { id: Number(params.id) },
    include: { category: true },
  });

  if (!item) {
    return Response.json({ error: "Item not found" }, { status: 404 });
  }

  return Response.json(item);
}
