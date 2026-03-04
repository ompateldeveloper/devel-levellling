import { prisma } from "@/lib/prisma";

export const tasksTypeDefs = /* GraphQL */ `
    type Task {
        id: ID!
        title: String!
        description: String
        status: String!
        priority: String!
        dueDate: String
        projectId: ID!
        project: Project!
        assigneeId: ID
        assignee: User
        creatorId: ID!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        tasks(projectId: ID): [Task!]!
        task(id: ID!): Task
    }

    type Mutation {
        createTask(title: String!, projectId: ID!, creatorId: ID!, description: String, status: String, priority: String, assigneeId: ID, dueDate: String): Task!
        updateTask(id: ID!, title: String, description: String, status: String, priority: String, assigneeId: ID, dueDate: String): Task!
        deleteTask(id: ID!): Task
    }
`;

export const tasksResolvers = {
    Query: {
        tasks: (_: any, { projectId }: { projectId?: string }) =>
            prisma.task.findMany({
                where: projectId ? { projectId } : undefined,
                include: { project: true, assignee: true, creator: true },
            }),
        task: (_: any, { id }: { id: string }) =>
            prisma.task.findUnique({
                where: { id },
                include: { project: true, assignee: true, creator: true },
            }),
    },
    Mutation: {
        createTask: (_: any, { title, projectId, creatorId, description, status, priority, assigneeId, dueDate }: any) =>
            prisma.task.create({
                data: {
                    title,
                    projectId,
                    creatorId,
                    description,
                    status,
                    priority,
                    assigneeId,
                    dueDate: dueDate ? new Date(dueDate) : null,
                },
            }),
        updateTask: (_: any, { id, ...data }: any) =>
            prisma.task.update({
                where: { id },
                data: {
                    ...data,
                    dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
                },
            }),
        deleteTask: (_: any, { id }: { id: string }) => prisma.task.delete({ where: { id } }),
    },
};
