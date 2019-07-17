import { prismaObjectType } from "nexus-prisma";
import {user, users, usersConnection, findAllDebos} from "./user/user-resolvers"
import {bill, bills,billsConnection} from "./bill/bill-resolvers";
import {transaction, transactions, transactionsConnection} from "./transaction/transaction-resolvers";


// @ts-ignore
export const Query = prismaObjectType({
    name: "Query",
    definition(t) {
        // t.prismaFields(["*"]); expose all the queries
        user(t);
        // users(t);
        // usersConnection(t);
        findAllDebos(t);
        bill(t);
        bills(t);
        billsConnection(t);
        transaction(t);
        transactions(t);
        transactionsConnection(t);
    },
});
