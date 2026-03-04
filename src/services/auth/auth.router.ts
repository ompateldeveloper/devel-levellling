import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const authRouter = new Hono()
    .post("/register", async (c) => {
        const { email, password, name } = await c.req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });

        return c.json({ user });
    })
    .post("/login", async (c) => {
        const { email, password } = await c.req.json();
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return c.json({ error: "Invalid credentials" }, 401);
        }
        return c.json({ user });
    });

export { authRouter };
