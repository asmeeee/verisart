import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  console.log(`Start seeding...`);

  for (let step = 0; step < 50; step++) {
    const certificate = await prisma.certificate.create({
      data: {
        title: `Certificate ${step}`,
        year: Math.floor(Math.random() * (2020 - 1930 + 1)) + 1930,

        artist: {
          create: {
            firstName: `First name ${step}`,
            lastName: `Last name ${step}`,
          },
        },
      },
    });

    console.log(`Created certificate with id: ${certificate.id}`);
  }

  console.log(`Seeding finished.`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
