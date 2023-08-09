const { Composer } = require("telegraf")
const composer = new Composer()

composer.command("help", async (ctx) => {
    const message = `This bot allows to search articles across the Wikipedia. To start, just write bot's username and search query \nExample: <code>@${ctx.me} Earth</code> \n\nLanguages: \nIf you want to search in another language, write language code right after the bot's username \nExample: <code>@${ctx.me} uk Україна</code> \n\nCommands: \n/langlist - list of the language codes \n/setlang [lang_code] - changes the default language`
    ctx.reply(message, {parse_mode: "HTML"})
})

module.exports = composer