import db from "./../db/db"

export default function getUsersAmount(): number {
    const sql = `SELECT COUNT(*) as users FROM languages;`
    const query = db.prepare(sql).get() as {users: number}
    return query.users
}