import { builder } from "@/builder";
import { prisma } from "@/prisma/db";

builder.prismaObject("User", {
  fields: t => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    email: t.exposeString("email"),
    imageUrl: t.exposeString("imageUrl")
  })
});

builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: async (query, root, args, ctx, info) => {
      return prisma.user.findMany({...query });
    }
  })
)

builder.queryField("user", (t) => 
  t.prismaField({
    type: ["User"],
    args: {
      email: t.arg.string({required: true})
    },
    resolve: async (query, root, args, ctx, info) => {
      const { email } = args;
      return prisma.user.findMany({
        ...query,
        where: { email  }
      }) 
    }
  })
);

builder.mutationField("addUser", (t) => 
  t.prismaField({
    type: ["User"],
    args: {
      name: t.arg.string({required: true}),
      email: t.arg.string({required: true}),
      imageUrl: t.arg.string({required: true})
    },
    resolve: async (query, root, args, ctx, info) => {
      const {email, name, imageUrl } = args;
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          imageUrl
        },
      });
      return [newUser]
    }
  })
);

builder.mutationField("removeUser", (t) => 
  t.prismaField({
    type:["User"],
    args: {
      email: t.arg.string({required: true})
    },
    resolve: async (query, root, args, ctx, info) => {
      const { email } = args;
      const deletedUser = await prisma.user.delete({
        where: { email }
      })
      return [deletedUser]
    }
  })
);