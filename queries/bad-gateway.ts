import type { InlineQueryResultArticle } from "telegraf/typings/core/types/typegram"

export const badGateway: InlineQueryResultArticle[] = [{
    type: "article", 
    id: "502", 
    title: "Bad Gateway",
    input_message_content: {
        message_text: "An error occured while connecting to the Wikipedia"
    }
}]