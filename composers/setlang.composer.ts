import langs from "./../data/langs.json"

import db from "./../db/db"
import findLanguage from "../utils/find-language"

import { Composer } from "telegraf"
const composer = new Composer()

composer.command("setlang", async (ctx) => {
    const message = ctx.message.text
    if (message.split(" ").length === 1) {
        ctx.reply(`To change default language, write <code>/setlang [language_code]</code> \n\nTo see language codes press /langlist`, {parse_mode: "HTML"})
        return
    }

    const lang = message.split(" ")[1]
    const foundLanguage = lang ? findLanguage(lang) : ""

    if (foundLanguage) {
        try {
            const sql = `UPDATE languages SET language = ? WHERE user_id = ?`
            db.prepare(sql).run(foundLanguage, ctx.from.id)
            ctx.reply(`Default language is changed to ${langs[foundLanguage].name}`)
        } catch {
            ctx.reply(`An error occured`)
        }
    } else {
        ctx.reply(`${lang} is not valid language code`)
    }
})

export default composer