require("dotenv").config()
const db = require("./db/db.js")

const { Telegraf } = require("telegraf")
const bot = new Telegraf(process.env.BOT_TOKEN)

const ignoreOldMessages = require("telegraf-ignore-old-messages")
bot.use(ignoreOldMessages(1))

bot.use(require("./middlewares/register.middleware.js"))

bot.use(require("./composers/search.composer.js"))

bot.use(require("./composers/start.composer.js"))
bot.use(require("./composers/help.composer.js"))
bot.use(require("./composers/setlang.composer.js"))
bot.use(require("./composers/langlist.js"))

// Command for admin
bot.use(require("./composers/botinfo.composer.js"))

bot.catch((err) => {
    console.log(err)
})

bot.launch()
console.log("Bot started")

process.on("SIGINT", () => {
    db.close()
    console.log("Database closed")
    process.exit()
})