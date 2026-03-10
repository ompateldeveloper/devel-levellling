import { prisma } from "@/lib/prisma";

export const authTypeDefs = /* GraphQL */ `
    type User {
        id: ID!
        email: String!
        name: String
        role: String!
        createdAt: String!
        updatedAt: String!
        projects: [Project!]!
    }

    type Query {
        me: User
        users: [User!]!
        user(id: ID!): User
    }

`;

export const authResolvers = {
    Query: {
        users: () => prisma.user.findMany(),
        user: (_: any, { id }: { id: string }) => prisma.user.findUnique({ where: { id } }),
        me: () => null, // Placeholder for actual auth logic
    },
    Mutation: {
         
    },
};
