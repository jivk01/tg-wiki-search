const { Composer } = require("telegraf")
const composer = new Composer()

const fs = require("fs")
const langs = fs.readFileSync("./data/langs-top25.txt")

composer.command("langlist", async (ctx) => {
    const message = `To change the default language write <code>/setlang [language_code]</code> \nExample: <code>/setlang uk</code> \n\nList of language codes: \n${langs}`
    markup = {inline_keyboard: [[{text: "Full list", callback_data: "langs-list"}]]}
    ctx.reply(message, {reply_markup: markup, parse_mode: "HTML"})
})

let langsFileID
composer.action("langs-list", async (ctx) => {
    if (!langsFileID) {
        const data = fs.readFileSync("./data/langs.txt")
        const info = await ctx.telegram.sendDocument(ctx.from.id, {
            source: data,
            filename: 'lang-codes.txt'
        })
        langsFileID = info.document.file_id
    } else {
        ctx.sendDocument(langsFileID)
    }
})

module.exports = composer