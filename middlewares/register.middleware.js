const db = require("./../db/db.js")

module.exports = async (ctx, next) => {
    const registered = db.prepare(`SELECT 1 FROM languages WHERE user_id = ?`).get(ctx.from.id)
    if (!registered) db.prepare(`INSERT INTO languages (user_id) VALUES (?)`).run(ctx.from.id)

    next()
}