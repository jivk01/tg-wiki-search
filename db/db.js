const Database = require('better-sqlite3')
const db = new Database('./db/main.db')

const sql = `CREATE TABLE IF NOT EXISTS languages (user_id INTEGER NOT NULL PRIMARY KEY UNIQUE, language TEXT);`
db.prepare(sql).run()
console.log("Database succesfully connected")

module.exports = db