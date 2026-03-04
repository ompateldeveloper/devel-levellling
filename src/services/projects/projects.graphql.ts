import { prisma } from "@/lib/prisma";

export const projectsTypeDefs = /* GraphQL */ `
    type Project {
        id: ID!
        name: String!
        description: String
        ownerId: ID!
        owner: User!
        tasks: [Task!]!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        projects: [Project!]!
        project(id: ID!): Project
    }

    type Mutation {
        createProject(name: String!, ownerId: ID!, description: String): Project!
        updateProject(id: ID!, name: String, description: String): Project!
        deleteProject(id: ID!): Project
    }
`;

export const projectsResolvers = {
    Query: {
        projects: () => prisma.project.findMany({ include: { owner: true, tasks: true } }),
        project: (_: any, { id }: { id: string }) => prisma.project.findUnique({ where: { id }, include: { owner: true, tasks: true } }),
    },
    Mutation: {
        createProject: (_: any, { name, ownerId, description }: any) => prisma.project.create({ data: { name, ownerId, description } }),
        updateProject: (_: any, { id, ...data }: any) => prisma.project.update({ where: { id }, data }),
        deleteProject: (_: any, { id }: { id: string }) => prisma.project.delete({ where: { id } }),
    },
};
