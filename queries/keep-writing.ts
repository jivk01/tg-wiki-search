import type { InlineQueryResultArticle } from "telegraf/typings/core/types/typegram"

export const keepWriting: InlineQueryResultArticle[] = [{
    type: "article", 
    id: "100", 
    title: "Keep writing",
    input_message_content: {
        message_text: "Search query must contain at least 1 character"
    }
}]