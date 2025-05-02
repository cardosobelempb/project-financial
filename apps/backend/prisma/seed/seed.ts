import { PrismaClient } from '@prisma/client';
import { products } from './products-data';
import { users } from './users-data';

async function main() {
  console.log('Main =>');
  const prisma = new PrismaClient();

  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: products });
  await prisma.user.createMany({ data: users });

  console.log('Database seeded successfully!');
}

main();
