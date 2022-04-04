import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Tefikk',
    email: 'tefikk.haciosmanolu.com',
    posts: {
      create: [
        {
          title: 'selamn alekm',
          content: 'wpcardrip10h',
          published: true,
        },
      ],
    },
  },
  {
    name: 'furkn',
    email: 'furknSlakkoc.cok',
    posts: {
      create: [
        {
          title: 'abrkwe',
          content: 'laaaa',
          published: true,
        },
      ],
    },
  },
  {
    name: 'normie',
    email: 'normie.com',
    posts: {
      create: [
        {
          title: 'imnormie',
          content: 'normielaa.com',
          published: true,
        },
        {
          title: 'norm',
          content: 'lna31',
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
