import { Hono } from "hono";
import { handle } from "hono/vercel";
import { authRouter } from "@/services/auth/auth.router";

const authApp = new Hono().basePath("/api/auth");

authApp.route("/", authRouter);

export const GET = handle(authApp);
export const POST = handle(authApp);
