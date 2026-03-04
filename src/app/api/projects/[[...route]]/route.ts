import { Hono } from "hono";
import { handle } from "hono/vercel";
import { projectsRouter } from "@/services/projects/projects.router";

const projectsApp = new Hono().basePath("/api/projects");

projectsApp.route("/", projectsRouter);

export const GET = handle(projectsApp);
export const POST = handle(projectsApp);
