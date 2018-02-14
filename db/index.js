const sqlite3 = require('sqlite3').verbose();
const config = require('../config');
let db = new sqlite3.Database(config.get("dbPath"), (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the chinook database.');
});

module.exports = db;
