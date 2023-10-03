import search from "../utils/search"
import prepareAnswer from "./../utils/prepare-answer"

import getUserLanguage from "./../utils/get-user-language"
import findLanguage from "./../utils/find-language"

import * as queries from "./../queries/queries"

import { Composer } from "telegraf"
const composer = new Composer()

composer.inlineQuery(/.*/, async (ctx, next) => {
    if (!ctx.match[0]) return ctx.answerInlineQuery(queries.keepWriting)
    else next()
})

composer.inlineQuery(/.*/, async (ctx) => {
    let query = ctx.match[0], lang = getUserLanguage(ctx.from.id) || findLanguage(ctx.from.language_code)

    const langRegExp = /^[a-z-]+ /
    const langMatch = query.match(langRegExp)
    if (langMatch) {
        const foundLanguage = findLanguage(langMatch[0].trim())
        if (foundLanguage) {
            lang = foundLanguage
            query = query.slice(langMatch[0].length)
        }
    }

    const results = await search(query, lang)
    if (!results) return ctx.answerInlineQuery(queries.badGateway, {cache_time: 0})
    else if (results.length === 0) return ctx.answerInlineQuery(queries.notFound)

    try {
        const arr = await Promise.all(results.map(async (item) => await prepareAnswer(item, lang)))
        ctx.answerInlineQuery(arr, {cache_time: 10})
    } catch (err) {
        console.error(err)
        ctx.answerInlineQuery(queries.badGateway, {cache_time: 0})
    }
})

export default composer