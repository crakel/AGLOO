"use strict";

const db = require("../config/db");
const bcryptjs = require("bcryptjs");

class UserStorage {
    static async getLoginInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT id, pw FROM users WHERE id = ?;";
            db.query(query, id, (err, data) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }

    static async getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT id, name, st_id, major FROM users WHERE id = ?;";
            db.query(query, id, (err, data) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }

    static async insert(userInfo) {
        return new Promise((resolve, reject) => {
            const query =
                "INSERT INTO users(id, pw, name, st_id, major) VALUES(?, ?, ?, ?, ?);";
            userInfo.pw = bcryptjs.hashSync(userInfo.pw);
            db.query(query,
                [
                    userInfo.id,
                    userInfo.pw,
                    userInfo.name,
                    userInfo.st_id,
                    userInfo.major
                ], (err) => {
                    if (err) reject(`${err}`); // `${}`로 에러 문자열로 처리 .sql오류내용 그대로 불러오는거라 추후 수정해야할듯
                    resolve({ success: true });
            });
        });
    }
}

module.exports = UserStorage;
