import "dotenv/config"
import db from "./db/db"

import * as composers from "./routes/composers.routes"
import * as middlewares from "./routes/middlewares.routes"

import { Telegraf } from "telegraf"
const ignoreOldMessages = require("telegraf-ignore-old-messages")  
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(ignoreOldMessages(1))

bot.use(middlewares.register)

bot.use(composers.search)

bot.use(composers.start)
bot.use(composers.help)
bot.use(composers.setlang)
bot.use(composers.langlist)

// Command for admin
bot.use(composers.botinfo)

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