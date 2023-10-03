import * as fs from "fs/promises"

import type { Context } from "telegraf"

const cache: Map<string, string> = new Map()

export default async function sendFile(ctx: Context, path: string): Promise<void> {
    if (cache.get(path)) {
        ctx.sendDocument(cache.get(path))
    } else {
        const data = await fs.readFile(path)
        const info = await ctx.sendDocument({
            source: data,
            filename: "lang-codes.txt"
        })
        cache.set(path, info.document.file_id)
    }
}