const shortenString = require("./shorten-string.js")

module.exports = async function getPageExtract(key, lang) {
    key = encodeURIComponent(key)
    const url = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&explaintext&exintro&titles=${key}`

    const result = await (await fetch(url)).json()
    const id = Object.keys(result.query.pages)[0]

    let extract = result.query.pages[id].extract
    extract = extract.replaceAll("\n", (match, index, string) => {
        const letters = /[a-zA-Zа-яА-Я]/
        if (letters.test(string[index - 1]) && letters.test(string[index - 1])) return " "
        else return "\n\n"
    })

    if (extract.length > 750) extract = shortenString(extract, 750)
    return extract
}