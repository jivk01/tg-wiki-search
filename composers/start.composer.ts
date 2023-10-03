import { Composer } from "telegraf"
const composer = new Composer()

composer.start(async (ctx) => {
    ctx.reply(`<b>Greetings</b> \nTo start, write <code>@${ctx.me}</code> and search query \n\nNeed help? Press /help to get helpful information`, {parse_mode: "HTML"})
})

export default composer