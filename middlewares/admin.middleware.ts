import type { Context } from "telegraf"

export async function admin(ctx: Context, next: () => Promise<void>) {
    if (!process.env.ADMIN) return console.log(`Admin's id is not specified in the .env file`)
    if (ctx.from.id.toString() === process.env.ADMIN) next()
}