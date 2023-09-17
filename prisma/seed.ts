/**
 * npx prisma db seed worked only by applying the answers from : https://github.com/prisma/prisma/discussions/12752
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});

  await prisma.user.create({
    data: {
      email: 'kevin.ruiz518@gmail.com',
      name: 'Kevin Ruiz Sierra',
      imageUrl: 'https://media.licdn.com/dms/image/D5603AQFLJ_yEx6pafg/profile-displayphoto-shrink_200_200/0/1674258373442?e=1700092800&v=beta&t=DfIEMGdCC3pzQjdUfjo898AezHI4IMeiViwwykBe7sw'
    }
  })
}

main().then(() => {
  console.log("Data seeded...");
})