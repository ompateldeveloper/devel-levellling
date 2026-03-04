import { Hono } from "hono";
import { handle } from "hono/vercel";
import { tasksRouter } from "@/services/tasks/tasks.router";

const tasksApp = new Hono().basePath("/api/tasks");

tasksApp.route("/", tasksRouter);

export const GET = handle(tasksApp);
export const POST = handle(tasksApp);
