module.exports = function shortenString(string, maxLength) {
    const paragraphs = string.split("\n\n")

    const selected = [paragraphs[0]]
    let totalLength = paragraphs[0].length
    for (let i = 1; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i]
        if (paragraph.length + totalLength < maxLength) {
            selected.push(paragraph)
            totalLength += paragraph.length
        } else break
    }

    let text = selected.join("\n\n")
    if (text.length > 1000) text = text.slice(0, 1000) + "..."
    return text
}