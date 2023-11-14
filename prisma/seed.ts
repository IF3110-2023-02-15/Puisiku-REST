import { users } from './user';
import { poems } from './poem';
import { albums } from './album';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    for (let user of users) {
        await prisma.user.create({
            data: user
        })
    }

    for (let album of albums) {
        await prisma.album.create({
            data: album
        })
    }

    for (let poem of poems) {
        await prisma.poem.create({
            data: poem
        })
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})