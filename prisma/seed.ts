import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.

Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.

Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.
`

async function main() {
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: `Creator ${i + 1}`,
        email: `premium${i + 1}@puisiku.com`,
        hashedPassword:
          '$2b$10$guLsJqvtQNB1i4u9D4euEO7SgkjFblVqGGFKqwq85L4U5xyBol3UO',
        imagePath: '/img/default_user.png',
        description: `Hai, my name is Creator ${
          i + 1
        }. I am a premium creator at Puisiku. Nice to meet you all!`,
      },
    })

    const albumCount = i + 7
    for (let j = 0; j < albumCount; j++) {
      const album = await prisma.album.create({
        data: {
          name: `Album ${i + 1}-${j + 1}`,
          imagePath: '/img/default_album.png',
          creatorId: user.id,
        },
      })

      const poemCount = 17 - i
      for (let k = 0; k < poemCount; k++) {
        await prisma.poem.create({
          data: {
            title: `Poem ${i + 1}-${j + 1}-${k + 1}`,
            creatorId: user.id,
            genre: 'Genre',
            content: `${i + 1}-${j + 1}-${k + 1}\n${loremIpsum}`,
            imagePath: '/img/default_poem.jpg',
            audioPath: '/audio/default_audio.mp3',
            year: 2023 - k,
            updatedAt: new Date(),
            albumId: album.id,
          },
        })
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
