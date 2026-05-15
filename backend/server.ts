import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { sql } from "drizzle-orm";

import { typeDefs, resolvers } from "./src/schemas/index";
import { db } from "./src/db/index.js";

import { verifyJWT } from "./JWT/cognito-verify";
const app = express();

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await server.start();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization;

        const token = authHeader?.replace("Bearer ", "");

        const authUser = token ? await verifyJWT(token) : null;

        return {
          db,
          authUser,
        };
      },
    }),
  );

  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`Server running on http://192.168.1.151:${PORT}/graphql`);
  });
};

startServer();

// DB test
const testDB = async () => {
  try {
    const result = await db.execute(sql`SELECT NOW()`);
    console.log("Database connected:", result);
  } catch (err) {
    console.error("Database connection failed:");
    console.error(err);
  }
};

testDB();
