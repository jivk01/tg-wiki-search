import type { InlineQueryResultArticle } from "telegraf/typings/core/types/typegram"
import type { WikipediaPage } from "../types/wikipedia-page"

import getPageExtract from "./get-page-extract"
import sanitizer from "sanitizer"

export default async function prepareAnswer(wikiPage: WikipediaPage, lang: string): Promise<InlineQueryResultArticle> {
    if (!lang) lang = "en"

    const pageURL = encodeURI(`https://${lang}.wikipedia.org/wiki/${wikiPage.key}`)

    let text = await getPageExtract(wikiPage.key, lang)
    text = sanitizer.sanitize(text)
    let title = sanitizer.sanitize(wikiPage.title)

    const obj: InlineQueryResultArticle = {
        type: "article",
        id: String(wikiPage.id),
        title: title,
        input_message_content: {
            message_text: `${title} \n\n${text} \n\n<a href="${pageURL}">Source</a>`,
            parse_mode: "HTML",
            disable_web_page_preview: true
        },
        url: pageURL,
        description: wikiPage.description,
        thumbnail_url: wikiPage.thumbnail?.url ? `https:${wikiPage.thumbnail.url}` : null
    }

    return obj
}