// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export const resolvers = {
//   Query: {
//     hello: () => "Hi Apollo Server",
//     users: () => prisma.user.findMany(),
//   }
// };
import { builder } from "@/builder";
import "@/prisma/models/User";

export const schema = builder.toSchema({});