import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support For Mongo' },
    update: {},
    create: {
      title: 'Prisma Adds Support For Mongo',
      body: 'Support for mongodb is most requested features',
      description: 'we are excited to share that...',
      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support For Mongo 2' },
    update: {},
    create: {
      title: 'Prisma Adds Support For Mongo 2',
      body: 'Support for mongodb is most requested features 2',
      description: 'we are excited to share that... 2',
      published: false,
    },
  });
  console.log({ post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
