const db = require("./../db/db.js")

module.exports = function getUserLanguage(id) {
    const sql = `SELECT language FROM languages WHERE user_id = ?`
    return db.prepare(sql).get(id).language
}