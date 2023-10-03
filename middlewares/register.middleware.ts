import type { Context } from "telegraf"

import db from "./../db/db"

export async function register(ctx: Context, next: () => Promise<void>) {
    const registered = db.prepare(`SELECT 1 FROM languages WHERE user_id = ?`).get(ctx.from.id)
    if (!registered) db.prepare(`INSERT INTO languages (user_id) VALUES (?)`).run(ctx.from.id)

    next()
}