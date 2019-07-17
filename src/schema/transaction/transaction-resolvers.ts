const { prismaObjectType } = require("nexus-prisma");

// Entity object
export const Transaction = prismaObjectType({
    name: "Transaction",
    // @ts-ignore
    definition(t) {
        t.prismaFields({ filter: ["metadata"] });
        t.string("transactionAmount", {
            resolve: ({amount, description}, args, context) => {
                return description + " : " + amount;
            }
        });
        t.field("bill",  {
            ...t.prismaType.bill,
            resolve: (root, {where}, context, info) => {
                console.log('bill from transaction');
                return 'redirect to billDAO'
            }
        });
        t.field("user",  {
            ...t.prismaType.user,
            resolve: (root, {where}, context, info) => {
                return 'redirect to userDAO'
                // console.log('user from transaction');
                // return context.prisma.user(where)
            }
        });
    }
});

// Entity queries
export const transaction = function(t) {
    t.field("transaction", {
        ...t.prismaType.transaction,
        resolve: (root, {where}, context, info) => {
            console.log('transaction - debo queries ');
            return context.prisma.transaction(where)
        }
    });
};

export const transactions = function(t) {
    t.field("transactions", {
        ...t.prismaType.transactions,
        resolve: (root, args, context, info) => {
            console.log('transactions - debo queries ');
            return context.prisma.transactions(args)
        }
    });
};

export const transactionsConnection = function(t) {
    t.field("transactions", {
        ...t.prismaType.transactionsConnection,
        resolve: (root, args, context, info) => {
            console.log('transactionsConnection - debo queries ');
            return context.prisma.transactionsConnection(args)
        }
    });
};

// Entity mutations
export const createTransaction = function(t) {
    t.field("createTransaction", {
        ...t.prismaType.createTransaction,
        resolve: (root, {data}, context, info) => {
            console.log('create transaction from our resolvers');
            return context.prisma.createTransaction(data)
        }
    })
};

export const updateTransaction = function(t) {
    t.field("updateTransaction", {
        ...t.prismaType.updateTransaction,
        resolve: (root, {data, where ={}}, context, info) => {
            console.log('update transaction from our resolvers');
            return context.prisma.updateTransaction({data, where})
        }
    })
};
