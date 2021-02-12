"use strict";

const mysql = require("mysql");

const db = mysql.createConnection({
    host: "115.85.183.157",
    user: "root",
    password: "testpassword",
    database: "JSM_CIRCLES",
});

db.connect();

module.exports = db;
