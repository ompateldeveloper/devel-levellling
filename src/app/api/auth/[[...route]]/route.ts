import { Hono } from "hono";
import { handle } from "hono/vercel";
import { auth } from "@/lib/auth";
import { cors } from "hono/cors";

const authApp = new Hono().basePath("/api/auth");

// authApp.use(
// 	"/api/auth/*", // or replace with "*" to enable cors for all routes
// 	cors({
// 		origin: "*", // replace with your origin
// 		allowHeaders: ["Content-Type", "Authorization"],
// 		allowMethods: ["POST", "GET", "OPTIONS"],
// 		exposeHeaders: ["Content-Length"],
// 		maxAge: 600,
// 		credentials: true,
// 	}),
// );
// Standard Better Auth handler
authApp.on(["GET", "POST"], "/*", (c) => {
    return auth.handler(c.req.raw);
});

export const GET = handle(authApp);
export const POST = handle(authApp);
