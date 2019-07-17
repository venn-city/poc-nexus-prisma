const { prismaObjectType } = require("nexus-prisma");

// Entity object
export const Bill = prismaObjectType({
    name: "Bill",
    // @ts-ignore
    definition(t) {
        t.prismaFields({ filter: ["isPeriodic"] });
        t.string("billingDateInWords", {
            resolve: ({billableFromDate}, args, context) => {
                `Bill that is billablde from ${billableFromDate}`
            }
        });
        t.field("transactions",  {
            ...t.prismaType.transactions,
            resolve: (root, {where}, context, info) => {
                console.log('redirect to transactionDAO');
                // context.prisma.transaction(where)
            }
        });
        t.field("user",  {
            ...t.prismaType.user,
            resolve: (root, {where}, context, info) => {
                console.log('redirect to userDAO');
                // context.prisma.user(where)
            }
        });
    }
});

// Entity queries
export const bill = function(t) {
    t.field("bill", {
        ...t.prismaType.bill,
        resolve: (root, {where}, context, info) => {
            console.log('bill - debo queries ');
            return context.prisma.bill(where)
        }
    });
};

export const bills = function(t) {
    t.field("bills", {
        ...t.prismaType.bills,
        resolve: (root, args, context, info) => {
            console.log('bills - debo queries ');
            return context.prisma.bills(args)
        }
    });
};

export const billsConnection = function(t) {
    t.field("bills", {
        ...t.prismaType.billsConnection,
        resolve: (root, args, context, info) => {
            console.log('billsConnection - debo queries ');
            return context.prisma.billsConnection(args)
        }
    });
};

// Entity mutations
export const createBill = function(t) {
  t.field("createBill", {
      ...t.prismaType.createBill,
      resolve: (root, {data}, context, info) => {
          console.log('create bill from our resolvers');
          return context.prisma.createBill(data)
      }
  })
};

export const updateBill = function(t) {
    t.field("updateBill", {
        ...t.prismaType.updateBill,
        resolve: (root, {data, where ={}}, context, info) => {
            console.log('update bill from our resolvers');
            return context.prisma.updateBill({data, where})
        }
    })
};
