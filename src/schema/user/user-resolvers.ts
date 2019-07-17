const { prismaObjectType } = require("nexus-prisma");

// @ts-ignore
// Entity object: schema def, computed fields, joined fields
export const User = prismaObjectType({
    name: "User",
    definition(t) {
        t.prismaFields({filter: ["socialSecurityNumber"]});
        // computed fields
        t.string("fullName", {
            resolve: ({firstName, lastName}, args, ctx) =>  firstName + " " + lastName,
        });
    }
});

// Entity queries
export const user = function(t) {
    t.field("user", {
        ...t.prismaType.user,
        resolve: (root, {id}, context, info) => {
            console.log('user - debo queries ');
            return context.prisma.user({id})
        }
    });
};

export const users = function(t)  {
    t.field("users", {
        ...t.prismaType.users,
        resolve: (root, {where}, context, info) => {
            console.log('users - debo querie ');
            return context.prisma.users(where)
        }
    });
};

export const usersConnection = function(t)  {
    t.field("usersConnection", {
        ...t.prismaType.usersConnection,
        resolve: async (root, args, context, info) => {
            console.log('usersConnection - debo querie ');
            const aggregatePromise = context.prisma.usersConnection(args).aggregate();
            const pageInfoPromise = context.prisma.usersConnection(args).pageInfo();
            const [aggregate, pageInfo] = await Promise.all([aggregatePromise, pageInfoPromise]);
            return {aggregate, pageInfo}
            // return context.prisma.usersConnection(args).aggregate()
        }
    });
};

export const findAllDebos = function (t) {
    t.field("findDebo", {
        ...t.prismaType.users,
        resolve: async (root, args, context, info) => {
            return context.prisma.users({where: {firstName: "debo"}})
        }
    });
};

// Entity mutations
export const createUser = function(t) {
    t.field("createUser", {
        ...t.prismaType.createUser,
        resolve: (parent,{data}, context) => {
            console.log("create user from our resolvers");
            return context.prisma.createUser(data);
        }
    });
};

export const updateUser = function(t) {
    t.field("updateUser", {
        ...t.prismaType.updateUser,
        resolve: (parent,{data, where = {}}, context) => {
            console.log("update user from our resolvers");
            return context.prisma.updateUser({data, where});
        }
    });
};
