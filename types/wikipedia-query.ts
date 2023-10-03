export type WikipediaQuery = {
    pages: {
        [key: string]: {
            pageid: number,
            title: string,
            extract: string
        }
    }
}