const { Composer } = require("telegraf")
const composer = new Composer()

const search = require("./../utils/search.js")
const prepareAnswer = require("./../utils/prepare-answer.js")

const getUserLanguage = require("./../utils/get-user-language.js")
const findLanguage = require("./../utils/find-language.js")

const notFound = require("./../queries/not-found.js")
const keepWriting = require("./../queries/keep-writing.js")
const badGateway = require("../queries/bad-gateway.js")

composer.inlineQuery(/.*/, async (ctx, next) => {
    if (!ctx.match[0]) return ctx.answerInlineQuery(keepWriting)
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
    if (!results) return ctx.answerInlineQuery(badGateway, {cache_time: 0})
    else if (results.length === 0) return ctx.answerInlineQuery(notFound)

    try {
        const arr = await Promise.all(results.map(async (item) => await prepareAnswer(item, lang)))
        ctx.answerInlineQuery(arr, {cache_time: 10})
    } catch (err) {
        console.error(err)
        ctx.answerInlineQuery(badGateway, {cache_time: 0})
    }
})

module.exports = composer