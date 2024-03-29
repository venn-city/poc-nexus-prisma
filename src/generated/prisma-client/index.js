"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Transaction",
    embedded: false
  },
  {
    name: "Bill",
    embedded: false
  },
  {
    name: "BillStatus",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/deborah-755ff1/persistencyNexus/dev`
});
exports.prisma = new exports.Prisma();
