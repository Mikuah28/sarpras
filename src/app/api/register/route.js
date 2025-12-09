import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    const existing = await prisma.user.findFirst({ where: { email } });
    if (existing)
      return new Response(JSON.stringify({ message: "Email already exists" }), { status: 400 });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashed,
      }
    });

    return Response.json({ status: "success", user });
  } catch (error) {
    return new Response(JSON.stringify({ mes: error.message }), { status: 500 });
  }
}
