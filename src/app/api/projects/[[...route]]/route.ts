import { Hono } from "hono";
import { handle } from "hono/vercel";

const projectsApp = new Hono().basePath("/api/projects");

projectsApp.get("/yey", (c) => {
    return c.json({
        message: "Hello Next.js!",
    });
});

export const GET = handle(projectsApp);
export const POST = handle(projectsApp);
