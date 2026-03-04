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

    type Mutation {
        register(email: String!, password: String!, name: String): User!
        login(email: String!, password: String!): User
    }
`;

export const authResolvers = {
    Query: {
        users: () => prisma.user.findMany(),
        user: (_: any, { id }: { id: string }) => prisma.user.findUnique({ where: { id } }),
        me: () => null, // Placeholder for actual auth logic
    },
    Mutation: {
        register: (_: any, { email, password, name }: any) => prisma.user.create({ data: { email, password, name } }),
        login: async (_: any, { email, password }: any) => {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user || user.password !== password) return null;
            return user;
        },
    },
};
