"use strict";

const db = require("../config/db");

class UserStorage {
    static getUserInfo(id) {
        // fs와 다르게 promise 지원x 직접 만들어 줘야함
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, name, pw) VALUES(?, ?, ?);";
            db.query(query, [userInfo.id, userInfo.name, userInfo.pw], (err) => {
                if (err) reject(`${err}`); // `${}`로 에러 문자열로 처리 .sql오류내용 그대로 불러오는거라 추후 수정해야할듯
                resolve({ success: true });
            });
        });
    }
}

module.exports = UserStorage;