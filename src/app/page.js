import Image from "next/image";
import { PrismaClient } from "@prisma/client";

export default async function Home() {

  const prisma = new PrismaClient();

  const users = await prisma.user.findMany()
  console.log(users)

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    {users.map((user) => (
        <p>{user.id}. {user.email}</p>
    ))}
    </div>
  );
}
