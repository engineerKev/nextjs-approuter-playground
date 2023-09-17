import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { schema }from "./schema";
import userType from "./User.graphql";
import userQueries from './User.queries.graphql';
import userMutations from './User.mutation.graphql';

const server = new ApolloServer({
  // typeDefs: [userType, userQueries, userMutations]
  schema
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req }),
});

export { handler as GET, handler as POST }