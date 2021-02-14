"use strict";

const db = require("../config/db");
const UserStorage = require("./UserStorage");

class Time {
    // 시간표 불러오는 함수
    static getTimeInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM schedule WHERE id = ?;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }
    // 시간표 최초 저장하는 함수
    static async insert(timeInfo) {
        return new Promise((resolve, reject) => {
            const query = 
            "INSERT INTO schedule(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
            db.query(query, 
                [   timeInfo.id,
                    timeInfo.a0, timeInfo.a1, timeInfo.a2, timeInfo.a3, timeInfo.a4, 
                    timeInfo.b0, timeInfo.b1, timeInfo.b2, timeInfo.b3, timeInfo.b4,
                    timeInfo.c0, timeInfo.c1, timeInfo.c2, timeInfo.c3, timeInfo.c4,
                    timeInfo.d0, timeInfo.d1, timeInfo.d2, timeInfo.d3, timeInfo.d4,
                    timeInfo.e0, timeInfo.e1, timeInfo.e2, timeInfo.e3, timeInfo.e4,
                    timeInfo.f0, timeInfo.f1, timeInfo.f2, timeInfo.f3, timeInfo.f4
                ], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
    // 시간표 수정하는 함수
    static async insert(timeInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO schedule SET ?;"
            db.query(query, timeInfo, (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
}

module.exports = Time;