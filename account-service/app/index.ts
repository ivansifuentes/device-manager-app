import { ApolloServer } from "apollo-server-express";
import fs from "fs";
import path from "path";
import { gql } from "apollo-server-express";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import Resolvers from "./resolver";
import { dbPool } from "./utils/db";
import { buildSubgraphSchema } from "@apollo/subgraph";

const typeDefs = fs.readFileSync(
  path.join(__dirname, "./", "account.graphql"),
  "utf8"
);

async function startApolloServer(resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs: gql`${typeDefs}`, resolvers }),
    context: async ({ req }) => {
      return { dbPool }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }) as any;

  await server.start();

  // app.use(
  //   '/',
  //   cors<cors.CorsRequest>(corsOptions));
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4001 }, resolve)
  );
  console.log(`Server ready at http://localhost:4001${server.graphqlPath}`);
}

startApolloServer(Resolvers);

