import { createSchema } from "graphql-yoga";
import { authTypeDefs, authResolvers } from "@/services/auth/auth.graphql";
import { projectsTypeDefs, projectsResolvers } from "@/services/projects/projects.graphql";
import { tasksTypeDefs, tasksResolvers } from "@/services/tasks/tasks.graphql";

export const schema = createSchema({
  typeDefs: [authTypeDefs, projectsTypeDefs, tasksTypeDefs],
  resolvers: {
    Query: {
      ...authResolvers.Query,
      ...projectsResolvers.Query,
      ...tasksResolvers.Query,
    },
    Mutation: {
      ...authResolvers.Mutation,
      ...projectsResolvers.Mutation,
      ...tasksResolvers.Mutation,
    },
  },
});
