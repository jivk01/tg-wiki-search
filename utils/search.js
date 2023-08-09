module.exports = async function search(query, lang) {
    if (!lang) lang = "en"
    let url = `https://${lang}.wikipedia.org/w/rest.php/v1/search/title?q=${query}&limit=5`

    try {
        result = await (await fetch(url)).json()
        return result.pages
    } catch {
        return false
    }
}