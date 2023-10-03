import type { InlineQueryResultArticle } from "telegraf/typings/core/types/typegram"

export const notFound: InlineQueryResultArticle[] = [{
    type: "article", 
    id: "404", 
    title: "Not found",
    input_message_content: {
        message_text: "." 
    }
}]