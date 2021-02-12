"use strict";

const db = require("../config/db");
const UserStorage = require("./UserStorage");

class Time {
    // 시간표 불러오는 함수
    static getTimeInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                console.log(data[0]);
                resolve(data[0]);
            });
        });
    }
    // 시간표 저장하는 함수
    static async save(timeInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, name, pw) VALUES(?, ?, ?);";
            db.query(query, [userInfo.id, userInfo.name, userInfo.pw], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
}

module.exports = Time;