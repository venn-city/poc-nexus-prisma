const { User } = require('./user/user-resolvers');
const { Bill } = require('./bill/bill-resolvers');
const { Transaction } = require('./transaction/transaction-resolvers');
const Query = require('./query');
const Mutation = require('./mutation');

export = {
    Query,
    // Mutation,
    // User,
    // // Bill,
    // Transaction,
}
