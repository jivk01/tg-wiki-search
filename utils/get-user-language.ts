import db from "./../db/db.js"

export default function getUserLanguage(id: number | string): string {
    const sql = `SELECT language FROM languages WHERE user_id = ?`
    const query = db.prepare(sql).get(id) as {language: string}
    return query.language
}