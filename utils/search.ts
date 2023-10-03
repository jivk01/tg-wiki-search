import { WikipediaSearch } from "../types/wikipedia-search"

export default async function search(query: string, lang: string) {
    if (!lang) lang = "en"
    let url = `https://${lang}.wikipedia.org/w/rest.php/v1/search/title?q=${query}&limit=5`

    try {
        const result = await (await fetch(url)).json() as WikipediaSearch
        return result.pages
    } catch {
        return []
    }
}