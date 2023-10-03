import type { InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram"

import sendFile from "../utils/send-file"
import * as fs from "fs"
import { Composer } from "telegraf"
const composer = new Composer()

const langs = fs.readFileSync("./data/langs-top25.txt")

composer.command("langlist", async (ctx) => {
    const message = `To change the default language write <code>/setlang [language_code]</code> \nExample: <code>/setlang uk</code> \n\nList of language codes: \n${langs}`
    const markup: InlineKeyboardMarkup = {inline_keyboard: [[{text: "Full list", callback_data: "langs-list"}]]}
    ctx.reply(message, {reply_markup: markup, parse_mode: "HTML"})
})

composer.action("langs-list", async (ctx) => {
    try {
        await sendFile(ctx, "./data/langs.txt")
    } catch {
        ctx.reply("An error occurred while sending the file")
    }
})

export default composer