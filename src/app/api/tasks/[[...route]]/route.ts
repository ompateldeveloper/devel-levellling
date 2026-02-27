import { Hono } from "hono";
import { handle } from "hono/vercel";

const tasksApp = new Hono().basePath("/api/tasks");

tasksApp.get("/hello", (c) => {
    return c.json({
        message: "Hello Next.js!",
    });
});

export const GET = handle(tasksApp);
export const POST = handle(tasksApp);
