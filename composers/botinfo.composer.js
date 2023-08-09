const { Composer } = require("telegraf")
const composer = new Composer()
const db = require("./../db/db.js")

composer.command("botinfo", require("./../middlewares/admin.middleware.js"))

composer.command("botinfo", async (ctx) => {
    const users = db.prepare(`SELECT COUNT(*) as users FROM languages;`).get().users
    const memoryUsage = ( process.memoryUsage.rss() / 1024 / 1024 ).toFixed(2)

    ctx.reply(`Bot information: \n\nUsers: ${users}\nMemory Usage: ${memoryUsage} MiB`)
})

module.exports = composer