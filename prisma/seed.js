import { PrismaClient, Role, BorrowStatus, ReturnStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  console.log("Seeding database...");

  // === USERS ===
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

  const user3 = await prisma.user.create({
    data: {
      email: "user3@example.com",
      username: "user3",
      password: "password123",
      role: Role.user,
    },
  });

  // === CATEGORIES ===
  const elektronik = await prisma.kategori.create({
    data: { name: "Elektronik" },
  });

  const alatTulis = await prisma.kategori.create({
    data: { name: "Alat Tulis" },
  });

  const peralatanKantor = await prisma.kategori.create({
    data: { name: "Peralatan Kantor" },
  });

  const kebersihan = await prisma.kategori.create({
    data: { name: "Peralatan Kebersihan" },
  });

  // === ITEMS ===
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
      description: "Untuk presentasi",
      stock: 3,
      categoryId: elektronik.id,
    },
  });

  const keyboard = await prisma.item.create({
    data: {
      name: "Keyboard Logitech",
      description: "Keyboard wireless",
      stock: 10,
      categoryId: elektronik.id,
    },
  });

  const pulpen = await prisma.item.create({
    data: {
      name: "Pulpen Hitam",
      description: "Pulpen gel tinta hitam",
      stock: 200,
      categoryId: alatTulis.id,
    },
  });

  const bukuTulis = await prisma.item.create({
    data: {
      name: "Buku Tulis",
      stock: 150,
      description: "Buku catatan A5",
      categoryId: alatTulis.id,
    },
  });

  const kursiKantor = await prisma.item.create({
    data: {
      name: "Kursi Kantor",
      stock: 15,
      description: "Kursi ergonomis",
      categoryId: peralatanKantor.id,
    },
  });

  const sapu = await prisma.item.create({
    data: {
      name: "Sapu Lantai",
      stock: 25,
      categoryId: kebersihan.id,
    },
  });

  // === BORROWING (PEMINJAMAN) ===
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

  const borrowing3 = await prisma.borrowing.create({
    data: {
      qty: 1,
      status: BorrowStatus.rejected,
      itemId: proyektor.id,
      borrowingUserId: user3.id,
      approvedBy: admin.id,
    },
  });

  const borrowing4 = await prisma.borrowing.create({
    data: {
      qty: 3,
      status: BorrowStatus.pending,
      itemId: keyboard.id,
      borrowingUserId: user1.id,
    },
  });

  const borrowing5 = await prisma.borrowing.create({
    data: {
      qty: 5,
      status: BorrowStatus.approved,
      itemId: bukuTulis.id,
      borrowingUserId: user3.id,
      approvedBy: admin.id,
    },
  });

  // === RETURNING (PENGEMBALIAN) ===
  await prisma.returning.create({
    data: {
      qty: 1,
      status: ReturnStatus.pending,
      borrowingId: borrowing1.id,
    },
  });

  await prisma.returning.create({
    data: {
      qty: 2,
      status: ReturnStatus.approved,
      borrowingId: borrowing5.id,
      approvedBy: admin.id,
    },
  });

  await prisma.returning.create({
    data: {
      qty: 1,
      status: ReturnStatus.rejected,
      borrowingId: borrowing3.id,
      approvedBy: admin.id,
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
