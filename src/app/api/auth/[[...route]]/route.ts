import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const authApp = new Hono().basePath('/api/auth')

authApp.get('/login', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})

authApp.get('/register', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})

export const GET = handle(authApp)
export const POST = handle(authApp)