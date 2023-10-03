import getUsersAmount from "../utils/get-users-amount"
import * as middlewares from "../routes/middlewares.routes"

import { Composer } from "telegraf"
const composer = new Composer()

composer.command("botinfo", middlewares.admin)

composer.command("botinfo", async (ctx) => {
    const usersAmount = getUsersAmount()
    const memoryUsage = ( process.memoryUsage.rss() / 1024 / 1024 ).toFixed(2)

    ctx.reply(`Bot information: \n\nUsers: ${usersAmount}\nMemory Usage: ${memoryUsage} MiB`)
})

export default composer