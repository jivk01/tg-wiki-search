const langs = require("./../data/langs.json")

module.exports = function findLanguage(str) {
    if (str in langs) return str
    if (str.split("-")[0] in langs) return str.split("-")[0]
    return ""
}