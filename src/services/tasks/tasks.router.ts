import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

const tasksRouter = new Hono()
  .get("/", async (c) => {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        assignee: true,
        creator: true,
      }
    });
    return c.json({ tasks });
  })
  .post(
    "/",
    async (c) => {
      const { title, description, projectId, creatorId, assigneeId } = await c.req.json();
      const task = await prisma.task.create({
        data: { title, description, projectId, creatorId, assigneeId },
      });
      return c.json({ task });
    }
  );

export { tasksRouter };
