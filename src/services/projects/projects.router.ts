import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

const projectsRouter = new Hono()
    .get("/", async (c) => {
        const projects = await prisma.project.findMany({
            include: {
                owner: true,
                tasks: true,
            },
        });
        return c.json({ projects });
    })
    .post("/", async (c) => {
        const { name, description, ownerId } = await c.req.json();
        const project = await prisma.project.create({
            data: { name, description, ownerId },
        });
        return c.json({ project });
    });

export { projectsRouter };
