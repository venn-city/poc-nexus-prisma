import * as path from "path";
import { ApolloServer } from "apollo-server";
import { makePrismaSchema } from "nexus-prisma";
import { prisma } from "./src/generated/prisma-client";
import datamodelInfo from "./src/generated/nexus-prisma";

const types = require("./src/schema/index");

const {typeDefs} = require('./src/generated/prisma-client/index.js');

const schema = makePrismaSchema({
    types: [types],

    prisma: {
        datamodelInfo,
        client: prisma,
    },

    outputs: {
        schema: path.join(__dirname, "./src/generated/schema.graphql"),
        typegen: path.join(__dirname, "./src/generated/nexus.ts"),
    },
});

const server = new ApolloServer({
    schema,
    context: { prisma },
    typeDefs
});
server.listen()
    .then(({ url, server }) => {
        console.log(`Server is running on http://localhost:4000`)
    });
