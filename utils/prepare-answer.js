const getPageExtract = require("./get-page-extract.js")
const sanitizer = require("sanitizer")

module.exports = async function prepareAnswer(wikiPage, lang) {
    if (!lang) lang = "en"

    const pageURL = encodeURI(`https://${lang}.wikipedia.org/wiki/${wikiPage.key}`)

    let text = await getPageExtract(wikiPage.key, lang)
    text = sanitizer.sanitize(text)
    let title = sanitizer.sanitize(wikiPage.title)

    const obj = {
        type: "article",
        id: wikiPage.id,
        title: title,
        message_text: `${title} \n\n${text} \n\n<a href="${pageURL}">Source</a>`,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        url: pageURL
    }

    if (wikiPage.description) {
        obj.description = wikiPage.description
    }
    if (wikiPage.thumbnail) obj.thumb_url = `https:${wikiPage.thumbnail.url}`

    return obj
}