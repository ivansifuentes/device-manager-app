import { ApolloServer } from "apollo-server-express";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import Resolvers from "./resolver";
import Schema from "./schema";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { dbPool } from "./utils/db";

async function startApolloServer(resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs: Schema, resolvers }),
    context: async ({ req }) => {
      return { dbPool }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }) as any;
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4002 }, resolve)
  );
  console.log(`Server ready at http://localhost:4002${server.graphqlPath}`);
}

startApolloServer(Resolvers);

