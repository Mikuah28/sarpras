import { PrismaClient, Role, BorrowStatus, ReturnStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  console.log("Seeding database...");

  // === Users ===
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      username: "admin",
      password: "admin123",
      role: Role.admin,
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      username: "user1",
      password: "password123",
      role: Role.user,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      username: "user2",
      password: "password123",
      role: Role.user,
    },
  });

  // === Categories ===
  const elektronik = await prisma.kategori.create({
    data: {
      name: "Elektronik",
    },
  });

  const alatTulis = await prisma.kategori.create({
    data: {
      name: "Alat Tulis",
    },
  });

  // === Items ===
  const laptop = await prisma.item.create({
    data: {
      name: "Laptop Lenovo",
      description: "Laptop untuk keperluan kantor",
      stock: 5,
      image_url: null,
      categoryId: elektronik.id,
    },
  });

  const proyektor = await prisma.item.create({
    data: {
      name: "Proyektor Epson",
      description: "Untuk kegiatan presentasi",
      stock: 2,
      categoryId: elektronik.id,
    },
  });

  const pulpen = await prisma.item.create({
    data: {
      name: "Pulpen Hitam",
      description: "Pulpen untuk menulis",
      stock: 100,
      categoryId: alatTulis.id,
    },
  });

  // === Borrowing ===
  const borrowing1 = await prisma.borrowing.create({
    data: {
      qty: 1,
      status: BorrowStatus.approved,
      itemId: laptop.id,
      borrowingUserId: user1.id,
      approvedBy: admin.id,
    },
  });

  const borrowing2 = await prisma.borrowing.create({
    data: {
      qty: 2,
      status: BorrowStatus.pending,
      itemId: pulpen.id,
      borrowingUserId: user2.id,
    },
  });

  // === Returning ===
  await prisma.returning.create({
    data: {
      qty: 1,
      status: ReturnStatus.pending,
      borrowingId: borrowing1.id,
      approvedBy: null,
    },
  });

  console.log("Seeding selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
