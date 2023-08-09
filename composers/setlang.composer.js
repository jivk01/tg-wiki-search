const db = require("./../db/db.js")

const findLanguage = require("../utils/find-language.js")
const langs = require("./../data/langs.json")

const { Composer } = require("telegraf")
const composer = new Composer()

composer.command("setlang", async (ctx) => {
    const message = ctx.message.text
    if (message.split(" ").length === 1) return ctx.reply(`To change default language, write <code>/setlang [language_code]</code> \n\nTo see language codes press /langlist`, {parse_mode: "HTML"})

    const lang = message.split(" ")[1]
    const foundLanguage = lang ? findLanguage(lang) : ""

    if (foundLanguage) {
        const sql = `UPDATE languages SET language = ? WHERE user_id = ?`
        db.prepare(sql).run(foundLanguage, ctx.from.id)
        return ctx.reply(`Default language is changed to ${langs[foundLanguage].name}`)
    } else {
        return ctx.reply(`${lang} is not valid language code`)
    }
})

module.exports = composer