import langs from "./../data/langs.json"

export default function findLanguage(str: string): string {
    if (str in langs) return str
    if (str.split("-")[0] in langs) return str.split("-")[0]
    return ""
}