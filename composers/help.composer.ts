import type { InlineKeyboardButton } from "telegraf/typings/core/types/typegram"

import { Composer } from "telegraf"
const composer = new Composer()

composer.command("help", async (ctx) => {
    const message = `This bot allows to search articles across the Wikipedia. To start, just write bot's username (or press the button) and search query \nExample: <code>@${ctx.me} Earth</code> \n\nLanguages: \nIf you want to search in another language, write language code right after the bot's username \nExample: <code>@${ctx.me} uk Україна</code> \n\nCommands: \n/langlist - list of the language codes \n/setlang [lang_code] - changes the default language`
    const keyboard: InlineKeyboardButton[][] = [[{text: "Try it yourself", switch_inline_query_chosen_chat: {query: "", allow_bot_chats: true, allow_channel_chats: true, allow_group_chats: true, allow_user_chats: true}}]]
    ctx.reply(message, {parse_mode: "HTML", reply_markup: {inline_keyboard: keyboard}})
})

export default composer